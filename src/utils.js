import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  console.log("이메일 보냄!");
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, (err, info) => {
    if (err) {
      console.log("이메일 도착 실패");
    } else {
      console.log(`Message sent : ${info.response}`);
    }
  });
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "tjdah0853@gmail.com",
    to: adress,
    subject: "🔐로그인을 위한 보안 문자입니다:)🔐",
    html: `로그인을 위한 비밀 키입니다. => <strong>${secret}</strong> <br/> 앱에 복붙해주세요!`,
  };
  return sendMail(email);
};
