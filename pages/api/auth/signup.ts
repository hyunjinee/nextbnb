/* eslint-disable import/order */
// eslint-disable-next-line import/no-useless-path-segments
import { StoredUserType } from './../../../types/user';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstname, lastname, birthday } = req.body;
  if (req.method === 'POST') {
    if (!email || !password || !firstname || !lastname || !birthday) {
      res.statusCode = 400;
      return res.send;
    }

    if (Data.user.exist({ email })) {
      res.statusCode = 409;
      return res.send('이미 가입된 이메일입니다.');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const users = Data.user.getList();

    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: StoredUserType = {
      id: userId,
      email,
      password: hashedPassword,
      firstname,
      lastname,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    Data.user.write([...users, newUser]);

    const token = jwt.sign(String(newUser.id), process.env.NEXT_JWT_SECRET!);
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      ).toUTCString()}; httponly`
    );

    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
      newUser;

    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUser);
  }

  res.statusCode = 405;
  return res.end();
};

// export default async (req: NextApiRequest, res: NextApiResponse) => {

//     const hashedPassword = bcrypt.hashSync(password, 8);

//     const users = Data.user.getList();
//     let userId;
//     const newUser: StoredUserType = {
//       id: userId,
//       email,
//       firstname,
//       lastname,
//       password: hashedPassword,
//       birthday,
//     };

//     Data.user.write([...users, newUser]);

//     await new Promise((resolve) => {
//       const token = jwt.sign(String(newUser.id), process.env.NEXT_JWT_SECRET!);
//       res.setHeader(
//         // prettier-ignore
//         // eslint-disable-next-line quotes
//         // eslint-disable-next-line @typescript-eslint/quotes
//         // eslint-disable-next-line quotes
//         // eslint-disable-next-line @typescript-eslint/quotes
//         "Set-Cookie",
//         `access_token=${token}; path=/; expires=${new Date(
//           Date.now() + 60 * 60 * 24 * 1000 * 3
//         )}; httponly`
//       );
//       resolve(token);
//     });

//     const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
//       newUser;

//     delete newUserWithoutPassword.password;
//     res.statusCode = 200;
//     return res.send(newUser);
//   }
//   res.statusCode = 405;

//   return res.end();
// };

// // /* eslint-disable import/order */
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import Data from '../../../lib/data';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import { StoredUserType } from '../../../types/user';

// // export default async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method === 'POST') {
// //     const { email, firstname, lastname, password, birthday } = req.body;

// //     if (!email || !firstname || !lastname || !password || !birthday) {
// //       res.statusCode = 400;
// //       return res.send('필수 데이터가 없습니다.');
// //     }

// //     const userExist = Data.user.exist({ email });

// //     if (userExist) {
// //       res.statusCode = 409;
// //       res.send('이미 가입된 이메일 입니다.');
// //     }

// //     const hashedPassword = bcrypt.hashSync(password, 8);
// //     const users = Data.user.getList();

// //     let userId;
// //     if (users.length === 0) {
// //       userId = 1;
// //     } else {
// //       userId = users[users.length - 1].id + 1;
// //     }

// //     const newUser: StoredUserType = {
// //       id: userId,
// //       email,
// //       firstname,
// //       lastname,
// //       password: hashedPassword,
// //       birthday,
// //       profileImage: '/static/image/user/default_user_profile_image.jpg',
// //     };

// //     Data.user.write([...users, newUser]);

// //     await new Promise((resolve) => {
// //       const token = jwt.sign(String(newUser.id), process.env.NEXT_JWT_SECRET!);
// //       res.setHeader(
// //         'Set-Cookie',
// //         `access_token=${token}; path=/; expires=${new Date(
// //           Date.now() + 60 * 60 * 24 * 1000 * 3
// //         )}; httponly`
// //       );
// //       resolve(token);
// //     });

// //     const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
// //       newUser;

// //     delete newUserWithoutPassword.password;
// //     res.statusCode = 200;
// //     return res.send(newUser);
// //   }

// //   res.statusCode = 405;
// //   return res.end();
// // };

// // /**
// //  * 1. api method가 POST인지 확인
// //  * 2. req.body에 필요한 값이 전부 들어있는지 확인합니다.
// //  * 3. email이 중복인지 확인한다.
// //  * 4. 패스워드를 암호화한다.
// //  * 5. 유저 정보를 추가한다.
// //  * 6. 추가된 유저의 정보와 token을 전달한다.
// //  */
