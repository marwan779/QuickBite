export function parsePaginationQuery(query, allowedSortBy = ['createdAt']) {
    const requestedSortBy = query.sortBy;
    const sortBy = (allowedSortBy && allowedSortBy.includes(requestedSortBy))
        ? requestedSortBy
        : (allowedSortBy?.[0] || 'createdAt');
    const limitParsed = Number(query.limit);
    const limit = !isNaN(limitParsed) && limitParsed > 0
        ? Math.min(1000, limitParsed)
        : 20;
    return {
        cursor: query.cursor,
        limit,
        sortBy,
        sortOrder: query.sortOrder === 'desc' ? 'desc' : 'asc'
    };
}
// filter
// GET /api/users?filter[status][eq]=active&filter[age][gte]=25&filter[age][lte]=40&filter[id][in]=1,2,3
// {
//     filter: {
//         age: { gte: '25', lte: '40' },
//         status: { eq: 'active' },
//        id: { in: '1,2,3' }
//     }
// }
export function parseFilters(query, allowedFields) {
    const filter = query.filter;
    if (!filter || typeof filter !== 'object')
        return [];
    const allowedOps = new Set(['eq', 'gt', 'lt', 'gte', 'lte', 'like', 'in']);
    return allowedFields.flatMap((field) => {
        const fieldFilters = filter[field];
        if (!fieldFilters || typeof fieldFilters !== 'object')
            return [];
        return Object.entries(fieldFilters)
            .filter(([op]) => allowedOps.has(op))
            .map(([operator, value]) => ({
            field,
            operator: operator,
            value: value,
        }));
    });
}
//# sourceMappingURL=parse-query.js.map