import mongoose from 'mongoose';
import { IDestination} from '../types';

const Schema = mongoose.Schema;

const DestinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rows: Number,
    cols: Number,
  },
);

const Destination = mongoose.model<IDestination>('Destination', DestinationSchema);
export default Destination;