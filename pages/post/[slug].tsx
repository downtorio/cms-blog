import React from 'react'
import { useRouter } from 'next/router'
import { getPosts, getPostDetails } from '../../shared/services'
import { Categories, PostWidget, PostDetails, Author, Comments, CommentForm, Loader } from '../../components'
import { Post } from '../../shared/interfaces/post.interface'

interface IProps {
	post: Post
}

const ShowPage = ({ post }: IProps) => {
	const router = useRouter()

	if (router.isFallback)
		return <Loader />

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					<PostDetails post={post} />
					<Author author={post.author} />
					<CommentForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>

				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-9">
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShowPage

export async function getStaticProps({ params }: {params: {slug: string}}) {
	const data = await getPostDetails(params.slug)

	return {
		props: { post: data }
	}
}

export async function getStaticPaths() {
	const posts = await getPosts()
	return {
		paths: posts.map((post: {node: Post}) => ({ 
			params: { 
				slug: post.node.slug 
			} 
		})),
		fallback: true
	}
}
