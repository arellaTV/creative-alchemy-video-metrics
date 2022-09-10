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
      userinfo: "https://open.tiktokapis.com/v2/user/info",
      profile(profile) {
        console.log({ profile })
        return {}
        // return {
        //   id: profile.id,
        //   name: profile.kakao_account?.profile.nickname,
        //   email: profile.kakao_account?.email,
        //   image: profile.kakao_account?.profile.profile_image_url,
        // }
      },
      clientId: process.env.TIKTOK_API_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_API_CLIENT_SECRET,
    },
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)