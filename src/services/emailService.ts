import { config } from "dotenv";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { User, UserType } from "../schema";
import { Category } from "../schema";

config();

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export async function sendWeeklyEmail(user: UserType): Promise<void> {
  try {
    const categories = await Category.find({
      _id: { $in: user.subscribedCategories },
    });

    const categoryNames = categories
      .map((category) => category.slug)
      .join(", ");

    const feed = await fetch(
      `https://dummyjson.com/posts/search?limit=5&page=1&q=${categoryNames}`
    );
    const feedData = await feed.json();

    const postTitles = feedData.posts.map((post: any) => post.title).join(", ");

    await sendEmail({
      to: user.email,
      subject: "Weekly Update",
      html: `
        <h1>Weekly Update</h1>
        <p>Hello ${user.name},</p>
        <p>You have ${user.subscribedCategories.length} categories subscribed to.</p>
        <p>Recommended posts for you:</p>
        <ul>
          ${postTitles}
        </ul>
      `,
    });
  } catch (error) {
    console.error("Failed to send weekly email:", error);
    throw new Error("Failed to send weekly email");
  }
}

export function scheduleWeeklyEmails(): void {
  cron.schedule("0 9 * * 1", async () => {
    try {
      const users = await User.find({ subscribedCategories: { $ne: [] } });

      for (const user of users) {
        await sendWeeklyEmail(user);
      }
    } catch (error) {
      console.error("Failed to process weekly emails:", error);
    }
  });
}
