import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async (option) => {
  try {
    // send mail with defined transport object
    console.log("Entered send mail function");
    const { from, to, subject, text, html } = option;
    const info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return;
  } catch (error) {
    console.log("Error in send mail:", error);
  }
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
