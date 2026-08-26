export function sendSuccess(res, data, statusCode = 200, meta) {
    const body = { success: true, data: data };
    if (meta)
        body.meta = meta;
    res.status(statusCode).json(body);
}
export function sendPaginated(res, data, meta) {
    res.status(200).json({ success: true, data: data, meta });
}
//# sourceMappingURL=response.js.map