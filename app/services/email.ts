import nodemailer from "nodemailer";

const createTransporter = () => {
  const { ZOHO_EMAIL, ZOHO_PASSWORD } = process.env;
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: ZOHO_EMAIL,
      pass: ZOHO_PASSWORD,
    },
  });
};

// const createTransporter2 = () => {
//   const { GMAIL_AUTH, GMAIL_PASSWORD } = process.env;
//   return nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: GMAIL_AUTH,
//       pass: GMAIL_PASSWORD,
//     },
//   });
// };

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"NOVA Academy" <hello@stardeliteacademy.com>`,
    to,
    subject,
    html,
    attachments,
  });
};

// export const sendEmail2 = async (options: {
//   to: string;
//   subject: string;
//   html: string;
//   attachments?: Array<{
//     filename: string;
//     content: Buffer;
//     contentType: string;
//   }>;
// }) => {
//   const transporter = createTransporter2();
//   await transporter.sendMail({
//     from: `"NOVA Academy" <hello@stardeliteacademy.com>`,
//     to: options.to,
//     subject: options.subsject,
//     html: options.html,
//     attachments: options.attachments,
//   });
// };
