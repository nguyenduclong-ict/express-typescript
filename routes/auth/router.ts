import { Router } from 'express'
import * as service from './service'
const router = Router()
import AuthGuard from '@/middlewares/guard'
// ------- Declare router -------
router.post('/register', service.handleRegister)
router.post('/login', service.handleLogin)
router.post('/google', service.handleLoginWithGoogle)
router.post('/facebook', service.handleLoginWithFacebook)
router.get('/me', AuthGuard(), service.handleGetInfo)
router.post('/logout', AuthGuard(), service.handleLogout)
// profile
router.post('/me', AuthGuard(), service.handleUpdateUserInfo)
// ------------------------------
export default router
