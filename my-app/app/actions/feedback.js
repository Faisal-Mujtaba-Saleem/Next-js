"use server";
import fs from 'fs/promises';

export async function submitFeedbackAction(client_feedback) {
    const feedback = {
        name: client_feedback.get('name'),
        email: client_feedback.get('email'),
        feedback_message: client_feedback.get('feedback_message'),
        date: new Date().toISOString(),
    };

    try {
        await fs.access('./feedback.json', fs.constants.R_OK);

        let feedbacks = await fs.readFile('./feedback.json', 'utf-8');
        feedbacks = JSON.parse(feedbacks);
        feedbacks = Array.isArray(feedbacks) ? [...feedbacks, feedback] : [feedback];

        await fs.writeFile('./feedback.json', JSON.stringify(feedbacks, null, 2));
    } catch (error) {
        console.log(error.message);
        await fs.writeFile('./feedback.json', JSON.stringify([feedback], null, 2));
    }
}