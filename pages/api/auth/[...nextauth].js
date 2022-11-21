/* eslint-disable no-undef */
import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import DiscordProvider from "next-auth/providers/discord"


export default async (req, res) =>
NextAuth(req, res, {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
      httpOptions: {
        timeout: 40000,
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackUrl: '/api/auth/callback/discord',
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`      
      // Allows callback URLs on the same origin


      else if (new URL(url).origin === baseUrl) return `${baseUrl}/connect`
      return baseUrl
    },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   // account is only set on initial login. try to post user when new users come
    //   if (account) {
    //     let {ID} = await postNewUser({
    //       userName: token.name,
    //       picture: token.picture,
    //       email: token.email,
    //       oauthProvider: account.provider,
    //     })
    //     token.userID = ID
    //   } 


    //   if (account?.guild) {
    //     try {
    //       token.discord = {
    //         guildID: account.guild.id,
    //         name: account.guild.name,
    //         picture: account.guild.banner_image,
    //         description: account.guild.description,
    //         locale: account.guild.preferred_locale,
    //         region: account.guild.region,
    //         createdTime: account.guild.createdTime
    //       }

    //       await postDiscordGuild(token.discord)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   return token
    // },
    // async session({ session, token }) {
    //   session.user.userID = token.userID
    //   if (token.discord) {
    //     session.discord = token.discord
    //   } 
      
    //   return session
    // }
  }  
})