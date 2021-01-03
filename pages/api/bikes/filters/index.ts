import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../../utils/dbConnect';
import Bike from '../../../../models/Bike';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const locations = await Bike.distinct('location');
        const colors = await Bike.distinct('color');
        const models = await Bike.distinct('model');
        res.status(200).json({
          success: true,
          data: {
            locations,
            colors,
            models,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
