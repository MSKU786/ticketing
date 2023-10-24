import express, { Router } from 'express';
import { currentUser } from '@ticcketing/common';

const router = express.Router();

router.post('/api/tickets', currentUser, (req, res) => {
  return res.sendStatus(200);
});

export { router as createTicketRouter };
