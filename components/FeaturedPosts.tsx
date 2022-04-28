import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import FeaturedPostCard from './FeaturedPostCard'
import { getFeaturedPosts } from '../shared/services'
import { Post } from '../shared/interfaces/post.interface'
import 'react-multi-carousel/lib/styles.css'

// for the Carousel component
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
	const [featuredPosts, setFeaturedPosts] = useState<any[]>([])
	const [dataLoaded, setDataLoaded] = useState(false)

	useEffect(() => {
		getFeaturedPosts().then(res => {
			setFeaturedPosts(res)
			setDataLoaded(true)
		})
	}, [])

	const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

	const renderFeaturedPosts = () => (
		<Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
			{featuredPosts.map((post: Post, i: number) => (
				<FeaturedPostCard key={i} post={post} />
			))}
		</Carousel>
	)

	return (
		<div className="mb-8">
			{ dataLoaded ? renderFeaturedPosts() : null }
		</div>
	)
}

export default FeaturedPosts