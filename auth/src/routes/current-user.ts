import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
const router = express.Router();

router.get('/api/user/currentUser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
