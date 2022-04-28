import { request, gql } from 'graphql-request'
import { Comment } from '../interfaces/comment.interface';
import { validateGraphCmsEndpoint } from './graphCmsEndpoint';

const graphqlAPI = validateGraphCmsEndpoint()

export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.categories
}

export const getPosts = async () => {
	const query = gql`
		query GetPosts {
			postsConnection {
				edges {
					node {
						createdAt
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`
	
	const result = await request(graphqlAPI, query)
	return result.postsConnection.edges
}

export const getPostDetails = async (slug: string) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				createdAt
				author {
					bio
					id
					name
					photo {
						url
					}
				}
				slug
				title
				excerpt
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`
	
	const result = await request(graphqlAPI, query, { slug })
	return result.post
}

export const getRecentPosts = async () => {
	const query = gql`
		query GetRecentPosts() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.posts
}

export const getRelatedPosts = async (categories: string[], slug: string) => {
	const query = gql`
		query GetRelatedPosts($slug: String!, $categories: [String!]) {
			posts (
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug, categories })
	return result.posts
}

export const getCategoryPosts = async (slug: string) => {
	const query = gql`
		query GetCategoryPost($slug: String!) {
			postsConnection(where: {categories_some: {slug: $slug}}) {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug })
	return result.postsConnection.edges
}

export const getFeaturedPosts = async (): Promise<any> => {
	const query = gql`
		query GetFeaturedPosts() {
			posts(where: { featuredPost: true }) {
				author {
					name
					photo { url }
				}
				featuredImage { url }
				title
				slug
				createdAt
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.posts
}

export const submitComment = async (comment: Comment) => {
	const res = await fetch('/api/comments', { 
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	 })

	return res.json()
}

export const getComments = async (slug: string) => {
	const query = gql`
		query GetComments($slug: String!) {
			comments(
				where: {
					post: {
						slug: $slug
					}
				}
			) {
				name
				createdAt
				comment
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug })
	return result.comments
}