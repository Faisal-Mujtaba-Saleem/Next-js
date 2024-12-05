"use server";
import fs from 'fs/promises';

export const fetchFeedbacksAction = async () => {
    let feedbacks = [];
    try {
        feedbacks = await fs.readFile('./feedback.json', 'utf-8');
        feedbacks = JSON.parse(feedbacks);
    } catch (error) {
        console.log(error.message);
    }
    return feedbacks;
}