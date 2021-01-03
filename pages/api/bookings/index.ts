import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';
import User from '../../../models/User';
import Bike from '../../../models/Bike';

type SearchQuery = {
  //   location?: string;
  //   model?: string;
  //   color?: string;
  //   rating?: string;
  page?: string;
  pageSize?: string;
  //   pickupDate?: string; //TODO: date
  //   dropoffDate?: string; //TODO: date
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const query: SearchQuery = req.query;

        // query:  {
        //   pickupDate: 'Mon Jan 04 2021 10:13:39 GMT 0100 (Central European Standard Time)',
        //   dropoffDate: 'Tue Jan 05 2021 10:13:39 GMT 0100 (Central European Standard Time)',
        //   location: 'sdfdsf',
        //   model: 'model4',
        //   color: 'sdfsdf',
        //   rating: '4.3'
        // }

        // TODO: dates to be booked!

        console.log('req.query: ', req.query);

        const page = (query.page && parseInt(query.page as string) - 1) || 0;
        const limit =
          (query.pageSize && parseInt(query.pageSize as string)) || 0;

        const skip = page * limit;

        let searchQuery: SearchQuery = {};
        // if (query.location) searchQuery.location = query.location;
        // if (query.model) searchQuery.model = query.model;
        // if (query.color) searchQuery.color = query.color;
        // if (query.rating) searchQuery.rating = query.rating;

        const bookings = await Booking.find(searchQuery)
          .populate(['user', 'bike'])
          .skip(skip)
          .limit(limit);
        console.log('bookings: ', bookings);
        const count = await Booking.count(searchQuery);

        res.status(200).json({
          success: true,
          data: {
            bookings,
            count,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        console.log('--> the body is: ', req.body);
        const bookingData = JSON.parse(req.body);

        const user = await User.findOne({ _id: bookingData.user });
        const bike = await Bike.findOne({ _id: bookingData.bike });
        bookingData.user = user;
        bookingData.bike = bike;
        console.log('bookingData: ', bookingData);

        // const booking = await Booking.create(JSON.parse(req.body));
        const booking = await Booking.create(bookingData);
        console.log('--> booking: ', booking);

        res.status(201).json({ success: true, data: booking });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
