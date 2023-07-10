import {Router} from 'express';
import todoRoutes from './todo/todo.routes';

const router = Router();

router.use('/todos', todoRoutes);

export default router;