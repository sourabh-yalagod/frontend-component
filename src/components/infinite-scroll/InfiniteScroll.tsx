import { useEffect, useRef, useState } from "react";
import type { Data } from "../file-uploader/type";
import rowData from "./data.json";

const InfiniteScroll = () => {
    const payload: Data[] = rowData;
    const limit = 5;

    const [data, setData] = useState<Data[]>([]);
    const [page, setPage] = useState<number>(1);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setData(payload.slice(0, limit));
    }, []);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setData((prev) => {
                        const newData = payload.slice(page * limit, (page + 1) * limit);
                        return [...prev, ...newData];
                    });
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0 }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }
    }, [page, observer.current?.unobserve]);

    return (
        <div className="flex flex-col gap-6 p-4">
            {data.map((item: Data, index: number) => {
                const isLast = index === data.length - 1;

                return (
                    <div
                        ref={isLast ? lastElementRef : null}
                        key={item.id}
                        className="
              w-full max-w-md
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              shadow-md hover:shadow-xl 
              transition-all duration-300
              rounded-2xl p-5
              h-[300px]
            "
                    >
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default InfiniteScroll;
