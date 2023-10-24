import express, { Router } from 'express';
import { requireAuth } from '@ticcketing/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req, res) => {
  return res.sendStatus(200);
});

export { router as createTicketRouter };
