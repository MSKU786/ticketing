import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post(
  '/api/existingUser/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is not correct'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('INvalid Credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('INvalid Credentials');
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      //To override tS functionality to check because we alredy define this key
      process.env.JWT_KEY!
    );

    //Store it on the session object
    req.session = { jwt: jwtToken };
    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
