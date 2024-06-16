import mongoose, {Types} from 'mongoose';
import {ITour} from '../types';
import Destination from "./Destination";

const Schema = mongoose.Schema;

const TourSchema = new Schema<ITour>(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: {
        validator: (images: string[]) => {
          return images.length > 0;
        },
        message: 'Загрузите минимум одну фотографию!',
      }
    },
    destinations: {
      type: [Schema.Types.ObjectId],
      ref: 'Destination',
      required: true,
      validate: {
        validator: async (values: Types.ObjectId[]) => {
          for (let value of values) {
            const exists = await Destination.findById(value);
            if (!exists) {
              return false;
            }
          }
          return true;
        },
        message: 'One or more destinations do not exist',
      },
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    schedule: [{
      title: {type: String, required: true},
      description: {type: String, required: true},
      dayNumber: {type: Number, required: true},
    }],
  },
);

const Tour = mongoose.model<ITour>('Destination', TourSchema);
export default Tour;