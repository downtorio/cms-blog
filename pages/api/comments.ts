// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from 'graphql-request';
import { validateGraphCmsEndpoint } from '../../shared/services/graphCmsEndpoint';
import { Comment } from '../../shared/interfaces/comment.interface';

const graphqlAPI = validateGraphCmsEndpoint()

export default async function comments(req: NextApiRequest, res: NextApiResponse<Comment>) {
  const { name, email, comment, slug } = req.body
  const graphQlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(
        data: { 
          name: $name, 
          email: $email, 
          comment: $comment, 
          post: { 
            connect: { slug: $slug } 
          } 
        }
      ) { id }
    }
  `

  try {
    const response = await graphQlClient.request(query, { name, email, comment, slug })
    return res.status(200).send(response)
  } catch (error: any) {
    console.log(error)
    return res.status(500).send(error)
  }
}
