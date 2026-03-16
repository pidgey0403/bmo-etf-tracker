/**
 * Controller layer
 *
 * Handles HTTP concerns only: reading from req, writing to res, input validation, and error responses.
 * Delegates all computation to the service layers.
 */

import type { Request, Response } from "express";
import { analyzeETF } from "../services/etf.service";

export function uploadETF(req: Request, res: Response): void {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }

    const csvContent = req.file.buffer.toString("utf-8");

    try {
        const result = analyzeETF(csvContent);
        res.json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to process ETF file";
        res.status(400).json({ error: message });
    }
}