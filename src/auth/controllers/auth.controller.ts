import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response) {
    try {
      const resposta = await this.authService.verificarLogin(req.body);

      if (resposta.success) {
        res.status(200).json(resposta.message);
      } else {
        res.status(400).json(resposta.errors);
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }
}
