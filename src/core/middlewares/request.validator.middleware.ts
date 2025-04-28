import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { type AnyZodObject, type ZodArray, ZodError } from 'zod';

type AnyZodSchema = AnyZodObject | ZodArray<AnyZodObject>;

export const validateRequest =
  (validators: {
    params?: AnyZodObject;
    body?: AnyZodSchema;
    query?: AnyZodObject;
  }): RequestHandler =>
  (req, res, next) => {
    try {
      if (validators.body) {
        req.body = validators.body.parse(req.body);
      }
      if (validators.params) {
        req.params = validators.params.parse(req.params);
      }
      if (validators.query) {
        req.query = validators.query.parse(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = error.errors.reduce<Record<string, string>>(
          (acc, curr) => {
            const fieldName = curr.path.length === 0 ? 'body' : curr.path.join('.');
            const message =
              curr.path.length === 0 && curr.code === 'invalid_type'
                ? 'Request body is missing or empty'
                : curr.message;

            acc[fieldName] = message;
            return acc;
          },
          {},
        );

        res.status(400).json({ errors: formattedErrors });
      } else {
        res.status(400).json({ message: 'Internal server error' });
      }
    }
  };
