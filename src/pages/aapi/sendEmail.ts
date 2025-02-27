import { sendEmail } from '../../utils/sendEmail'

export const prerender = false

export async function POST({ request }: { request: Request }) {
	try {
		const {
			title,
			url
		}: {
			url: string
			title: string
		} = await request.json()

		const res = await sendEmail({ title, url })
		return new Response(JSON.stringify(res), { status: 200 })
	} catch (err) {
		return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 })
	}
}
