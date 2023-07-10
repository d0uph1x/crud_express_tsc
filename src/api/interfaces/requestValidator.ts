import { AnyZodObject } from "zod";

interface validatorI {
    params?: AnyZodObject,
    query?: AnyZodObject,
    body?: AnyZodObject,
}

export default validatorI