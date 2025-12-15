import { useCallback, useEffect, useRef, useState } from "react"
import rowData from './data.json'
import type { Data } from "./type";

const Select = () => {
    const [data, setData] = useState<Data[]>(rowData);
    const [search, setSeach] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<Data | null>(null);
    const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
    const selectComponentRef = useRef<HTMLLIElement | null>(null);
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (!search) {
            setData(rowData);
            return;
        }
        setData((prev: Data[]) => {
            if (!prev) return data;
            return rowData?.filter((item: Data) => item.value.toLowerCase().startsWith(search.toLowerCase()))
        })
    }, [search])
    const handleSelectOption = (item: Data) => {
        setOpen(false);
        setSelected(item);
        setSeach(item.label);
    }

    const handlekeyMoves = (e: KeyboardEvent) => {
        if (!open) return;
        switch (e.code?.toLowerCase()) {
            case "arrowdown":
                setIndex(prev => {
                    return ++prev % data.length
                })
                break;
            case "arrowup":
                setIndex(prev => {
                    return prev == 0 ? data.length - 1 : --prev
                })
                break;
            case "enter":
                const item: Data = data[index]
                setSeach(item.label)
                setSelected(item)
                setOpen(false);
                break;
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", handlekeyMoves);
        window.addEventListener("mousedown", (e) => handleOutSideClick(e));
        optionsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
        return () => window.removeEventListener("keydown", handlekeyMoves)
    }, [index, open]);

    const handleOutSideClick = useCallback((e: any) => {
        if (!selectComponentRef.current?.contains(e.target as Node)) setOpen(false)
    }, [open])
    return (
        <div ref={() => { selectComponentRef }} className="relative w-64">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setOpen(true)
                    setSeach(e.target.value)
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search..."
                className="
            w-full px-3 py-2 
            border rounded-md 
            outline-none
            bg-white text-gray-900
            border-gray-300
            focus:ring-2 focus:ring-blue-500
        "
            />

            {open && <ul
                className="
            absolute mt-1 w-full
            max-h-48 overflow-y-auto
            rounded-md border
            bg-white shadow-md
            border-gray-200
        "
            >
                {data?.map((item: Data, idx: number) => (
                    <li
                        onClick={() => handleSelectOption(item)}
                        key={item.id}
                        ref={(el) => {
                            optionsRef.current[idx] = el
                        }}
                        role="option"
                        className={`
                    cursor-pointer px-3 py-2
                    text-sm text-gray-700
                    hover:bg-blue-50 hover:text-blue-600
                    ${index == idx && "bg-slate-500"}
                `}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>}
        </div>

    )
}

export default Select