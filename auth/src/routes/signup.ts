import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '@ticcketing/common';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@ticcketing/common';

const router = express.Router();

router.post(
  '/api/user/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate Web token

    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      //To override tS functionality to check because we alredy define this key
      process.env.JWT_KEY!
    );

    //Store it on the session object
    req.session = { jwt: jwtToken };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
