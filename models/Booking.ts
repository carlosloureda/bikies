import { Document, Model, model, models, Schema } from 'mongoose';

export interface IBooking {
  bike: object;
  user: object;
  startDate: string;
  endDate: string;
  rating: string;
  state: State;
}

enum State {
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

const BookingSchema: Schema = new Schema({
  // _id: {
  //   bikeId: String,
  //   userId: String,
  // },
  bike: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  state: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active',
  },
});

// interface BikeBaseDocument extends Bike, Document {}

// export interface BikeDocument extends BikeBaseDocument {}
// export interface BikeModel extends Model<BikeDocument> {}

// export default models.Bike ||
//   model<BikeDocument, BikeModel>('Bike', BookingSchema);

// const Bike: Model<IBooking> = model('Bike', BookingSchema);
// export default models.Bike || model<IBooking>('Bike', BookingSchema);

// const Bike = model('Bike', BookingSchema);

export default models.Booking || model('Booking', BookingSchema);
