import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    // const {user, setUser} = useContext(UserContext);
    // if (!user) {
    //     navigate("/signIn");
    // }
    return (

        props.children


    );
}
export default ProtectedRoute;
