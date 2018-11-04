import { Router } from 'express';

import { getPodcast } from '/controllers';

const router = Router();

router.get('/podcast/:number', getPodcast);

export default router;
