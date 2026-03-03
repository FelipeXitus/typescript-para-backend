import express from "express";
import petRouter from "../routes/petRouter";
import adopterRouter from "../routes/adopterRouter";

const router = (app: express.Application) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adopterRouter);
};
export default router;