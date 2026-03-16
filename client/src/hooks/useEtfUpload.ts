import { useState } from "react";
import type { ETFResponse, UseETFUpload } from "../types/global.types";

export function useETFUpload(): UseETFUpload {
    const [data, setData] = useState<ETFResponse | null>(null);
    const [etfName, setEtfName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setEtfName(file.name.replace(".csv", "").toUpperCase());

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/etf/upload", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Upload failed");
            }
            setData(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, etfName, isLoading, error, handleUpload };
}