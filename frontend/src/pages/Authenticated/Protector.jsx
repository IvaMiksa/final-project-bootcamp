import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const Protector = () => {
    const location = useLocation();

    const isAuthenticated = useSelector((store) => store.user.accessToken);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace state={{from: location}}/>;
    }

    return <Outlet/>;

}

export default Protector;
