import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.route('/login').post(authController.login.bind(authController));
authRouter
  .route('/recuperarSenha')
  .post(authController.recuperarSenha.bind(authController));

authRouter.route('/teste').post(authController.teste.bind(authController));

authRouter
  .route('/reset-senha')
  .post(authController.resetSenha.bind(authController));

authRouter
  .route('/nova-senha')
  .patch(authController.novaSenha.bind(authController));

export default authRouter;
