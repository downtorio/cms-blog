import Head from 'next/head'
import Image from 'next/image'

import { PostCard, PostWidget, Categories, FeaturedPosts } from '../components'
import { getPosts } from '../shared/services'
import { Post } from '../shared/interfaces/post.interface';

interface IProps {
  posts: {
    node: Post
  }[]
}

const Home = ({ posts }: IProps) => {  
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          { posts.map(post => (
            <PostCard key={post.node.slug} post={post.node} />
          )) }
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts() || []

  return {
    props: { posts }
  }
}

export default Home
