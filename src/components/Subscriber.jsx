import React, { useState } from 'react'

function Subscriber() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log('Form submitted')
		setLoading(true)
		setMessage('')

		console.log('email1:', email)

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			console.log('Invalid email')
			setMessage('Invalid email address')
			setLoading(false)
			return
		}

		try {
			console.log('email2:', email)

			const response = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			})

			// const response = await fetch(
			//   `/api/subscribe?data=${encodeURIComponent(JSON.stringify(email))}`,
			//   { method: "post" }
			// );

			// console.log('email3:', email)
			//
			// console.log('API response:', response)
			//
			// const { message: responseMessage } = await response.json()
			//
			// if (response.ok) {
			// 	console.log('Subscription successful')
			// 	setMessage(responseMessage)
			// 	setEmail('')
			// } else {
			// 	console.log('Subscription failed:', responseMessage)
			// 	setMessage(responseMessage)
			// }
		} catch (error) {
			console.log('Subscription error:', error)
			setMessage('An error occurred while subscribing.')
		}
		//   finally {
		// 	setLoading(false)
		// }
	}
	return (
		<section className='bg-gray-100 p-4 rounded-lg shadow-md max-w-sm mx-auto'>
			<h2 className='text-xl font-semibold mb-4 text-center'>Subscribe to Our Newsletter</h2>
			<form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
				<label className='flex flex-col'>
					<span className='text-gray-700 mb-1'>Email Address</span>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email'
						required
						className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</label>
				<button
					type='submit'
					disabled={loading}
					className={`bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
				>
					{loading ? 'Subscribing...' : 'Subscribe'}
				</button>
				{message && (
					<p
						className={`text-center ${message.startsWith('Invalid') ? 'text-red-500' : 'text-green-500'}`}
					>
						{message}
					</p>
				)}
			</form>
		</section>
	)
}

export default Subscriber
