import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../shared/services'
import { Category } from '../shared/interfaces/category.interface';

interface IState {
	categories: Category[]
}

const Categories = () => {
	const [categories, setCategories] = useState<IState['categories']|[]>([])

	useEffect(() => {
		getCategories().then(categories => setCategories(categories))
	}, [])

	const renderCategories = () => (
		categories.map((category: Category) => (
			<Link href={`/category/${category.slug}`} key={category.slug}>
				<span className="cursor-pointer block pb-3 mb-3">
					{ category.name }
				</span>
			</Link>
		))
	)
	

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8"> 
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Categories
			</h3>
			{ categories.length > 0 ? renderCategories() : null }
		</div>
	)
}

export default Categories