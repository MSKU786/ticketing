import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@ticcketing/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    return res.status(200).send(ticket);
  }
);

export { router as updateTicketRouter };
