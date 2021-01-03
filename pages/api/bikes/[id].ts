import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Bike from '../../../models/Bike';

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
        console.log('id: ', id);
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

    case 'DELETE' /* Delete a model by its ID */:
      try {
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
