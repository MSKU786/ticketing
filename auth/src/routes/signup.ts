import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
      throw new RequestValidationError(errors.array());
    }

    console.log('creating a user');
    throw new DatabaseConnectionError();
    return res.send('hi there ~~~~ let`s sign up :)');
  }
);

export { router as signupRouter };
