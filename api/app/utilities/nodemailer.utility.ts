import nodemailer from 'nodemailer';

interface ISendEmailProps {
  token: string;
  email: string;
}

interface ISendEmailResponse {
  status: boolean;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendEmail = async ({
  token,
  email,
}: ISendEmailProps): Promise<ISendEmailResponse> => {
  try {
    const { rejected } = await transporter.sendMail({
      to: email,
      from: '💸 Strongylodon verification code 🔐',
      subject: 'Verification code',
      text: `Your code is: ${token}`,
    });

    if (!rejected[0]) {
      return { status: true, message: 'Email sent successfully' };
    } else {
      throw new Error('Email could not be sent');
    }
  } catch (error) {
    const err = error as Error;

    return { status: false, message: err.message };
  }
};
