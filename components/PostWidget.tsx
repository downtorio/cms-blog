import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts, getRelatedPosts } from '../shared/services'

interface IState {
	widgetPosts: {
		createdAt: string,
		featuredImage: {
			url: string
		},
		slug: string,
		title: string
	}[]
}

interface IProps {
	categories?: string[],
	slug?: string
}

const PostWidget = ({ categories = [], slug }: IProps) => {
	const [widgetPosts, setWidgetPosts] = useState<IState['widgetPosts']|[]>([])

	useEffect(() => {
		if (slug) {
			getRelatedPosts(categories, slug)
				.then(result => setWidgetPosts(result))
		} else {
			getRecentPosts().then(result => setWidgetPosts(result))
		}
	}, [slug])

	const renderHeading = () => (
		<h3 className="text-xl mb-8 font-semibold border-b pb-4">
			{ slug ? 'Related Posts' : 'Recent Posts' }
		</h3>
	)

	const renderPosts = () => {
		return widgetPosts.map(post => (
			<div key={post.slug} className="flex items-center w-full mb-5">
				<div className="w-16 flex-none">
					<img 
						src={ post.featuredImage.url } 
						alt={ post.title } 
						height="60px" 
						width="60px" 
						className="align-middle rounded-full" 
					/>
				</div>
				<div className="flex-grow ml-4">
					<p className="text-gray-500 font-xs">
						{ moment(post.createdAt).format('MMM DD, YYYY') }
					</p>
					<Link href={`/post/${post.slug}`}>
						<span className="text-md">{ post.title }</span>
					</Link>
				</div>
			</div>
		))
	}

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8"> 
			{ renderHeading() }
			{ widgetPosts.length > 0 ? renderPosts() : null }
		</div>
	)
}

export default PostWidget