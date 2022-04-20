import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 1. api method is post
 * 2. req.body check
 * 3. password check
 * 4. 추가된 유저의 정보와 token 전달
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send('필수 데이터가 없습니다.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};
