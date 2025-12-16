import { useState } from "react";
import rowData from "./data";

const FileExplore = ({ node }: any) => {
    const [data] = useState<any>(rowData);
    const [openFolder, setOpenFolder] = useState<any>([]);
    const [inputBox, setInputBox] = useState(false);
    const [fileName, setFileName] = useState("");

    if (!node) return null;

    const handleFileCreate = (parentId: number, name: string) => {
        if (!name.trim()) return;

        const id = Math.random();
        data[id] = { parentId, name, children: [], type: "file" };
        data[parentId].children.push(id);
        setFileName("");
        setInputBox(false);
    };

    const isOpen = openFolder.includes(node.id);

    return (
        <div className="pl-4 text-sm">
            {/* Row */}
            <div className="group flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-gray-100">
                {/* Left */}
                <div className="flex items-center gap-2">
                    <span className="text-lg">
                        {node.type === "folder" ? "📁" : "📄"}
                    </span>
                    <span className="text-gray-800 ">
                        {node.name}
                    </span>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    {/* Expand / Collapse */}
                    {node.children?.length > 0 && (
                        <button
                            onClick={() =>
                                setOpenFolder((prev: any) =>
                                    isOpen
                                        ? prev.filter((id: any) => id !== node.id)
                                        : [...prev, node.id]
                                )
                            }
                            className="text-xs font-bold px-2 py-1 rounded hover:bg-gray-200"
                        >
                            {isOpen ? "-" : "+"}
                        </button>
                    )}

                    {/* New file */}
                    {node.type === "folder" && (
                        <button
                            onClick={() => setInputBox((prev) => !prev)}
                            className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            + File
                        </button>
                    )}
                </div>
            </div>

            {/* Create file input */}
            {inputBox && (
                <div className="ml-8 mt-1 flex items-center gap-2">
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="File name"
                        className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={() => handleFileCreate(node.id, fileName)}
                        className="rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
                    >
                        Create
                    </button>
                </div>
            )}

            {/* Children */}
            {isOpen &&
                node.children?.map((childId: number) => (
                    <FileExplore key={childId} node={data[childId]} />
                ))}
        </div>
    );
};

export default FileExplore;
