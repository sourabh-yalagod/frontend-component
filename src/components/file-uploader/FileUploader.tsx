import { useRef, useState } from "react";

const FileUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const dropRef = useRef<HTMLDivElement>(null);

    // ---- DRAG EVENTS ----
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        dropRef.current?.classList.add("border-blue-500");
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        dropRef.current?.classList.remove("border-blue-500");
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        dropRef.current?.classList.remove("border-blue-500");

        const droppedFiles = e.dataTransfer.files;
        addFiles(droppedFiles);
    }

    function addFiles(fileList: FileList | null) {
        if (!fileList) return;
        const newFiles = Array.from(fileList);
        setFiles((prev) => {
            const unique = newFiles.filter(
                (f) => !prev.some((p) => p.name === f.name && p.size === f.size)
            );
            return [...prev, ...unique];
        });
    }

    // ---- CANCEL SINGLE ----
    function handleCancel(file: File) {
        setFiles((prev) => prev.filter((f) => f !== file));
    }

    // ---- CANCEL ALL ----
    function cancelAll() {
        setFiles([]);
    }

    // ---- SIMULATE UPLOAD ----
    function handleFileUpload() {
        console.log("Uploading...");

        setTimeout(() => {
            console.log("Upload finished");
            cancelAll();
        }, 2000);
    }

    return (
        <div className="p-6 border rounded-lg max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Advanced File Uploader</h2>

            {/* DROPZONE */}
            <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="p-10 border-2 border-dashed rounded-lg text-center text-gray-600"
            >
                Drag & Drop files here
            </div>

            {/* FILE INPUT */}
            <input
                type="file"
                multiple
                onChange={(e) => addFiles(e.target.files)}
                className="mt-4"
            />

            {/* FILE LIST */}
            <ul className="mt-4 space-y-2">
                {files.map((f, i) => (
                    <li key={i} className="p-2 border rounded bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p>
                                {f.name.slice(0, 20)} - {(f.size / 1024).toFixed(1)} KB
                            </p>
                            <button
                                className="text-red-500 ml-4"
                                onClick={() => handleCancel(f)}
                            >
                                Cancel
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* ACTION BUTTONS */}
            {files.length > 0 && (
                <div className="mt-4 flex gap-3">
                    <button
                        onClick={cancelAll}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Cancel All
                    </button>
                    <button
                        onClick={handleFileUpload}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Upload
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
