import { generateContactUsEmail } from "@/app/services/emailTemplates";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/services/email";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  try {
    await sendEmail({
      to: "hello@stardeliteacademy.com",
      subject: "New Contact Form Submission",
      html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
        `,
    });

    await sendEmail({
      to: email,
      subject: "Thank You for Contacting Us",
      html: generateContactUsEmail(name),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
