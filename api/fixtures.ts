import User from "./models/User";
import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    username: 'admin@gmail.com',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin',
  });

  await db.close();
};

run().catch(console.error);