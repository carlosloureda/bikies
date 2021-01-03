import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Bike from '../../../models/Bike';
import { getSession } from 'next-auth/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

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
        const bike = await Bike.findOne({ _id: id });
        if (!bike) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: bike });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        if (!checkAccess()) return;
        let bike = await Bike.findOne({ _id: id });

        const { model, color, location, rating, image } = JSON.parse(req.body);

        bike.model = model;
        bike.color = color;
        bike.location = location;
        bike.rating = rating;
        bike.image = image;
        await bike.save();

        if (!bike) {
          return res
            .status(400)
            .json({ success: false, error: 'Bike not found' });
        }
        res.status(200).json({ success: true, data: bike });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        if (!checkAccess()) return;
        const deletedBike = await Bike.deleteOne({ _id: id });
        if (!deletedBike) {
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
