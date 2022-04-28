import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Category } from '../shared/interfaces/category.interface';
import { getCategories } from '../shared/services';

interface IState {
	categories: Category[]
}

const Header = () => {
	const [categories, setCategories] = useState<IState['categories']|[]>([])

	useEffect(() => {
		getCategories()
			.then(category => setCategories(
				category.filter((_: any, i: number) => i < 3)  // only store first 3 categories
			))
	}, [])

	const renderCategories = () => (
		categories.map(category => (
			<Link key={category.slug} href={`/category/${category.slug}`}>
				<span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
					{ category.name }
				</span>
			</Link>
		))
	)

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full inline-block border-violet-300 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<span className="cursor-pointer font-bold text-4xl text-white">
							CMS Blog
						</span>
					</Link>
				</div>

				<div className="hidden md:float-left md:contents">
					{ categories.length > 0 ? renderCategories() : null }
				</div>
			</div>
		</div>
	)
}

export default Header