import nodemailer from "nodemailer";

export default async function sendMail({ from, to, subject, text, html }) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // Convert port to a number
            secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports (like 587)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Explicitly request STARTTLS for non-465 ports (like 587)
            tls: {
                rejectUnauthorized: true, // Ensure the server has a valid certificate
            },
        });

        const mail_options = { from, to, subject, text, html };

        const result = await transporter.sendMail(mail_options);

        if (result?.messageId) {
            console.log(`Email sent successfully: ${result.messageId}`);
            return { success: true, messageId: result.messageId };
        } else {
            console.error("Failed to send email.");
            return { success: false, error: "Unknown error occurred while sending email." };
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}

export const replyMail = async ({ from, to, subject, text, html, message_id }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // Convert port to a number
            secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports (like 587)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: true, // Ensure the server has a valid certificate
            },
        });

        const mail_options = {
            from,
            to,
            subject,
            text,
            html,
            inReplyTo: message_id, // Correct inReplyTo usage
            references: message_id, // Correct references usage
        };

        const result = await transporter.sendMail(mail_options);

        if (result?.messageId) {
            console.log(`Reply email sent successfully: ${result.messageId}`);
            return { success: true, messageId: result.messageId };
        } else {
            console.error("Failed to send reply email.");
            return { success: false, error: "Unknown error occurred while sending reply email." };
        }
    } catch (error) {
        console.error("Error sending reply email:", error);
        return { success: false, error: error.message };
    }
};
