import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/services/email";
import { joinMissionSchema } from "@/app/validations";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      customRole: formData.get("customRole"),
      background: formData.get("background"),
      motivation: formData.get("motivation"),
      portfolio: formData.get("portfolio"),
      resume: formData.get("resume") as File | null,
    };

    const result = joinMissionSchema.safeParse(data);
    console.log(data);
    if (!result.success) {
      return NextResponse.json(
        { status: "Bad request", message: result.error.issues },
        { status: 400 }
      );
    }

    // Send email to admin with attachment
    await sendEmail({
      to: "hello@stardeliteacademy.com",
      subject: "New Join Mission Application",
      html: `
          <h2>New Join Mission Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Role:</strong> ${data.role}</p>
          ${
            data.customRole
              ? `<p><strong>Custom Role:</strong> ${data.customRole}</p>`
              : ""
          }
          <p><strong>Background:</strong> ${data.background}</p>
          <p><strong>Motivation:</strong> ${data.motivation}</p>
          ${
            data.portfolio
              ? `<p><strong>Portfolio:</strong> ${data.portfolio}</p>`
              : ""
          }
          ${data.resume ? `<p><strong>Resume Attached:</strong> </p>` : ""}
        `,
      attachments: data.resume
        ? [
            {
              filename: data.resume.name,
              content: Buffer.from(await data.resume.arrayBuffer()),
              contentType: data.resume.type,
            },
          ]
        : [],
    });

    // Send confirmation email to applicant
    await sendEmail({
      to: data.email as string,
      subject: "Thank You for Your Interest in Joining NOVA Academy",
      html: `
          <h2>Thank You for Your Application</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in joining the NOVA Academy team. We have received your application and will review it carefully.</p>
          <p>We will contact you soon regarding the next steps.</p>
          <br>
          <p>Best regards,</p>
          <p>The NOVA Academy Team</p>
        `,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Application submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("File handling error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
