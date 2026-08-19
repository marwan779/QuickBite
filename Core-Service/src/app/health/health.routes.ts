import { Router, type Request, type Response } from "express";
import { pingDB } from "../../lib/knex/knex";

export const healthRouter = Router();

healthRouter.get("/", async (_req: Request, res: Response) => {
    try {
        await pingDB();

        return res.status(200).send({
            status: "ok",
            database: "up"
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "database down"
        });
    }
});