import { NextResponse } from "next/server";
import { demoFormSchema, cleanIndianMobile } from "@/lib/validations/demo";

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

    // Bot honeypot check: If filled, quietly return success without logging
    if (website_url && website_url.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Demo request received" });
    }

    // Normalized WhatsApp number
    const normalizedMobile = cleanIndianMobile(whatsapp);

    // TODO: Connect real CRM / database / WhatsApp notification service
    // Visitor name and phone number are NOT logged to the console for privacy.
    console.log("Demo request received:", {
      city,
      storeCount,
      hasMessage: Boolean(message && message.length > 0),
      submittedAt: new Date().toISOString(),
    });


    return NextResponse.json({
      success: true,
      message: "Demo request received",
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
