/**
 * Utility functions
 *
 */

import { parse } from "csv-parse/sync";
import { ETFHolding } from "../types/etf.types";

export function parseCSV<T>(content: string): T[] {
    return parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }) as T[];
}

export function parseETFWeights(csvContent: string): ETFHolding[] {
    const records = parseCSV<Record<string, string>>(csvContent);
    return records
        .filter((row) => row["name"] !== undefined && row["weight"] !== undefined)
        .map((row) => ({
            name: row["name"]!,
            weight: parseFloat(row["weight"]!),
        }));
}
