export interface Post {
	title: string,
	createdAt: string,
	slug: string,
	excerpt: string,
	content: { 
		raw: {
			// children: any[]
			children: {
				children: {
					text: string
				}[],
				type: string
			}[],
		} 
	},
	featuredImage: { url: string },
	featuredPost: boolean,
	author: {
		bio?: string,
		id: string,
		name: string,
		photo?: { url?: string }
	},
	categories?: { name: string, slug: string }[]
}

