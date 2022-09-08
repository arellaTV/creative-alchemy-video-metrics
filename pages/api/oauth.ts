// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const csrfState = Math.random().toString(36).substring(2);
  setCookie('csrfState', csrfState, { req, res, maxAge: 60000 });

  let url = 'https://www.tiktok.com/auth/authorize/';

  url += `?client_key=${process.env.TIKTOK_API_CLIENT_KEY}`;
  url += '&scope=video.list';
  url += '&response_type=code';
  url += `&redirect_uri=${process.env.TIKTOK_API_REDIRECT_URI}`;
  url += `&state=${csrfState}`;

  res.redirect(url);
}
