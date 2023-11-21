import type { Comment, CommentCreateInput } from "../generated/graphql"

import { Context } from "../context"

export const typeDefs = `#graphql
    type Comment {
        id: ID!
        content: String!
        post: Post!
        postId: ID!
    }

    input CommentCreateInput {
      content: String!
      postId: ID!
    }

    type Mutation {
      addComment(comment: CommentCreateInput!): Comment!
    }
`

export const resolvers = {
  Comment: {
    post: (parent: Comment, _args: never, context: Context) =>
      context.prisma.post.findUnique({ where: { id: +parent?.postId } }),
  },
  Mutation: {
    addComment: (
      _parent: never,
      args: { comment: CommentCreateInput },
      context: Context,
    ) =>
      context.prisma.comment.create({
        data: { ...args.comment, postId: +args.comment.postId },
      }),
  },
}
