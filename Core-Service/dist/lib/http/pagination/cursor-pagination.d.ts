import type { Knex } from "knex";
export interface PaginationParams {
    cursor?: string;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
export interface FilterParams {
    field: string;
    operator: 'eq' | 'gt' | 'lt' | 'lte' | 'gte' | 'in' | 'like';
    value: string | string[];
}
export interface PaginationMeta {
    nextCursor: string | null;
    hasMore: boolean;
    count: number;
}
export declare function applyCursorPagination(query: Knex.QueryBuilder, params: PaginationParams): Knex.QueryBuilder;
export declare function applyFilters(query: Knex.QueryBuilder, filters: FilterParams[]): Knex.QueryBuilder;
export declare function buildPaginationResult<T>(rows: T[], limit: number, sortBy: string): {
    data: T[];
    meta: PaginationMeta;
};
//# sourceMappingURL=cursor-pagination.d.ts.map