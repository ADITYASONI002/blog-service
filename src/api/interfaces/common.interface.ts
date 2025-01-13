export interface Pagination {
  limit: number;
  offset: number;
  order: [[string, 'ASC' | 'DESC']];
}
