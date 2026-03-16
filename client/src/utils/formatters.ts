export const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export const pct = (n: number) => `${(n * 100).toFixed(2)}%`;