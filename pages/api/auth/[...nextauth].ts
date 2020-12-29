import User from './../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import Adapters from 'next-auth/adapters';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnect from '../../../utils/dbConnect';

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: {
    type: 'mongodb',
    useNewUrlParser: true,
    url: process.env.DATABASE_URL,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session, user) => {
      await dbConnect();

      const dbUser = await User.findOne({ email: user.email });

      session.user = {
        ...session.user,
        role: dbUser.role,
        name: dbUser.firstName,
        lastName: dbUser.lastName,
        _id: dbUser._id,
      };
      return Promise.resolve(session);
    },
  },
  // adapter: Adapters.TypeORM.Adapter(
  //   // The first argument should be a database connection string or TypeORM config object
  //   process.env.DATABASE_URL,
  //   // The second argument can be used to pass custom models and schemas
  //   {
  //     models: {
  //       User: User,
  //     },
  //   }
  // ),
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
