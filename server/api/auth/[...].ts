import { NuxtAuthHandler } from "#auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import db from "~/lib/db"

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const email = profile.email as string
        let user = await db.user.findUnique({ where: { email } })

        if (!user) {
          user = await db.user.create({
            data: {
              email,
              name: profile.name ?? "",
              avatar: profile.image ?? "",
            }
          })
        }

        token.sessionToken = user.id
      }

      return token
    },

    async session({ session, token }) {
      if (!token.sessionToken)
        return session

      const user = await db.user.findUnique({
        where: { id: token.sessionToken as string },
        select: {
          name: true,
          avatar: true,
          role: true,
          email: true
        }
      })

      if (!user)
        return session

      return {
        ...session,
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          email: user.email
        }
      }
    }
  }
})
