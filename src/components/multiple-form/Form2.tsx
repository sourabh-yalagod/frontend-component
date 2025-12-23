
import useFormDataHook from "./useFormDataHook"

const Form2 = ({ setFormData, setIndex }: any) => {
    const { handleOnChange, handleBackword, handleForward } = useFormDataHook(setFormData, setIndex)
    return (
        <div>
            <input type="text" name="email" placeholder="email" onChange={handleOnChange} />
            <input type="text" name="phoneNumber" placeholder="phoneNumber" onChange={handleOnChange} />
            <button className="border p-1" onClick={handleForward}>Proceed</button>
            <button className="border p-1" onClick={handleBackword}>Back</button>
        </div>
    )
}

export default Form2