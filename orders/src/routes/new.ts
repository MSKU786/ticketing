import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@ticcketing/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Ticket id must be porvided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //find the ticket user is trying to order

    return res.send({});
  }
);

export { router as newOrderRouter };
