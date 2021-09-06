import LoginForm from "../../components/login/LoginForm";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={classes.wrapper}>
      <LoginForm />
    </main>
  );
}

export default LoginPage;