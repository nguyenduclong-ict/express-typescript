import { IConfig } from 'fesjs';
import path from 'path';

const config: IConfig = {
  dirroot: path.join(__dirname, '..'),
  env: {
    PORT: 3002,
  },
  database: [
    {
      type: 'mongo',
      dbName: 'ischool',
      authDb: 'ischool',
      host: 'localhost',
      pass: 'long@123',
      user: 'ischool',
      port: '27017',
    },
  ],
};
export default config;
