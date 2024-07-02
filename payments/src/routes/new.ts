import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  currentUser,
  requireAuth,
  validateRequest,
} from '@ticcketing/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payemnt';
const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, token } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for cancelled order');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price,
      source: token,
    });

    console.log(charge, '00000000000000');

    // const payment = Payment.build({
    //   orderId,
    //   stripeId: charge?.id,
    // });

    // await payment.save();
    // console.log(JSON.stringify(payment));

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
