import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.route('/login').post(authController.login.bind(authController));

export default authRouter;
