import Router from 'express';
const router = Router(); 


// auction controller
import { blogs_gets_all, blogs_create_blogs, blogs_update_one, blogs_get_one,} from '../controllers/blogs.js';


router.get('/', blogs_gets_all );

router.post('/',  blogs_create_blogs );

router.patch('/:blogsId', blogs_update_one);

router.get('/:blogsId', blogs_get_one);
       
export default router;