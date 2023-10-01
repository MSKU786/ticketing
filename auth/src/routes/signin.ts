import express, { Router } from 'express';

const router = express.Router();

router.post('/api/user/signin', (req, res) => {
  res.send('hi there ~~~~ :) we are signin');
});

export { router as signinRouter };
