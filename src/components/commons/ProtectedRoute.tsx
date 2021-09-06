import { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

const ProtectedRoute: FC<RouteProps> = ({ ...routeProps }) => {
    const loginTry = routeProps.path === '/login';
    const { user } = useContext(UserContext);
    const isLoggedIn = !!user && user.isAuthenticated;

    if (loginTry) {
        return isLoggedIn ? <Redirect to="/home" /> : <Route {...routeProps} />;
    } else {
        return isLoggedIn ? <Route {...routeProps} /> : <Redirect to="/login" />;
    }

};

export default ProtectedRoute;