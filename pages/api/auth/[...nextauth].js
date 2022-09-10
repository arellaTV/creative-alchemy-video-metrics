import NextAuth from "next-auth"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      authorization: {
        url: "https://www.tiktok.com/auth/authorize",
        params: {
          client_key: process.env.TIKTOK_API_CLIENT_KEY,
          redirect_uri: process.env.TIKTOK_API_REDIRECT_URI,
          scope: "video.list",
        },
      },
      token: "https://open-api.tiktok.com/oauth/access_token",
      userinfo: {
        url: "https://open.tiktokapis.com/v2/user/info",
        params: {
          fields: "open_id,union_id,avatar_url"
        }
      },
      profile(profile) {
        console.log({ profile })
        return {
          id: profile?.data?.open_id,
          name: profile?.data?.display_name,
          image: profile?.data?.avatar_large_url,
        }
      },
      clientId: process.env.TIKTOK_API_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_API_CLIENT_SECRET,
    },
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)