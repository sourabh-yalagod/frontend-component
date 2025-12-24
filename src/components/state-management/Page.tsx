import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserApi } from "../../redux/userSlice";
import type { AppDispatch } from "../../redux/store";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(fetchUserApi());
    }, [])

    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default Page