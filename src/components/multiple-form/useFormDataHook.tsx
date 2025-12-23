const useFormDataHook = (setFormData: any, setIndex: any) => {
  const handleOnChange = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }
  const handleForward = () => {
    setIndex((prev: number) => prev + 1)
  }
  const handleBackword = () => {
    setIndex((prev: number) => prev - 1)
  }
  return { handleOnChange, handleForward, handleBackword }
}

export default useFormDataHook