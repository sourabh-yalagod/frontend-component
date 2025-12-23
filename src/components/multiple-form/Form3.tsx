import useFormDataHook from "./useFormDataHook"

const Form3 = ({ setFormData, setIndex }: any) => {
    const { handleOnChange, handleForward, handleBackword } = useFormDataHook(setFormData, setIndex)
    return (
        <div>
            <input type="text" name="age" placeholder="age" onChange={handleOnChange} />
            <input type="text" name="gender" placeholder="gender" onChange={handleOnChange} />
            <button className="border p-1" onClick={handleForward}>Proceed</button>
            <button className="border p-1" onClick={handleBackword}>Back</button>
        </div>
    )
}

export default Form3;