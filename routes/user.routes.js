import Router from 'express';
const route = Router();

import { user_signup, user_signin } from '../controllers/user.js';

route.post('/signup', user_signup); // http://localhost:3000/api/users/signup

route.post('/signin', user_signin);

export default route;