import {Router} from "express";
import { getTeams } from "../controllers/teamControllers.js";

const router = Router();

router.get("/", getTeams);

export default router;

