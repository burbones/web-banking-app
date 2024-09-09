import { useSelector } from "react-redux";
import Sidebar from "./low_level/Sidebar";

export default function Dashboard() {
    const token = useSelector((state) => state.auth.token);
    console.log(token);

    return (
        <>
            <Sidebar />
        </>
    );
}