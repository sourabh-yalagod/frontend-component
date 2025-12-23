import { useMemo, useState } from "react"
import type { FormData } from "./type"
import Form1 from "./Form1"
import Form2 from "./Form2"
import Form3 from "./Form3"

const MultiForm = () => {
    const [index, setIndex] = useState(0)
    const [formData, setFormData] = useState<FormData>(
        { username: '', age: "", email: "", gender: "", password: "", phoneNumber: "" }
    )
    const components = [Form1, Form2, Form3];
    const currentIndex = useMemo(() => {
        if (!!formData.email && !!formData.phoneNumber) return 2;
        if (!!formData.username && !!formData.password) return 1;
        else return 0;
    }, [index])
    console.log(index, currentIndex);
    const Component = components[currentIndex];
    return <div>
        <Component
            setIndex={setIndex}
            setFormData={setFormData}
        />
    </div>
}

export default MultiForm