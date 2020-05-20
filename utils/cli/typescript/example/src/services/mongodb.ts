import { Config } from 'fesjs';
import { connect } from 'fesjs/mongoose';
import mongoose from 'mongoose';
export default async function (app, server) {
  const config = Config.database.find((c) => c.type === 'mongo');
  if (config) {
    mongoose.connection.on('connected', () => {
      console.log('connected to mongodb:', mongoose.connection.name);
    });
    connect(config as any);
  }
}
