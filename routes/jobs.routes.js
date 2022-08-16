import Router from 'express';
const router = Router(); 

// product controller
import { create_jobs, jobs_get_one, jobs_get_one_jobsId, jobs_update_one} from '../controllers/jobs.js';

router.post('/', create_jobs);

router.get('/', jobs_get_one);

router.patch('/:jobs', jobs_get_one_jobsId);
router.patch('/:jobsId', jobs_update_one);


       
export default router;