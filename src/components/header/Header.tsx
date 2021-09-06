import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

import { UserContext } from "../../contexts/user.context";
import classes from "./Header.module.css";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const isLoggedIn = user && user.isAuthenticated;

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Contacts
          </Typography>
          {isLoggedIn ? <Button onClick={() => { setUser?.({ isAuthenticated: false }) }} color="inherit">Logout</Button> : <Link to="/login"><Button color="inherit">Login</Button></Link>}
        </Toolbar>
      </AppBar>
    </header>
  )
};

export default Header;