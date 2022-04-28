import React, { useState, useRef, useEffect } from 'react'
import { submitComment } from '../shared/services';

interface IProps {
	slug: string
}

const CommentForm = ({ slug }: IProps) => {
	const [error, setError] = useState(false)
	const [localStorage, setLocalStorage] = useState<any>(null)
	const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false)
	const commentEl: any = useRef()
	const nameEl: any = useRef()
	const emailEl: any = useRef()
	const storeDataEl: any = useRef()
	const fieldClasses = 'outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'

	useEffect(() => {
		nameEl.current.value = window.localStorage.getItem('name')
		emailEl.current.value = window.localStorage.getItem('email')
	}, [])

	const handleCommentSubmission = (e: any) => {
		e.preventDefault()
		setError(false)

		const { value: comment } = commentEl.current
		const { value: name } = nameEl.current
		const { value: email } = emailEl.current
		const { checked: storeData } = storeDataEl.current

		if (!comment || !name || !email) {
			setError(true)
			return
		}

		const commentObj = { name, email, comment, slug }

		if (storeData) {
			window.localStorage.setItem('name', name)
			window.localStorage.setItem('email', email)
		} else {
			window.localStorage.removeItem('name')
			window.localStorage.removeItem('email')
		}

		submitComment(commentObj)
			.then((res: any) => {
				setShowSuccessMsg(true)
			})
	}

	const renderSuccessMsg = () => (
		<span className="text-xl float-right font-semibold mt-3 text-green-500">
			Comment submitted for review
		</span>
	)

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Leave a Comment
			</h3>
			<form onSubmit={e => handleCommentSubmission(e)}>
				<div className="grid grid-cols-1 gap-4 mb-4">
					<textarea 
						ref={commentEl} 
						name="comment"
						placeholder="Comment"
						className={`p-4 ${fieldClasses}`}
					></textarea>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
					<input type="text" name="name" placeholder="Name" ref={nameEl} className={`py-2 px-4 ${fieldClasses}`} />
					<input type="email" name="email" placeholder="Email" ref={emailEl} className={`py-2 px-4 ${fieldClasses}`} />
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<div>
						<input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="false" />
						<label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">
							Save my email and name for future comments
						</label>
					</div>
				</div>
				
				{ error ? <p className="text-xs text-red-500">All fields are required</p> : null }

				<div className="mt-8">
					<button 
						type="submit" 
						className="transition duration-500 ease hover:bg-purple-600 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
					>
						Post Comment
					</button>
					{ showSuccessMsg ? renderSuccessMsg() : null }
				</div>
			</form>
		</div>
	)
}

export default CommentForm