import { useRef, useState } from "react";
import rowData from "./data.json";

const DragAndDrop = () => {
    // Holds all containers and their items
    const [data, setData] = useState<any>(rowData);

    // Stores the currently dragged item and its source container
    const targetedElement = useRef<{
        item: any;
        from: string;
    } | null>(null);

    /**
     * Fired when dragging starts
     * Saves the dragged item and its container
     */
    const handleDragStart = (container: string, target: any) => {
        targetedElement.current = { item: target, from: container };
    };

    /**
     * Fired when item is dropped on a container
     * Removes item from source container and adds it to target container
     */
    const handleDrop = (container: string) => {
        const dragged = targetedElement.current;

        // Safety checks
        if (!dragged) return;
        if (dragged.from === container) return;

        setData((prev: any) => ({
            ...prev,
            // Remove item from source container
            [dragged.from]: prev[dragged.from].filter(
                (item: any) => item.id !== dragged.item.id
            ),
            // Add item to target container
            [container]: [...prev[container], dragged.item],
        }));

        // Clear ref after drop
        targetedElement.current = null;
    };

    return (
        <div className="p-4">
            <div className="space-y-6">
                {Object.keys(data).map((key: string) => (
                    <div
                        key={key}
                        // Required to allow dropping
                        onDragOver={(e) => e.preventDefault()}
                        // Correct drop handler
                        onDrop={() => handleDrop(key)}
                        className="space-y-2 rounded-lg border p-4"
                    >
                        <h2 className="text-lg font-semibold capitalize">{key}</h2>

                        {data[key].map((item: { id: string; title: string }) => (
                            <div
                                key={item.id}
                                draggable
                                // Start dragging this item
                                onDragStart={() => handleDragStart(key, item)}
                                className="
                  cursor-move rounded-lg border
                  bg-white px-4 py-2 shadow-sm
                  hover:bg-gray-100 transition
                "
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDrop;
