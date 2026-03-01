import express from 'express';
import { deployOlympiadToCms } from '../../controllers/cmsController.js';

const router = express.Router();

router.post('/deploy/:commandVariant/:olympiadId', deployOlympiadToCms);

export default router;
