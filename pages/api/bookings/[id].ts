import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';
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
    case 'PUT':
      try {
        let booking = await Booking.findOne({ _id: id }).populate('bike');

        const { state, rating } = JSON.parse(req.body);

        booking.state = state;
        booking.rating = parseFloat(rating);
        await booking.save();

        if (rating) {
          const bike = await Bike.findOne({ _id: booking.bike._id });
          // console.log('>> bike: ', bike);
          if (!bike.rateCount) bike.rateCount = 1;
          if (!bike.ratingTotal) bike.ratingTotal = 1;
          else bike.rateCount += 1;
          bike.rating =
            Math.round(
              parseFloat(bike.ratingTotal) + parseFloat(booking.rateCount) * 10
            ) / 1;
          // console.log('--> bike: ', bike);
          // console.log('--> bike.rating: ', bike.rating);
          // console.log('--> typeof bike.rating: ', typeof bike.rating);
          await bike.save();
        }

        if (!booking) {
          return res
            .status(400)
            .json({ success: false, error: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
}
