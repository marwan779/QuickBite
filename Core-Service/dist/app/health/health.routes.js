import { Router } from "express";
import { pingDB } from "../../common/knex/knex";
export const healthRouter = Router();
healthRouter.get("/", async (_req, res) => {
    try {
        await pingDB();
        return res.status(200).send({
            status: "ok",
            database: "up"
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "database down"
        });
    }
});
//# sourceMappingURL=health.routes.js.map