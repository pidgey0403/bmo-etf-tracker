import { useCallback, useState } from "react";
import { FileUploadProps } from "./file-upload.types";

export default function FileUploadComponent({ onUpload, isLoading }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFile = useCallback(
        (file: File) => {
            if (!file.name.endsWith(".csv")) {
                alert("Please upload a .csv file");
                return;
            }
            setFileName(file.name);
            onUpload(file);
        },
        [onUpload]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{ border: `2px dashed ${isDragging ? "var(--bmo-accent)" : "var(--border)"}` }}
            className={`rounded-xl px-6 py-9 text-center transition-all duration-150 cursor-pointer ${isDragging ? "bg-bmo-light" : "bg-surface-2"
                }`}
            onClick={() => document.getElementById("csv-input")?.click()}
        >
            <input
                id="csv-input"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleChange}
            />

            {/* Icon */}
            <div style={{ marginBottom: 12 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ margin: "0 auto" }}>
                    <rect width="36" height="36" rx="8" fill="var(--bmo-light, #EBF7FF)" />
                    <path d="M18 8v13M12 15l6-7 6 7" stroke="var(--bmo-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 26h16" stroke="var(--bmo-blue)" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            {isLoading ? (
                <p className="text-bmo-blue font-medium m-0">
                    Processing...
                </p>
            ) : fileName ? (
                <>
                    <p className="text-bmo-blue font-semibold mb-1 m-0">
                        {fileName}
                    </p>
                    <p className="text-text-muted text-[13px] m-0">
                        Click or drop to replace
                    </p>
                </>
            ) : (
                <>
                    <p className="font-semibold mb-1 m-0 text-text-primary">
                        Drop your ETF CSV here
                    </p>
                    <p className="text-text-muted text-[13px] m-0">
                        ETF1.csv or ETF2.csv · Click to browse
                    </p>
                </>
            )}
        </div>
    );
}