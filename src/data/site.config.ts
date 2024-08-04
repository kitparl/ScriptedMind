interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'Pranshu', // Site author
	title: "Pranshu's Dev Diaries", // Site title.
	description:
		"Explore Pranshu's blog for insights on programming, tech resources, and personal experiences. Dive into a wealth of ideas, coding chronicles, and practical documentation designed to inspire and inform. Discover a blend of memories and expertise in the world of technology.", // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
