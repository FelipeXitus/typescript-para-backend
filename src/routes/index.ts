import express from "express";
import petRouter from "../routes/petRouter";

const router = (app: express.Application) => {
    app.use("/pets", petRouter);
};
export default router;