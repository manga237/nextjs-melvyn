import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import { resend } from "./resend";
import { signIn } from "./auth-client";
import { getSession } from "./auth-server";

import nodemailer from "nodemailer";
import { mailerSend } from "./mailersend";
import { EmailParams, Recipient, Sender } from "mailersend";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const sentFrom = new Sender(
        "sandbox@test-q3enl6kyrmr42vwr.mlsender.net",
        "NextJS-MANGA"
      );
      const recipients = [new Recipient(user.email, `${user.name}`)];
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setText(`Click the link to verify your email: ${url}`)
        .setSubject("E-MAIL de Verification");
      await mailerSend.email.send(emailParams);
      console.log({ user, url });
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Melvyn App <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
      console.log({ user, url });
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
