type ActionParamSchema = { [key: string]: any };
type ActionParamTypes =
  | 'any'
  | 'array'
  | 'boolean'
  | 'custom'
  | 'date'
  | 'email'
  | 'enum'
  | 'forbidden'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'url'
  | 'uuid'
  | boolean
  | ActionParamSchema;
export type ActionParams = {
  [key: string]: ActionParamTypes;
};
