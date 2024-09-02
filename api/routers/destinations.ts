import express from "express";
import Destination from "../models/Destination";
import auth from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";
import mongoose from "mongoose";
import Tour from "../models/Tour";

const destinationsRouter = express.Router();

destinationsRouter.get('/', async (req, res, next) => {
  try {
    const destinations = await Destination.find().sort({ cols: -1 });

    const destinationsWithCount = await Promise.all(destinations.map(async (destination) => {
      const tourCount = await Tour.countDocuments({ destinations: destination._id });
      return {
        ...destination.toObject(),
        tourCount
      };
    }));

    return res.send(destinationsWithCount);
  } catch (e) {
    return next(e);
  }
});

destinationsRouter.get('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.sendStatus(404);
    }
    return res.send(destination);
  } catch (e) {
    return next(e);
  }
});

destinationsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const destination = await Destination.create({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      rows: parseInt(req.body.rows) || 1,
      cols: parseInt(req.body.cols) || 1,
    });

    return res.send(destination);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

destinationsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).send({error: 'Destination does not exist'});
    }

    await Destination.deleteOne({_id: req.params.id});
    return res.send({message: 'Destination was successfully removed'});
  } catch (e) {
    return next(e);
  }
});

destinationsRouter.put('/:id', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).send({error: 'Destination does not exist'});
    }

    destination.name = req.body.name;
    if (req.file) {
      destination.image = req.file.filename;
    }
    destination.rows = parseInt(req.body.rows) || 1
    destination.cols = parseInt(req.body.cols) || 1

    await destination.save();

    return res.send(destination);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default destinationsRouter;

