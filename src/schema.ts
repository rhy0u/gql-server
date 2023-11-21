/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeExecutableSchema } from "@graphql-tools/schema"
import type { TypeSource } from "@graphql-tools/utils"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { mergeResolvers } from "@graphql-tools/merge"
import * as User from "./schemas/User"
import * as Post from "./schemas/Post"
import * as Comment from "./schemas/Comment"

const buildSchema = (...types: { typeDefs: TypeSource; resolvers: any }[]) => ({
  typeDefs: mergeTypeDefs(types.map(({ typeDefs }) => typeDefs)),
  resolvers: mergeResolvers(types.map(({ resolvers }) => resolvers)),
})

export const schema = makeExecutableSchema(buildSchema(User, Post, Comment))
