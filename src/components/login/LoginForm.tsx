import { useContext, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Formik, ErrorMessage } from "formik";

import { login } from "../../services/LoginService";
import { UserContext } from "../../contexts/user.context";

import classes from "./LoginForm.module.css";
import loginValidationSchema from "./login.validation";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>Login Page</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const isLoginSuccess = login(values.username, values.password);
          if (isLoginSuccess) {
            setUser?.({ isAuthenticated: true });
          } else {
            setError('Invalid credentials');
            setSubmitting(false);
          }
        }}
        enableReinitialize={true}
      >
        {({ errors, values, isSubmitting, handleBlur, handleChange, handleSubmit, handleReset }) => (
          <form onSubmit={handleSubmit} onReset={(evt) => { handleReset(evt); setError('') }} onChange={() => { setError('') }}>
            <TextField name="username" label="Username" fullWidth
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                'data-testid': 'usernameFld'
              }}
            />
            <ErrorMessage name="username" component="div" className={classes.error} />
            <div className={classes.fieldgap} />
            <TextField name="password" label="Password" type="password" fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                'data-testid': 'passwordFld'
              }}
            />
            <ErrorMessage name="password" component="div" className={classes.error} />
            <div className={classes.fieldgap} />
            <div className={classes.error}>{error}</div>
            <div className={classes.fieldgap} />
            <div className={classes.actions}>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || !!errors.username || !!errors.password}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" type="reset">
                Reset
              </Button>
            </div>
            <div className={classes.fieldgap} />
            <Typography variant="caption" display="block" gutterBottom>
              [DEMO_ONLY] Hint: username: foo, password: bar
            </Typography>
          </form>
        )}
      </Formik>
    </section>
  );
}
export default LoginForm;