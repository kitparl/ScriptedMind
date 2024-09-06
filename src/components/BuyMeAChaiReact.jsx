import React, { useState, useEffect } from 'react'

const BuyMeAChai = () => {
	const [amount, setAmount] = useState('')
	const [qr, setQr] = useState(null)
	const [intent, setIntent] = useState(null)
	const [r, setR] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleAmountChange = (e) => {
		setAmount(e.target.value)
		setR('')
	}

	const handleAmountClick = (value) => {
		setAmount(value.toString())
		setR('')
	}

	const handlePay = async () => {
		setIsLoading(true)
		setR('')

		const upiDetail = {
			payeeVPA: 'bisht.pranshu@ibl',
			payeeName: 'Pranshu Singh Bisht',
			payeeMerchantCode: null,
			txnId: Date.now().toString(),
			txnRefId: null,
			txnNote: `Support - ₹${amount}`,
			amount: amount,
			currency: 'INR',
			mode: '00',
			orgId: null
		}

		// try {
		//   const upiqr = (await import('upiqr')).default;
		//   const result = await upiqr(upiDetail);
		//
		//   if (result && result.qr && result.intent) {
		//     setQr(result.qr);
		//     setIntent(result.intent);
		//     setR(`QR Code generated. You can now scan it or use the UPI intent.`);
		//   } else {
		//     setR('Failed to generate QR code and Intent.');
		//   }
		// } catch (error) {
		//   console.error('Error generating QR code:', error);
		//   setR('Error generating QR code. Please try again.');
		// } finally {
		//   setIsLoading(false);
		// }
	}

	return (
		<div className='upi-button-container'>
			<h2>Support Us via UPI</h2>
			<div className='flex items-center justify-center h-screen'>
				<img src='../assets/images/upi.jpg' alt='UPI Payment' />
			</div>
			<p>Enter an amount or select from the options below:</p>
			<input
				type='number'
				id='custom-amount'
				placeholder='Enter amount'
				min='1'
				step='any'
				value={amount}
				onChange={handleAmountChange}
			/>
			<div className='options-container'>
				{[10, 20, 50, 100].map((value) => (
					<button
						key={value}
						onClick={() => handleAmountClick(value)}
						className={amount === value.toString() ? 'active' : ''}
					>
						₹{value}
					</button>
				))}
			</div>
			<button onClick={handlePay} disabled={isLoading || !amount}>
				{isLoading ? 'Processing...' : 'Pay via UPI'}
			</button>
			<p>Scan the QR code or use the UPI ID below to make a payment:</p>
			<p>
				<strong>pranshubisht9@okicici</strong>
			</p>
			{r && (
				<p>
					<strong>{r}</strong>
				</p>
			)}
			{qr && (
				<div>
					<img src={`data:image/png;base64,${qr}`} alt='QR Code' />
				</div>
			)}
			{intent && (
				<p>
					<strong>UPI Intent:</strong> {intent}
				</p>
			)}
		</div>
	)
}

export default BuyMeAChai
