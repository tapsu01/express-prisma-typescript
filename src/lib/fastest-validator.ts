import { RequestHandler } from 'express';
import Validator, {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationError,
  ValidationSchema
} from 'fastest-validator';

const fastestValidator = new Validator();

export default fastestValidator;

type TCheckFunc = SyncCheckFunction | AsyncCheckFunction;

export const RequestValidator = <B = any, Q = any, P = any>(schemas: {
  body?: ValidationSchema<B>;
  query?: ValidationSchema<Q>;
  params?: ValidationSchema<P>;
}): RequestHandler => {
  const checkFuncs: Array<{ key: string; checkFunc: TCheckFunc }> = [];
  const schemasTmp: any = schemas;

  for (const key in schemas) {
    if (Boolean(schemasTmp[key]) === true) {
      checkFuncs.push({
        key,
        checkFunc: fastestValidator.compile(schemasTmp[key])
      });
    }
  }

  return async (req: any, res: any, next: any): Promise<void> => {
    try {
      const errors: any = {};

      for (const { key, checkFunc } of checkFuncs) {
        const result = await checkFunc(req[key]);
        if (result !== true) {
          errors[key] = result;
        }
      }

      if (Object.keys(errors).length > 0) {
        next(errors);
        return;
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
};
