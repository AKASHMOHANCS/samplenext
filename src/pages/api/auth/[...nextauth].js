import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      // OAuth authentication providers
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      
    
    ],
   
    adapter: MongoDBAdapter(clientPromise),
  })
