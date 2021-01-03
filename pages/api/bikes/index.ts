import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Bike from '../../../models/Bike';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const query = req.query;

        const page = (query.page && parseInt(query.page as string) - 1) || 0;
        const limit =
          (query.pageSize && parseInt(query.pageSize as string)) || 0;
        const skip = page * limit;
        const bikes = await Bike.find({}).skip(skip).limit(limit);
        const count = await Bike.count({});
        res.status(200).json({
          success: true,
          data: {
            bikes,
            count,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const bike = await Bike.create(JSON.parse(req.body));

        res.status(201).json({ success: true, data: bike });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
