import { Router} from 'express';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from './todo.controllers';
import {requestValidator} from '../../middlewares/validator';
import Todo from './todo.model';
import {paramsWithId} from '../interfaces/paramsWithId';
const router = Router();

router.get('/', getTodos);
router.post('/', requestValidator({
    body:Todo
}), createTodo);

router.get('/:id',requestValidator({
    params:paramsWithId
}),getTodo);

router.put('/:id',requestValidator({
    params:paramsWithId,
    body:Todo,
}), updateTodo)

router.delete('/:id', requestValidator({
    params:paramsWithId,
}), deleteTodo)
export default router;
