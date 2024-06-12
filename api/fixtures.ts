import User from "./models/User";
import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import Destination from "./models/Destination";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('destinations');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    username: 'admin@gmail.com',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin',
  });

  await Destination.create({
    name: 'Kyrgyzstan',
    image: 'fixtures/kgz.jpg',
  }, {
    name: 'Uzbekistan',
    image: 'fixtures/uzb.jpg'
  }, {
    name: 'Kazakhstan',
    image: 'fixtures/kzh.jpg'
  },)

  await db.close();
};

run().catch(console.error);