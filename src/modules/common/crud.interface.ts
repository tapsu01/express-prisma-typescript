export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  updateById: (id: number, resource: any) => Promise<any>;
  findById: (id: number) => Promise<any>;
  deleteById: (id: number) => Promise<object>;
  patchById: (id: number, resource: any) => Promise<any>;
}
