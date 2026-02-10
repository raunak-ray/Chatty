import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "../email/emailTemplate.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to, name, clientUrl) => {
  await transporter.sendMail({
    from: `"Chat App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to Our Platform",
    html: createWelcomeEmailTemplate(name, clientUrl),
  });
};
