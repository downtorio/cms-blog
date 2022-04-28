import React from 'react'
import { Post } from '../shared/interfaces/post.interface'
import Image from 'next/image'

interface IProps {
	author: Post['author']
}

const Author = ({ author }: IProps) => {
	const renderAuthorPhoto = (author: any) => (
		<div className="absolute left-0 right-0 -top-12">
			<Image 
				alt={author.name}
				src={author.photo.url}
				height="100px"
				width="100px"
				className="align-middle"
				style={{ borderRadius: '100%' }}
				unoptimized
			/>
		</div>
	)

	return (
		<div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
			{ author.photo?.url ? renderAuthorPhoto(author) : null }
			<h3 className="text-white my-4 text-xl font-bold">
				{ author.name }
			</h3>
			<p className="text-white text-lg">
				{ author.bio }
			</p>
		</div>
	)
}

export default Author