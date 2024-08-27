import { Router } from 'express';

import {
  getSeasons,
  createSeason,
  updateSeason,
  getSeason,
  deleteSeason,
} from '../repository/seasonsRepository.js';
const router = Router();

router.get('/api/seasons', getSeasons);
router.get('/api/seasons/:id', getSeason);
router.post('/api/seasons', createSeason);
router.put('/api/seasons/updateSeason/:id', updateSeason);
router.delete('/api/seasons/:id', deleteSeason);

export default router;
