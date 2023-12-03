import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@ticcketing/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
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
    const { ticetId } = req.body;
    //find the ticket user is trying to order
    const ticket = await Ticket.findById(ticetId);

    if (!ticket) {
      throw new NotFoundError();
    }
    //Make sure ticket is not reserved
    const existingOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
          OrderStatus.Created,
        ],
      },
    });

    if (existingOrder) {
      throw new BadRequestError('Ticket is already Reserved');
    }
    //Calculate an expiration date for the order

    //Build the order and save it to db

    // publish an event order is created
    return res.send({});
  }
);

export { router as newOrderRouter };
