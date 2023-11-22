import type { Post, PostCreateInput, QueryPostArgs } from "../generated/graphql"

import { Context } from "../context"

export const typeDefs = `#graphql
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        authorId: ID!
        comments: [Comment!]!
    }

    input PostCreateInput {
        title: String!
        content: String!
        authorId: ID!
    }

    type Query {
        posts: [Post!]!
        post(postId: ID!): Post!
    }
    type Mutation {
      addPost(post: PostCreateInput!): Post!
    }
`

export const resolvers = {
  Query: {
    posts: (_parent: never, _args: never, context: Context) =>
      context.prisma.post.findMany(),
    post: (_parent: never, args: QueryPostArgs, context: Context) =>
      context.prisma.post.findUnique({ where: { id: +args.postId } }),
  },
  Post: {
    author: (parent: Post, _args: never, context: Context) =>
      context.prisma.user.findUnique({ where: { id: +parent?.authorId } }),
    comments: (parent: Post, _args: never, context: Context) =>
      context.prisma.comment.findMany({ where: { postId: +parent?.id } }),
  },
  Mutation: {
    addPost: async (
      _parent: never,
      args: { post: PostCreateInput },
      context: Context,
    ) =>
      context.prisma.post.create({
        data: { ...args.post, authorId: +args.post.authorId },
      }),
  },
}
