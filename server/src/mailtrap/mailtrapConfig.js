import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

// mailtrap sender export
export const sender = {
  email: process.env.GMAIL_USER,
  name: "Team FoodLens"
};

// A wrapper that mimics the MailtrapClient
export const mailtrapClient = {
  send: async (options) => {
    try {
      const toList = options.to ? options.to.map(recepient => recepient.email).join(', ')
      : '';
      const fromAddress = options.from ? `"${options.from.name}" <${options.from.email}>`
      : `"${sender.name}" <${sender.email}>`;

      // Map the mailtrap payload to Nodemailer payload
      const mailOptions = {
        from: fromAddress,
        to: toList,
        subject: options.subject,
        text: options.text,
        html: options.html
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);

      return {success: true, message_ids:[info.messageId]};
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
};