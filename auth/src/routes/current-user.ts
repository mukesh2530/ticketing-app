import express from "express";
import { currentUser } from "@mukesh2530/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser as any, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
