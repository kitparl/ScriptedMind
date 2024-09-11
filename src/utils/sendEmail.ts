// import mg from 'mailgun-js';
// import { generateEmailHtml } from './emailTemplate';
// import dotenv from 'dotenv';
// import fs from 'fs/promises'; // Use fs/promises for async operations
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
//
// // Get the directory of the current file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
// // Load the .env file from the config directory
// dotenv.config({ path: join(__dirname, '../config/config.env') });
//
// // Create a Mailgun instance
// const maingun = mg({
//   apiKey: process.env.MAILGUN_API_KEY || 'your-fallback-key',
//   domain: process.env.MAILGUN_DOMAIN || 'sandbox-123.mailgun.org',
// });
//
// console.log('API_KEY from config.env:', process.env.API_KEY); // Example of accessing a variable
//
// // Function to get email addresses from the subscribers file
// async function getEmailAddresses(): Promise<string[]> {
//   try {
//     const subscribersPath = join(__dirname, '../../data/subscribers.json');
//     const data = await fs.readFile(subscribersPath, 'utf8');
//     const subscribersData = JSON.parse(data);
//     return subscribersData.map((subscriber: { email: string }) => subscriber.email);
//   } catch (error) {
//     console.error('Error reading subscribers.json:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// }
//
// // Function to send email
// export async function sendEmail(options: { title: string; subject: string; text: string; url: string }): Promise<void> {
//   try {
//     const { title, subject, text, url } = options;
//     const html = generateEmailHtml(title, url);
//     const emailArray = await getEmailAddresses(); // Get the email addresses
//
//     const mainInfo = {
//       from: "Excited User <mailgun@pranshu.tech>",
//       to: emailArray, // Use the dynamic list of emails
//       subject: title,
//       text: text, // Use the provided text
//       html: html
//     };
//
//     const response = await maingun.messages().send(mainInfo);
//     console.log('Email sent:', response.message);
//   } catch (err) {
//     console.error('Error sending email:', err);
//     throw err; // Re-throw the error to be handled by the caller
//   }
// }

import mg from 'mailgun-js'
import { generateEmailHtml } from './emailTemplate'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load the .env file from the config directory
dotenv.config({ path: join(__dirname, '../config/config.env') })

// Import JSON data directly
import subscribersData from '../../data/subscribers.json'

// // Create a Mailgun instance
const maingun = mg({
	apiKey: process.env.MAILGUN_API_KEY || 'your-fallback-key',
	domain: process.env.MAILGUN_DOMAIN || 'sandbox-123.mailgun.org'
})

console.log(9999, process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN)

// Function to get email addresses from the imported JSON data
function getEmailAddresses(): string[] {
	try {
		// Access the JSON data directly
		return subscribersData.map((subscriber: { email: string }) => subscriber.email)
	} catch (error) {
		console.error('Error reading subscribers data:', error)
		throw error
	}
}

// Function to send email
export async function sendEmail(options: { title: string; url: string }): Promise<void> {
	try {
		const { title, url } = options
		const html = generateEmailHtml(title, url)
		const emailArray = getEmailAddresses() // Get the email addresses

		const mainInfo = {
			from: 'Excited User <mailgun@pranshu.tech>',
			to: emailArray, // Use the dynamic list of emails
			subject: title,
			html: html
		}

		const response = await maingun.messages().send(mainInfo)
		console.log('Email sent:', response.message)
	} catch (err) {
		console.error('Error sending email:', err)
		throw err // Re-throw the error to be handled by the caller
	}
}
