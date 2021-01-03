import { Document, Model, model, models, Schema } from 'mongoose';

export interface IBooking {
  bike: object;
  user: object;
  startDate: string;
  endDate: string;
  rating: number;
  state: State;
}

enum State {
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

const BookingSchema: Schema = new Schema({
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
    type: Number,
  },
  state: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active',
  },
});

export default models.Booking || model('Booking', BookingSchema);
