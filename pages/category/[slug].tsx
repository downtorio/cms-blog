import React from 'react'
import { useRouter } from 'next/router'
import { getCategories, getCategoryPosts } from '../../shared/services'
import { PostCard, Categories, Loader } from '../../components'
import { Post } from '../../shared/interfaces/post.interface';

interface IProps {
	posts: {
		node: Post
	}[]
}

const ShowPage = ({ posts }: IProps) => {
	const router = useRouter()

	if (router.isFallback) 
		return <Loader />

	return (
		<div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
	)
}

export default ShowPage

// fetch data at build time
export async function getStaticProps({ params }: {params: {slug: string}}) {
	const posts = await getCategoryPosts(params.slug)
	return {
		props: { posts }
	}
}

// specify dynamic routes to pre-render pages based on data
export async function getStaticPaths() {
	const categories = await getCategories()
	return {
		paths: categories.map(({ slug }: {slug: string}) => ({ params: {slug} })),
		fallback: true
	}
}