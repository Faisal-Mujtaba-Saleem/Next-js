"use server";
import connectDB from "@/db/connect";
import Contact from "@/db/models/Contact";
import sendMail, { replyMail } from "@/lib/sendMail";

export default async function submitContactAction(contact_form) {
    try {
        const { first_name, last_name, ...contact } = Object.fromEntries(contact_form);
        contact.full_name = { first_name, last_name };

        const getFullName = (full_name) => `${full_name.first_name} ${full_name.last_name}`.trim();

        const connection = await connectDB();
        if (!connection) throw new Error("Database connection error");

        const created_contact = await Contact.create(contact);
        if (!created_contact) throw new Error("Failed to create contact");

        const sendMail_options = {
            from: contact.email,
            to: process.env.SMTP_USER,
            subject: `Contact Form Alert: Message from ${getFullName(contact.full_name)} by ${contact.email} on Http://127.0.0.1:3000`,
            text: contact.message,
            html: `<h1>Contact Form Alert: Message from ${getFullName(contact.full_name)} by ${contact.email} on Http://127.0.0.1:3000</h1><p>${contact.message}</p>`,
        };

        const sendMail_response = await sendMail(sendMail_options);
        if (!sendMail_response.success) throw new Error(`Your message was saved, but we couldn't notify the admin due to an email issue. We'll address it soon`);

        const replyMail_options = {
            from: process.env.SMTP_USER,
            to: contact.email,
            subject: `Confirmation: We have received your message by ${contact.email} on Http://127.0.0.1:3000 (Reply)`,
            text: `Dear ${getFullName(contact.full_name)},\n\nWe have received your message and will get back to you as soon as possible.\n\nBest regards,\nHunting Coder`,
            html: `<p>Dear ${getFullName(contact.full_name)},</p><p>We have received your message and will get back to you as soon as possible.</p><p>Best regards,</p><p>Hunting Coder</p>`,
            message_id: sendMail_response.messageId,
        };

        const replyMail_response = await replyMail(replyMail_options);
        if (!replyMail_response.success)
            console.log(`Contact submitted successfully, but failed to send confirmation email to the user. Error: ${replyMail_response.error}`);

        return {
            success: true,
            message: "Your message has been sent successfully!",
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}