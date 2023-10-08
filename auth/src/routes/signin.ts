import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post(
  '/api/user/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is not correct'),
  ],
  validationResult,
  async (req: Request, res: Response) => {}
);

export { router as signinRouter };
