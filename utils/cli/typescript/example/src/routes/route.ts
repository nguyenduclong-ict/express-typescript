import { Router } from 'express';
import * as service from './service';
const router = Router();
// ------- Declare router -------
router.get('/', service.handle);
// ------------------------------
export default router;
