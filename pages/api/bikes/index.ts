import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Bike from '../../../models/Bike';

type SearchQuery = {
  location?: string;
  model?: string;
  color?: string;
  rating?: object | string;
  page?: string;
  pageSize?: string;
  pickupDate?: string; //TODO: date
  dropoffDate?: string; //TODO: date
  available?: boolean;
};

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
        const page = (query.page && parseInt(query.page as string) - 1) || 0;
        const limit =
          (query.pageSize && parseInt(query.pageSize as string)) || 0;

        const skip = page * limit;

        let searchQuery: SearchQuery = {};
        if (query.location) searchQuery.location = query.location;
        if (query.model) searchQuery.model = query.model;
        if (query.color) searchQuery.color = query.color;
        if (query.rating) {
          searchQuery.rating = {
            $gte: parseInt(query.rating as string),
          };
        }
        if (query.available) searchQuery.available = query.available;

        const bikes = await Bike.find(searchQuery).skip(skip).limit(limit);
        const count = await Bike.count(searchQuery);

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
        if (!checkAccess()) return;
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
