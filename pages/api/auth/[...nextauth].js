import axios from "axios";
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
      token: {
        url: "https://open-api.tiktok.com/oauth/access_token",
        params: {
          client_key: process.env.TIKTOK_API_CLIENT_KEY,
          client_secret: process.env.TIKTOK_API_CLIENT_SECRET,
          grant_type: 'authorization_code',
        },
        async request(context) {
          let token_endpoint = 'https://open-api.tiktok.com/oauth/access_token/';
          token_endpoint += '?client_key=' + process.env.TIKTOK_API_CLIENT_KEY;
          token_endpoint += '&client_secret=' + process.env.TIKTOK_API_CLIENT_SECRET;
          token_endpoint += '&code=' + context.params.code;
          token_endpoint += '&grant_type=authorization_code';
          const { data: response } = await axios.post(token_endpoint);
          return {
            tokens: {
              access_token: response?.data?.access_token,
              expires_in: response?.data?.expires_in,
              refresh_token: response?.data?.refresh_token,
            }
          };
        },
      },
      userinfo: {
        url: "https://open-api.tiktok.com/user/info/",
        params: {
          fields: "open_id,display_name,avatar_url"
        },
        async request(context) {
          let userinfo_endpoint = 'https://open-api.tiktok.com/user/info/';
          const { data: response } = await axios.post(userinfo_endpoint, {
            access_token: context.tokens.access_token,
            fields: ["open_id", "display_name", "avatar_large_url"]
          })

          // context contains useful properties to help you make the request.
          return response?.data?.user || {};
        }
      },
      profile(profile) {
        console.log({ profile })
        return {
          id: profile?.open_id,
          name: profile?.display_name,
          image: profile?.avatar_large_url,
        }
      },
      clientId: process.env.TIKTOK_API_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_API_CLIENT_SECRET,
    },
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)