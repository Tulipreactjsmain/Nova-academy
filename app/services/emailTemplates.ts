
export const generateContactUsEmail = (name: string) => {
  return `        
        <table
        style="
          width: 100%;
          margin: 0 auto;
          max-width: 750px;
          background: rgb(255, 255, 255);
          font-family: lucida grande, lucida sans, lucida sans unicode, arial,
            helvetica, verdana, sans-serif;
          background: rgb(255, 255, 255);
          line-height: 20px;
        "
        cellpadding="0"
      >
        <tbody>
          <tr>
            <td
              style="
                font-family: lucida grande, lucida sans, lucida sans unicode, arial,
                  helvetica, verdana, sans-serif;
                background: rgb(255, 255, 255);
              "
            >
              <table
                style="display: table; width: 100%"
                cellpadding="0"
                cellspacing="0"
              >
                <tbody>
                  <tr>
                    <td colspan="4">
                      <a
                        href="https://www.stardeliteacademy.com/"
                        target="_blank"
                        style="padding-bottom: 12px; display: block"
                        ><img
                          style="max-width: 100px"
                          src="https://res.cloudinary.com/techbro/image/upload/v1736357835/Academy_PNG_300x_gc1tay.png"
                      /></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style="
                  padding: 5% 7% 0px;
                  border: 1px solid rgb(243, 243, 243);
                  border-bottom: 0px solid rgb(255, 255, 255);
                  position: relative;
                "
              >
                <div
                  style="font-size: 13px; color: rgb(51, 51, 51); padding-top: 0px"
                  class="x_142031865mailContent"
                >
                  <p>Dear ${name},</p>
                  <p>
                    Thank you for contacting us. We have received your message and
                    will respond to you shortly.
                  </p>
                  <p></p>
                  <p></p>
                </div>
              </div>
              <div
                style="
                  font-size: 13px;
                  padding: 3% 7%;
                  border-bottom-width: 1px;
                  border-bottom-style: solid;
                  border-bottom-color: rgb(243, 243, 243);
                  border-left-width: 1px;
                  border-left-style: solid;
                  border-left-color: rgb(243, 243, 243);
                  border-right-width: 1px;
                  border-right-style: solid;
                  border-right-color: rgb(243, 243, 243);
                "
              >
                <font color="#444444">
                  Best regards, <br />
                  <b>NOVA Team</b> <br />
                  <br />
                </font>
              </div>
      
              <!-- colored lines -->
              <table
                style="display: table; width: 100%"
                cellpadding="0"
                cellspacing="0"
              >
                <tbody>
                  <tr
                    style="
                      line-height: 10px;
                      border: 1px solid rgb(243, 243, 243);
                      border-bottom: 0px solid rgb(255, 255, 255);
                    "
                  >
                    <td style="background-color: #ffcc00; height: 2px; width: 25%">
                      <br />
                    </td>
      
                    <td
                      style="
                        background-color: rgb(200, 37, 56);
                        height: 2px;
                        width: 25%;
                      "
                    >
                      <br />
                    </td>
                    <td
                      style="
                        background-color: rgb(25, 153, 79);
                        height: 2px;
                        width: 25%;
                      "
                    >
                      <br />
                    </td>
                    <td style="background-color: #1b4eb4; height: 2px; width: 25%">
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
      
              <!-- Social media -->
              <div style="background: rgb(248, 247, 247); padding: 1% 7%">
                <table style="width: 100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="text-align: left">
                        <a
                          style="
                            border: solid #808080 1px;
                            border-radius: 100%;
                            margin-right: 8px;
                            vertical-align: middle;
                            display: inline-table;
                            cursor: pointer;
                          "
                          href="https://instagram.com/stardelitesolutions"
                          target="_blank"
                        >
                          <img
                            style="height: 10px; width: 10px; margin: 4px"
                            src="https://img.icons8.com/ios-filled/50/808080/instagram-new--v1.png"
                            alt="instagram-new--v1"
                          />
                        </a>
                        <a
                          style="
                            border: solid #808080 1px;
                            border-radius: 100%;
                            margin-right: 8px;
                            vertical-align: middle;
                            display: inline-table;
                            cursor: pointer;
                          "
                          href="https://www.linkedin.com/company/stardelite/"
                          target="_blank"
                        >
                          <img
                            style="height: 10px; width: 10px; margin: 4px"
                            alt="linkedIn"
                            src="https://img.icons8.com/ios-glyphs/30/808080/linkedin-2--v1.png"
                          />
                        </a>
                        <a
                          style="
                            border: solid #808080 1px;
                            border-radius: 100%;
                            vertical-align: middle;
                            display: inline-table;
                            cursor: pointer;
                          "
                          href="https://twitter.com/stardeliteLtd"
                          target="_blank"
                        >
                          <img
                            style="height: 10px; width: 10px; margin: 4px"
                            src="https://img.icons8.com/ios-filled/50/808080/twitter.png"
                            alt="twitter"
                          />
                        </a>
                      </td>
                      <td style="text-align: right">
                        <a
                          style="
                            font-size: 13px;
                            color: rgb(51, 112, 187);
                            text-decoration: none;
                            cursor: pointer;
                          "
                          href="#"
                          target="_blank"
                        >
                          Terms
                        </a>
                        <span style="vertical-align: middle"> · </span>
                        <a
                          style="
                            font-size: 13px;
                            color: rgb(51, 112, 187);
                            text-decoration: none;
                            cursor: pointer;
                          "
                          href="#"
                          target="_blank"
                        >
                          Privacy
                        </a>
                        <span style="vertical-align: middle"> · </span>
                        <a
                          style="
                            font-size: 13px;
                            color: rgb(51, 112, 187);
                            text-decoration: none;
                            cursor: pointer;
                          "
                          href="#"
                          target="_blank"
                        >
                          Help
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
      
              <!-- Footer -->
      
              <table
                align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="border-collapse: collapse; margin-top: 40px"
              >
                <tr>
                  <td
                    style="
                      font-size: 12px;
                      font-weight: light;
                      text-align: center;
                      color: #9a9a9a;
                    "
                  >
                    <p style="margin: 10px">
                      Sent by
                      <span style="color: #1b4eb4">NOVA limited</span>
                    </p>
                    <p style="margin: 10px">
                      You can contact us at
                      <a
                        href="mailto:hello@stardeliteacademy.com"
                        style="
                          color: #9a9a9a;
                          font-weight: bold;
                          text-decoration: none;
                        "
                        >hello@stardeliteacademy.com</a
                      >.
                    </p>
                    <p style="margin: 10px">
                      © 2025 NOVA. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      
        `;
};

export const generateCoursePurchaseEmail = (
  customerName: string,
  orderId: string,
  purchaseDate: string,
  items: Array<{
    courseTitle: string;
    cohortStartDate: string;
  }>
) => {
  // Generate the course items HTML
  const courseItemsHtml = items
    .map(
      (item) => `
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
        <span style="color: #4b5563;">Course Name:</span>
        <span style="font-weight: 500; color: #1f2937;">${item.courseTitle}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="color: #4b5563;">Cohort Start Date:</span>
        <span style="font-weight: 500; color: #1f2937;">${item.cohortStartDate}</span>
      </div>
    </div>
  `
    )
    .join("");

  return `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your NOVA Academy Purchase Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 32px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden;">

        <div style="background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%); padding: 24px 32px; text-align: center;">
            <img src="https://res.cloudinary.com/techbro/image/upload/v1747383882/Acad_White_Png_i649fb.png" alt="NOVA Academy Logo" style="height: 80px; width: auto; margin: 0 auto; object-fit: contain;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 16px 0 0 0;">Thank You for Your Purchase!</h1>
        </div>

        <div style="padding: 24px 32px;">
            <p style="color: #374151; margin-bottom: 24px;">Hello ${customerName},</p>
            
            <p style="color: #374151; margin-bottom: 24px;">We're excited to welcome you to NOVA Academy! Below are all the important details about your purchase:</p>
            
            <!-- Order Summary -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
                <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">Order Summary</h2>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="color: #4b5563;">Order Number:</span>
                    <span style="font-weight: 500; color: #1f2937;"> #${orderId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span style="color: #4b5563;">Purchase Date:</span>
                    <span style="font-weight: 500; color: #1f2937;"> ${purchaseDate}</span>
                </div>
            </div>

            <!-- Course Details -->
            <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">Your Courses</h2>
            ${courseItemsHtml}

            <!-- Next Steps -->
            <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">What Happens Next?</h2>
            <ul style="color: #374151; margin-bottom: 24px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">You'll receive a welcome email 1 week before your cohort begins</li>
                <li style="margin-bottom: 8px;">Access to the learning portal will be granted on your cohort start date</li>
                <li style="margin-bottom: 8px;">Watch for orientation materials in your inbox</li>
            </ul>

            <!-- Support CTA -->
            <div style="background-color: #eff6ff; border-radius: 8px; padding: 24px; margin-bottom: 24px; border: 1px solid #dbeafe;">
                <h3 style="font-weight: 500; color: #1e40af; margin-bottom: 8px;">Need Help?</h3>
                <p style="color: #1d4ed8; margin-bottom: 12px;">Our support team is here to assist you with any questions.</p>
                <a href="mailto:support@stardeliteacademy.com" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 500; padding: 8px 16px; border-radius: 6px; text-decoration: none;">Contact Support</a>
            </div>

            <p style="color: #374151; margin-bottom: 16px;">We can't wait to see you in class!</p>
            <p style="color: #374151;">Best regards,</p>
            <p style="font-weight: 500; color: #1f2937;">The NOVA Academy Team</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
            <div style="text-align: center; margin-bottom: 16px;">
                <a href="https://instagram.com/stardeliteacademy" style="display: inline-block; margin: 0 12px; color: #9ca3af;">
                    <span style="display: none;">Instagram</span>
                    <svg style="height: 24px; width: 24px;" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/company/stardelite/" style="display: inline-block; margin: 0 12px; color: #9ca3af;">
                    <span style="display: none;">LinkedIn</span>
                    <svg style="height: 24px; width: 24px;" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                </a>
                <a href="https://twitter.com/stardeliteLtd" style="display: inline-block; margin: 0 12px; color: #9ca3af;">
                    <span style="display: none;">Twitter</span>
                    <svg style="height: 24px; width: 24px;" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                </a>
            </div>
            <p style="text-align: center; color: #6b7280; font-size: 14px;">© 2025 NOVA Academy. All rights reserved.</p>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 8px;">hello@stardeliteacademy.com</p>
        </div>
    </div>
</body>
</html>
  `;
};
