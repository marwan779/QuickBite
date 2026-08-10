import { Router } from "express";
import { pingDB } from "../common/knex/knex.js";
export const healthRouter = Router();
healthRouter.get("/", async (res) => {
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