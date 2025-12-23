import useFormDataHook from "./useFormDataHook"

const Form1 = ({ setFormData, setIndex }: any) => {
    const { handleOnChange, handleBackword, handleForward } = useFormDataHook(setFormData, setIndex)
    return (
        <div>
            <input type="text" name="username" placeholder="username" onChange={handleOnChange} />
            <input type="text" name="password" placeholder="password" onChange={handleOnChange} />
            <button className="border p-1" onClick={handleForward}>Proceed</button>
            <button className="border p-1" onClick={handleBackword}>Back</button>
        </div>
    )
}

export default Form1