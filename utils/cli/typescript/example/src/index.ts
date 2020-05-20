import 'module-alias/register';
import { createServer } from 'fesjs';
import config from './config';
import mongodbService from '@/services/mongodb';
const { app, server, start } = createServer(config);
// Add config app and server here
mongodbService(app, server);
// Start server
start();
