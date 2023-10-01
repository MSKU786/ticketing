import express, { Router } from 'express';

const router = express.Router();

router.get('/api/user/currentUser', (req, res) => {
  res.send('hi there ~~~~ :)');
});

export { router as currentUserRouter };
