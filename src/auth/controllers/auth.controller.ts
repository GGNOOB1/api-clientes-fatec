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
          .setHeader('Authorization', `Bearer ${token}`)
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

  public async recuperarSenha(req: Request, res: Response) {
    try {
      const resultado = await this.authService.forgotPassword(req.body);

      res.status(200).json({ message: resultado });
    } catch (error) {
      return res.status(400).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  public async teste(req: Request, res: Response) {
    // const criptografado = criptografarInfo(1);
    // const descriptografado = descriptografarInfo(criptografado);
    // res.status(200).json({
    //   criptografado: criptografado,
    //   descriptografado: descriptografado,
    // });
  }

  public async resetSenha(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const resetarSenha = await this.authService.verificarResetSenha(token);

      res.status(200).json(resetarSenha);
    } catch (error) {
      return res.status(401).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  public async novaSenha(req: Request, res: Response) {
    try {
      const newPassword = await this.authService.novaSenha(req.body);

      if (newPassword.success) {
        res.status(200).json({ message: 'success' });
      } else {
        res.status(400).json(newPassword.errors);
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }
}
