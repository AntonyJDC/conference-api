import { Router } from 'express';
import { getEventVersion } from '../controllers/version.controller';

const router = Router();
router.get('/version', getEventVersion);

export default router;
