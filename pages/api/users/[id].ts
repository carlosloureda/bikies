import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

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

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ _id: id });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        if (!checkAccess()) return;
        let user = await User.findOne({ _id: id });

        // if (user) {
        const { firstName, lastName, email, role } = JSON.parse(req.body);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.role = role;
        await user.save();
        // }

        if (!user) {
          return res
            .status(400)
            .json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
