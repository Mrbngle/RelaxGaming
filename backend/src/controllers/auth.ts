
import { Request, Response } from 'express';
import * as authService from '../services/auth';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const { token } = await authService.loginUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
