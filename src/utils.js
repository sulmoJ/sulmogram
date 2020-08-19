import "./env";
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

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
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, (err, info) => console.log(info.message));
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

//jsonwebtoken 만들기
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
