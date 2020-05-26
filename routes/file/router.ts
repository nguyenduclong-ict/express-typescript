import { Router } from 'express'
import * as service from './service'
const router = Router()
import AuthGuard from '@/middlewares/guard'
// ------- Declare router -------
router.get('/:filename', AuthGuard(), service.handleGetFile)
// ------------------------------
export default router
