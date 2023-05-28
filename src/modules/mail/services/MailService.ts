import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

import { ISendEmail } from "../models/ISendEmail";

@injectable()
export class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER, // generated ethereal user
        pass: process.env.NODEMAILER_PWD, // generated ethereal password
      },
    });
  }

  async send({ title, htmlBody, ...body }: ISendEmail) {
    await this.transporter.sendMail(
      {
        ...body,
        subject: title,
        html: htmlBody,
      },
      function (error, info) {
        if (error) {
          console.log("Erro enviando mensagem: ", error);
          return;
        }
        console.log(`Messagem enviada ${title}`);
        this.transporter.close();
      }
    );
  }
}
