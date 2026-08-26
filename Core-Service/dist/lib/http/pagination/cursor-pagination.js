import { camelToSnakeCase } from "../../../pkg/utils/camelToSnakeCase";
// createdAt: 2025-10-10 desc 10
// select * from xxxx where xxx = yyy
// createdAt  < 2025-10-10 order by created_at desc limit 10
export function applyCursorPagination(query, params) {
    if (!params.sortBy) {
        return query;
    }
    const sortColumn = camelToSnakeCase(params.sortBy);
    if (params.cursor) {
        const op = params.sortOrder === 'asc' ? '>' : '<';
        query = query.where(sortColumn, op, params.cursor);
    }
    return query
        .orderBy(sortColumn, params.sortOrder)
        .limit(params.limit + 1);
}
export function applyFilters(query, filters) {
    for (const filter of filters) {
        switch (filter.operator) {
            case 'eq':
                query.where(filter.field, filter.value);
                break;
            case 'gt':
                query.where(filter.field, '>', filter.value);
                break;
            case 'lt':
                query.where(filter.field, '<', filter.value);
                break;
            case 'lte':
                query.where(filter.field, '<=', filter.value);
                break;
            case 'gte':
                query.where(filter.field, '>=', filter.value);
                break;
            case 'like':
                query.whereLike(filter.field, `%${filter.value}%`);
                break; // LIKE bdu -> abdullah
            case 'in':
                query.whereIn(filter.field, Array.isArray(filter.value) ? filter.value : [filter.value]);
                break;
        }
    }
    return query;
}
export function buildPaginationResult(rows, limit, sortBy) {
    const hasMore = rows.length > limit;
    const data = hasMore ? rows.slice(0, limit) : rows;
    let nextCursor = null;
    if (data.length > 0) {
        const lastItem = data[data.length - 1];
        console.log(lastItem);
        nextCursor = hasMore && lastItem ? String(lastItem[sortBy]) : null;
    }
    return {
        data,
        meta: {
            nextCursor: nextCursor,
            hasMore: hasMore,
            count: data.length,
        }
    };
}
//# sourceMappingURL=cursor-pagination.js.map