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

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        console.log('id_: ', id);
        const user = await User.findOne({ _id: id });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        // const user = await User.findByIdAndUpdate(email, req.body, {
        const user = await User.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        });
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

    case 'DELETE' /* Delete a model by its ID */:
      try {
        console.log('** id: ', id);
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
