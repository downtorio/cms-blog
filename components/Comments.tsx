import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../shared/services';
import { Comment } from '../shared/interfaces/comment.interface';

interface IProps {
	slug: string
}

const Comments = ({ slug }: IProps) => {
	const [comments, setComments] = useState([])

	useEffect(() => {
		getComments(slug).then(res => setComments(res))
	}, [slug])
	
	const renderComments = () => {
		return comments.map((comment: Comment) => (
			<div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
				<p className="mb-4">
					<span className="font-semibold">{ comment.name } </span>
					on {moment(comment.createdAt).format('MMM DD, YYYY')}
				</p>
				<p className="whitespace-pre-line text-gray-600 w-full">
					{ parse(comment.comment) }
				</p>
			</div>
		))
	}

	const renderNoComments = () => (
		<p className="mb-4">
			There are no comments for this post. Be the first to leave a comment!
		</p>
	)

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{ `${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}` }
			</h3>
			{ comments.length > 0 ? renderComments() : renderNoComments() }
		</div>
	)
}

export default Comments