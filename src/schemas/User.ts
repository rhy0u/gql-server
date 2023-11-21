import type {
  MutationAddUserArgs,
  QueryUserArgs,
  User,
} from "../generated/graphql"

import { Context } from "../context"

export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        posts: [Post!]!
    }
    input UserCreateInput {
        email: String!
    }
    type Query {
      users: [User!]!
      user(userId: ID!): User!
    }
    type Mutation {
      addUser(user: UserCreateInput!): User!
    }
`

export const resolvers = {
  Query: {
    users: (_parent: never, _args: never, context: Context) =>
      context.prisma.user.findMany(),
    user: (_parent: never, _args: QueryUserArgs, context: Context) =>
      context.prisma.user.findUnique({ where: { id: +_args.userId } }),
  },
  User: {
    posts: (parent: User, _args: never, context: Context) =>
      context.prisma.post.findMany({ where: { authorId: +parent?.id } }),
  },
  Mutation: {
    addUser: (_parent: never, args: MutationAddUserArgs, context: Context) =>
      context.prisma.user.create({ data: args.user }),
  },
}
