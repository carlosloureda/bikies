import { Document, Model, model, models, Schema } from 'mongoose';

export interface IBike {
  model: string;
  color: string;
  location: string;
  image: string;
  available: boolean;
  rating?: Number;
  ratingTotal?: Number;
  rateCount?: Number;
}

const BikeSchema: Schema = new Schema({
  // id
  model: {
    type: String,
    unique: true,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingTotal: {
    type: Number,
    default: 0,
  },
  rateCount: {
    type: Number,
    default: 0,
  },
});

export default models.Bike || model('Bike', BikeSchema);
