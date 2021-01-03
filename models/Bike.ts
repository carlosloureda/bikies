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
  },
  image: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  // deleted: {
  //   type: Boolean,
  // },
});

// interface BikeBaseDocument extends Bike, Document {}

// export interface BikeDocument extends BikeBaseDocument {}
// export interface BikeModel extends Model<BikeDocument> {}

// export default models.Bike ||
//   model<BikeDocument, BikeModel>('Bike', BikeSchema);

// const Bike: Model<IBike> = model('Bike', BikeSchema);
// export default models.Bike || model<IBike>('Bike', BikeSchema);

// const Bike = model('Bike', BikeSchema);

export default models.Bike || model('Bike', BikeSchema);
