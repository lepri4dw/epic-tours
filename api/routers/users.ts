import express from "express";
// import mongoose from "mongoose";
// import config from "../config";
// import crypto from "crypto";
// import * as fs from "fs";
// import fetch from 'node-fetch';
// import path from "path";
// import {imagesUpload} from "../multer";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }

  try {
    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password correct!', user});
  } catch (e) {
    return next(e);
  }

});

// const downloadFile = async (url: string, filename: string) => {
//   const response = await fetch(url);
//   const fileStream = fs.createWriteStream(filename);
//   await new Promise<void>((resolve, reject) => {
//     response.body.pipe(fileStream);
//     response.body.on("error", (err) => {
//       reject(err);
//     });
//     fileStream.on("finish", function () {
//       resolve();
//     });
//   });
// };

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK'};

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});


export default usersRouter;