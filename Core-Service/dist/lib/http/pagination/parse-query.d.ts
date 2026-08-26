import type { PaginationParams, FilterParams } from "./cursor-pagination";
export declare function parsePaginationQuery(query: Record<string, any>, allowedSortBy?: string[]): PaginationParams;
export declare function parseFilters(query: Record<string, any>, allowedFields: string[]): FilterParams[];
//# sourceMappingURL=parse-query.d.ts.map