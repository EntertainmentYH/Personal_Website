import express from 'express';
import {
  handleVote,
  getVoteResults
} from '../controllers/vote.controller.js';
import { voteLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

// POST /api/vote
router.post('/', voteLimiter, handleVote);

// GET /api/votes/results
router.get('/results', getVoteResults);

export default router;