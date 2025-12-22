import { useEffect, useRef, useState } from 'react'
import type { Item } from './type';

const VertualList = () => {
    const list: any[] = Array.from({ length: 200 }, (_, index) => { return { id: index, title: `Title - ${index}` } });
    const [data, setData] = useState<Item[]>([]);
    const lastElement = useRef<HTMLDivElement | null>(null);
    const observe = useRef<IntersectionObserver | null>(null);
    const windowSize = 10;
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(windowSize)
    useEffect(() => {
        setData((prev) => {
            const newList = list.slice(start, end + 5);
            return newList.length > 0 ? newList : prev
        })
    }, [start, end])
    useEffect(() => {
        if (!lastElement.current) return;
        if (observe.current) observe.current.disconnect();

        observe.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStart((prev) => prev + windowSize);
                    setEnd((prev) => prev + windowSize);
                }
            }, { threshold: 1 }
        );

        observe.current.observe(lastElement.current);

        return () => observe.current?.disconnect();
    }, [data]);

    return (
        <div className='overflow-scroll h-[300px] space-y-2 border p-1'>
            {data.map((item, index) => {
                let isLast = data.length - 1 == index;
                return <div
                    className='border'
                    ref={isLast ? lastElement : null}
                    key={item.id}>{item.title}</div>
            })}
        </div>
    )
}

export default VertualList