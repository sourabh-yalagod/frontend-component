import { useState } from "react";
import Toast from "./Toast";

const CustomToast = () => {
  const [index, setIndex] = useState(-1);
  const toastMessage = (id: number) => setIndex(id);
  return (
    <div>
      <button onClick={() => toastMessage(0)}>Success</button>
      <button onClick={() => toastMessage(1)}>Failed</button>
      <button onClick={() => toastMessage(2)}>Warning</button>
      <button onClick={() => toastMessage(3)}>Loading</button>
      <Toast id={index} />
    </div>
  );
};

export default CustomToast;
