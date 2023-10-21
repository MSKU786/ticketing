import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '@ticcketing/common';
import { requireAuth } from '@ticcketing/common';
const router = express.Router();

router.get('/api/user/currentUser', currentUser, (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
