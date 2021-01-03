import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';

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
        let booking = await Booking.findOne({ _id: id });

        const { state } = JSON.parse(req.body);

        booking.state = state;
        await booking.save();

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
