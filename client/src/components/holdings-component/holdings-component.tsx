import { useState } from "react";
import { SortKey, SortDir } from "../../types/global.types";
import { pct, fmt } from "../../utils/formatters";
import { HoldingsTableProps } from "./holdings.types";

export default function HoldingsComponent({ holdings }: HoldingsTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>("holdingSize");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const handleSort = (key: SortKey) => {
        if (key === sortKey) {
            setSortDir(d => d === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    };

    const sorted = [...holdings].sort((a, b) => {
        const av = a[sortKey] ?? 0;
        const bv = b[sortKey] ?? 0;
        const cmp = typeof av === "string"
            ? av.localeCompare(bv as string)
            : (av as number) - (bv as number);
        return sortDir === "asc" ? cmp : -cmp;
    });

    const SortIcon = ({ col }: { col: SortKey }) => (
        <span style={{ opacity: sortKey === col ? 1 : 0.25 }} className="ml-1 text-[11px]">
            {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
        </span>
    );

    return (
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden">
            <div className="px-5 pt-4 pb-0 border-b border-border">
                <h2 className="mb-3.5 text-[15px] font-semibold">
                    Holdings
                    <span className="ml-2 text-xs font-normal text-text-muted">
                        — click columns to sort
                    </span>
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th
                                className="px-4 py-2.5 text-left text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em] cursor-pointer select-none whitespace-nowrap border-b border-border bg-surface"
                                onClick={() => handleSort("name")}
                            >
                                Ticker <SortIcon col="name" />
                            </th>
                            <th
                                className="px-4 py-2.5 text-right text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em] cursor-pointer select-none whitespace-nowrap border-b border-border bg-surface"
                                onClick={() => handleSort("weight")}
                            >
                                Weight <SortIcon col="weight" />
                            </th>
                            <th
                                className="px-4 py-2.5 text-right text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em] cursor-pointer select-none whitespace-nowrap border-b border-border bg-surface"
                                onClick={() => handleSort("latestPrice")}
                            >
                                Latest Close <SortIcon col="latestPrice" />
                            </th>
                            <th
                                className="px-4 py-2.5 text-right text-[11px] font-semibold text-text-muted uppercase tracking-[0.07em] cursor-pointer select-none whitespace-nowrap border-b border-border bg-surface"
                                onClick={() => handleSort("holdingSize")}
                            >
                                Holding Size <SortIcon col="holdingSize" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((h, i) => (
                            <tr
                                key={h.name}
                                style={{ background: i % 2 === 0 ? "var(--surface-2)" : "var(--surface)" }}
                            >
                                <td className="px-4 py-[11px] text-left text-sm border-b border-border text-text-primary">
                                    <span className="font-mono font-semibold text-[13px] bg-bmo-light text-bmo-blue px-2 py-0.5 rounded">
                                        {h.name}
                                    </span>
                                </td>
                                <td className="px-4 py-[11px] text-right text-[13px] font-mono border-b border-border text-text-primary">
                                    {pct(h.weight)}
                                </td>
                                <td className="px-4 py-[11px] text-right text-[13px] font-mono border-b border-border text-text-primary">
                                    {h.latestPrice != null ? fmt.format(h.latestPrice) : "—"}
                                </td>
                                <td className="px-4 py-[11px] text-right text-[13px] font-mono font-medium border-b border-border text-text-primary">
                                    {h.holdingSize != null ? fmt.format(h.holdingSize) : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}