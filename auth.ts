import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import { client } from "./sanity/lib/client"
import { Author_id_by_github_id_query } from "./sanity/lib/queries"

import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(Author_id_by_github_id_query, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({token,account,profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn:false}).fetch(Author_id_by_github_id_query,{id:profile?.id});
        token.id = user?._id;
      }
      return token;
    },
    async session({session,token}){
        Object.assign(session,{id:token.id});
        return session;
    }
  }
})

