import { useState } from "react";
import data from "./data.json";
import type { Item } from "./type";
const Faq = () => {
  const [selectId, setSelectId] = useState<number | null>(null);
  return (
    <ul>
      {data.map((item: Item) => {
        return <li key={item.id} className="pl-3">
          <div className="flex gap-3">
            <div onClick={() => setSelectId((prev) => prev == item.id ? null : item.id)}>
              {item.question}
            </div>
            <div className="cursor-pointer" onClick={() => {
              setSelectId((prev) => prev == item.id ? null : item.id)
            }}>{selectId==item.id ? "-" : "+"}</div>
          </div>
          {selectId == item.id && item.answer}
        </li>

      })}
    </ul>
  );
};

export default Faq;
