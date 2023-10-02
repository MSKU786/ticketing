import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/user/signup',
  [
    body('email').isEmail().withMessage('Email must be Valid!'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    console.log('creating a user');

    return res.send('hi there ~~~~ let`s sign up :)');
  }
);

export { router as signupRouter };
