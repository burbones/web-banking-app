import { useSelector } from "react-redux";

export default function Dashboard() {
    const token = useSelector((state) => state.auth.token);
    console.log(token);

    return <></>;
}