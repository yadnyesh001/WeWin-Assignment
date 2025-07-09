import express from 'express';
import {
  getAllLongWeekends,
  getNextLongWeekend
} from '../controllers/longWeekendController.js';

const router = express.Router();

router.get('/:countryCode', getAllLongWeekends);
router.get('/next/:countryCode', getNextLongWeekend);

export default router;