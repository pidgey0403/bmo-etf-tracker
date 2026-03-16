/**
 * Route handler
 *
 * Maps HTTP endpoints to controller functions.
 * Handles mapping routes and calling the appropriate middleware from the controller
 */

import { Router } from "express";
import multer from "multer";
import { uploadETF } from "../controllers/etf.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadETF);

export default router;