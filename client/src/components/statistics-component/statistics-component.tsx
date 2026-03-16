import { StatsCardProps, StatsStripProps } from "./statistics.types";

function StatCard({ label, value, mono = false }: StatsCardProps) {
    return (
        <div className="bg-surface-2 border border-border rounded-lg px-5 py-3.5 flex-1 min-w-[140px]">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-1.5">
                {label}
            </div>
            <div className={`text-xl font-semibold text-text-primary ${mono ? "font-mono" : "font-sans"}`}>
                {value}
            </div>
        </div>
    );
}

export default function StatisticsComponent({ meta, etfName }: StatsStripProps) {
    const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD", minimumFractionDigits: 2 });

    return (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <StatCard label="ETF" value={etfName} />
            <StatCard label="Latest Price" value={fmt.format(meta.latestETFPrice)} mono />
            <StatCard label="Date Range" value={`${meta.dateRange.start} → ${meta.dateRange.end}`} mono />
        </div>
    );
}