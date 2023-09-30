import express, { Router } from 'express';

const router = express.Router();

router.get('/api/user/currentUser', () => {});

export { router as currentUserRouter };
