import { Router } from 'express'
import * as service from './service'
const router = Router()
// ------- Declare router -------
router.get('/', service.handleGetListLocation)
// ------------------------------
export default router
