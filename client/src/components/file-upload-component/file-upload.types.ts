export interface FileUploadProps {
    onUpload: (file: File) => void;
    isLoading: boolean;
}