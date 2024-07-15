import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload, UploadedFile} from "../multer";
import Tour from '../models/Tour';
import fs from 'fs/promises';

const toursRouter = express.Router();

toursRouter.get('/', async (req, res, next) => {
  try {
    const tours = await Tour.find().populate('destinations');
    return res.send(tours);
  } catch (e) {
    return next(e);
  }
});

toursRouter.get('/images', async (req, res, next) => {
  try {
    const tours = await Tour.find();
    const images = tours.flatMap(tour => {
      return tour.images.map(image => ({
        title: tour.title,
        image
      }));
    });
    return res.send(images);
  } catch (e) {
    return next(e);
  }
});

toursRouter.get('/:id', async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('destinations');
    if (!tour) {
      return res.sendStatus(404);
    }
    return res.send(tour);
  } catch (e) {
    return next(e);
  }
});

toursRouter.post('/', auth, permit('admin'), imagesUpload.array('images', 50), async (req, res, next) => {
  try {
    const files = req.files as UploadedFile[];

    const images = files.map(file => file.filename);
    const destinations = JSON.parse(req.body.destinations);
    const schedule = JSON.parse(req.body.schedule);

    const tour = await Tour.create({
      title: req.body.title,
      images,
      destinations,
      price: parseFloat(req.body.price),
      description: req.body.description,
      route: null,
      places: req.body.places,
      duration: parseInt(req.body.duration),
      schedule,
    });

    return res.send(tour);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

toursRouter.put('/:id', auth, permit('admin'), imagesUpload.array('images', 50), async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.sendStatus(404);
    }

    const files = req.files as UploadedFile[];
    const images = files.map(file => file.filename);
    const destinations = JSON.parse(req.body.destinations);
    const schedule = JSON.parse(req.body.schedule);

    tour.title = req.body.title || tour.title;
    tour.price = req.body.price ? parseFloat(req.body.price) : tour.price;
    tour.description = req.body.description || tour.description;
    tour.destinations = req.body.destinations ? destinations : tour.destinations;
    if (req.file) {
      tour.route = req.file.filename;
    }
    tour.places = req.body.places;
    tour.duration = req.body.duration ? parseInt(req.body.duration) : tour.duration;
    tour.schedule = req.body.schedule ? schedule : tour.schedule;
    tour.images = images

    await tour.save();
    return res.send(tour);
  } catch (e) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

toursRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.sendStatus(404);
    }

    await Tour.deleteOne({ _id: req.params.id });
    return res.send({ message: 'Tour deleted!' });
  } catch (e) {
    return next(e);
  }
});

export default toursRouter;
