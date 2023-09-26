import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  private authService: AuthService;
  public expirationDate = new Date();
  public expirationMinutes = 5;

  constructor() {
    this.authService = new AuthService();
    this.expirationDate.setTime(
      this.expirationDate.getTime() + this.expirationMinutes * 60 * 1000,
    );
  }

  public async login(req: Request, res: Response) {
    try {
      const resposta = await this.authService.verificarLogin(req.body);

      if (resposta.success) {
        const token = resposta.message.token;

        res
          .status(200)
          .setHeader('Authorization', `Bearer ${resposta.message.token}`)
          .json(resposta.message);
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
