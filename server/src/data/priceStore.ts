/**
 * Data layer
 *
 * Responsible for loading and exposing the in-memory price map. 
 * In a real production application, this layer would be responsible for interacting with the database, often using an ORM.
 */

import fs from "fs";
import path from "path";
import { parseCSV } from "../utils/csvParser";

type TickerPriceMap = Record<string, number>;
type PriceMap = Record<string, TickerPriceMap>; // Hashmap of date: {ticker: price}

let priceMap: PriceMap = {};
let sortedDates: string[] = [];

export function loadPrices(): void {
    const filePath = path.join(__dirname, "./prices.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    const records = parseCSV<Record<string, string>>(content);

    priceMap = {};
    for (const row of records) {
        const date = row["DATE"];
        if (!date) continue;
        priceMap[date] = {};
        for (const [key, val] of Object.entries(row)) {
            if (key !== "DATE") {
                priceMap[date][key] = parseFloat(val);
            }
        }
    }

    sortedDates = Object.keys(priceMap).sort();
}

export function getPriceMap(): PriceMap {
    return priceMap;
}

export function getSortedDates(): string[] {
    return sortedDates;
}

export function getLatestPrices(): TickerPriceMap {
    const latestDate = sortedDates[sortedDates.length - 1];
    return latestDate ? (priceMap[latestDate] ?? {}) : {};
}

export function getLatestDate(): string {
    return sortedDates[sortedDates.length - 1] ?? "";
}

export function getDateRange(): { start: string; end: string } {
    return { start: sortedDates[0] ?? "", end: sortedDates[sortedDates.length - 1] ?? "" };
}