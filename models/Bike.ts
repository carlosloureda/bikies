import { Document, Model, model, models, Schema } from 'mongoose';

export interface IBike {
  model: string;
  color: string;
  location: string;
  rating?: Number;
  image: string;
  available: boolean;
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
  rating: {
    type: Number,
    default: 5,
  },
  image: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export default models.Bike || model('Bike', BikeSchema);
