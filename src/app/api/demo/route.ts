import { NextResponse } from "next/server";
import { Resend } from "resend";
import { demoFormSchema, cleanIndianMobile } from "@/lib/validations/demo";

// Escape all visitor text before inserting into email HTML
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip line breaks and tabs from subject parameters
function sanitizeSubjectPart(text: string): string {
  return text.replace(/[\r\n\t]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = demoFormSchema.safeParse(json);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      }
      return NextResponse.json({ success: false, errors: fieldErrors }, { status: 400 });
    }

    const { name, shopName, city, whatsapp, storeCount, message, website_url } = result.data;

    // Bot honeypot check: If filled, quietly return success without logging or sending email
    if (website_url && website_url.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Demo request received" });
    }

    // Cleaned 10-digit Indian WhatsApp number
    const normalizedMobile = cleanIndianMobile(whatsapp);
    const whatsappLink = `https://wa.me/91${normalizedMobile}`;

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Anonymized operational telemetry: NEVER log names, phone numbers, or message text
    console.log("Demo request received:", {
      city,
      storeCount,
      hasMessage: Boolean(message && message.length > 0),
      submittedAt: new Date().toISOString(),
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const leadsToEmail = process.env.LEADS_TO_EMAIL;
    const leadsFromEmail = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";
    const isDev = process.env.NODE_ENV !== "production";

    // Check configuration
    if (!resendApiKey || !leadsToEmail) {
      if (isDev) {
        console.warn(
          "Dev mode warning: RESEND_API_KEY or LEADS_TO_EMAIL is not configured in .env.local. Email dispatch skipped."
        );
        return NextResponse.json({ success: true, message: "Demo request received" });
      } else {
        console.error("Configuration error: RESEND_API_KEY or LEADS_TO_EMAIL missing in production environment.");
        return NextResponse.json(
          { success: false, message: "Email delivery service unavailable" },
          { status: 500 }
        );
      }
    }

    const resend = new Resend(resendApiKey);

    const safeSubject = `New demo request: ${sanitizeSubjectPart(shopName)}, ${sanitizeSubjectPart(city)}`;
    const safeName = escapeHtml(name);
    const safeShopName = escapeHtml(shopName);
    const safeCity = escapeHtml(city);
    const safeStores = escapeHtml(storeCount);
    const safeMessage = message ? escapeHtml(message) : "<em>None provided</em>";

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; color: #1C1714; line-height: 1.6;">
        <h2 style="color: #91723A; border-bottom: 2px solid #E8E0D5; padding-bottom: 8px;">New Demo Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #6B625B; width: 140px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>Shop Name:</strong></td>
            <td style="padding: 8px 0;"><strong>${safeShopName}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>City:</strong></td>
            <td style="padding: 8px 0;">${safeCity}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>WhatsApp:</strong></td>
            <td style="padding: 8px 0;">
              +91 ${normalizedMobile} &nbsp;
              <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                Chat on WhatsApp
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>Number of Stores:</strong></td>
            <td style="padding: 8px 0;">${safeStores}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>Message:</strong></td>
            <td style="padding: 8px 0;">${safeMessage}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B625B;"><strong>Received At:</strong></td>
            <td style="padding: 8px 0; font-size: 13px; color: #8A7F77;">${submissionTime} (IST)</td>
          </tr>
        </table>
      </div>
    `;

    const emailText = `New Demo Request:
----------------------------------------
Name: ${name}
Shop Name: ${shopName}
City: ${city}
WhatsApp: +91 ${normalizedMobile}
WhatsApp Link: ${whatsappLink}
Number of Stores: ${storeCount}
Message: ${message || "None provided"}
Time: ${submissionTime} (IST)
`;

    const { error } = await resend.emails.send({
      from: leadsFromEmail,
      to: leadsToEmail,
      subject: safeSubject,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      if (isDev) {
        console.warn("Dev mode warning: Resend API returned error, but returning success for local testing:", error.message);
        return NextResponse.json({ success: true, message: "Demo request received" });
      }
      console.error("Failed to send demo notification email:", error.message);
      return NextResponse.json(
        { success: false, message: "Failed to send email notification" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Demo request received",
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Dev mode warning: Email dispatch caught error, returning success for local testing.");
      return NextResponse.json({ success: true, message: "Demo request received" });
    }
    console.error("Error processing demo request:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
