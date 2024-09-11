import type { APIRoute } from 'astro'
import path from 'path'
import fs from 'fs/promises' // Use native fs module

export const prerender = false

const subscribersFilePath = path.join(process.cwd(), 'subscribers.json') // Define file path

// Function to get current date and time in IST
const getISTDateTime = () => {
	const now = new Date()
	// Convert to IST (UTC+5:30)
	const istOffset = 5.5 * 60 * 60 * 1000
	const istDate = new Date(now.getTime() + istOffset)

	return istDate.toISOString() // Format as ISO string
}

export const POST: APIRoute = async ({ request }) => {
	console.log('POST request received')

	try {
		const data = await request.json() // Read raw data first
		console.log('Raw data:', data)

		if (!data || !data.email) {
			return new Response(JSON.stringify({ message: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		// Initialize an empty subscribers list
		let subscribers = []

		try {
			// Read existing data from file
			const fileData = await fs.readFile(subscribersFilePath, 'utf-8')

			if (fileData.trim()) {
				// Only parse if fileData is not empty
				try {
					subscribers = JSON.parse(fileData)
				} catch (parseError) {
					console.error('Error parsing JSON from file:', parseError)
					subscribers = [] // Initialize as empty array if parsing fails
				}
			}
		} catch (readError: any) {
			if (readError.code === 'ENOENT') {
				// File does not exist, initialize with empty array
				console.warn('File not found. A new file will be created.')
			} else {
				// Handle other errors
				console.error('Error reading file:', readError)
				return new Response(
					JSON.stringify({ message: 'An error occurred while reading the file' }),
					{ status: 500, headers: { 'Content-Type': 'application/json' } }
				)
			}
		}

		// Check if email already exists
		if (subscribers.some((subscriber: { email: string }) => subscriber.email === data.email)) {
			return new Response(JSON.stringify({ message: 'Email already subscribed' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		// Append new email with date and time to the subscribers list
		const newSubscriber = {
			email: data.email,
			timestamp: getISTDateTime()
		}
		subscribers.push(newSubscriber)

		// Write updated subscribers list back to the file
		await fs.writeFile(subscribersFilePath, JSON.stringify(subscribers, null, 2))

		return new Response(JSON.stringify({ message: 'Subscription successful' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (error) {
		console.error('Error handling request:', error)
		return new Response(JSON.stringify({ message: 'An error occurred while subscribing' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}
