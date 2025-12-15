import { useEffect, useRef, useState } from "react";
import rowData from "./data.json";
import type { Data } from "./type";

const Select = () => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Data | null>(null);
    const [search, setSearch] = useState("");
    const selectRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const filtered = rowData.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    // Reset index when filtered list changes
    useEffect(() => {
        setIndex(0);
    }, [search]);

    // Scroll active option into view
    useEffect(() => {
        optionRefs.current[index]?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, [index]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open || filtered.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setIndex((prev) => (prev + 1) % filtered.length);
                break;

            case "ArrowUp":
                e.preventDefault();
                setIndex((prev) =>
                    prev === 0 ? filtered.length - 1 : prev - 1
                );
                break;

            case "Enter":
                e.preventDefault();
                const item = filtered[index];
                if (item) {
                    setSelected(item);
                    setSearch(item.label);
                    setOpen(false);
                }
                break;

            case "Escape":
                setOpen(false);
                break;
        }
    };
    const detectOutSideClick = (e: MouseEvent) => {
        if (!selectRef.current?.contains(e.target as Node)) setOpen(false);
    }
    useEffect(() => {
        window.addEventListener("mousedown", detectOutSideClick);

        return () => {
            window.removeEventListener("mousedown", detectOutSideClick);
        };
    }, []);
    return (
        <div ref={selectRef} className="relative w-full max-w-sm">
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl border px-4 py-2.5"
                placeholder="Select topic"
                aria-expanded={open}
                aria-autocomplete="list"
            />

            {open && (
                <ul
                    role="listbox"
                    className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border bg-white shadow-lg"
                >
                    {filtered.map((item, idx) => (
                        <li
                            key={item.id}
                            ref={(el) => {
                                optionRefs.current[idx] = el;
                            }}
                            tabIndex={-1}
                            role="option"
                            aria-selected={idx === index}
                            onClick={() => {
                                setSelected(item);
                                setSearch(item.label);
                                setOpen(false);
                            }}
                            className={`cursor-pointer px-4 py-2 transition
                ${idx === index ? "bg-blue-100" : "hover:bg-gray-100"}
              `}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
