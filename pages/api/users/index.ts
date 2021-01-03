import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import User from './../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const session = await getSession({ req });

  const checkAccess = () => {
    if (!session) {
      // Signed in
      res.status(401).json('401 - Unauthorized. Please log in');
      res.end();
      return false;
    } else if (session.user.role !== 'manager') {
      res.status(403).json('403 - Forbidden. Not enough rights');
      res.end();
      return false;
    }
    return true;
  };

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (!checkAccess()) return;
        const query = req.query;

        const page = (query.page && parseInt(query.page as string) - 1) || 0;
        const limit =
          (query.pageSize && parseInt(query.pageSize as string)) || 0;
        const skip = page * limit;
        const users = await User.find({}).skip(skip).limit(limit);
        const count = await User.count({});
        res.status(200).json({
          success: true,
          data: {
            users,
            count,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        if (!checkAccess()) return;
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
