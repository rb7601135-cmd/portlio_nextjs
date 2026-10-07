import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    // Check for optional external email integration via environment variables
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "rb7601135@gmail.com";

    if (webhookUrl) {
      // Forward to configured webhook (Discord, Slack, Make, Zapier, etc.)
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New Contact Submission from **${name}** (${email}):\n${message}`,
        }),
      });
    } else if (resendApiKey) {
      // Forward to Resend Email API if configured
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });
    } else {
      // Local / Development logging without pretending fake external delivery
      console.log("[Contact Form Submission (Simulated Local Mode)]", {
        name,
        email,
        message,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been recorded. You can also reach Bilal directly via email or LinkedIn.",
        isConfigured: Boolean(webhookUrl || resendApiKey),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
