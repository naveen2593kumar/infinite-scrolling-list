import * as Yup from 'yup';

/**
 * Validation schema for user login form
 */
const schema = Yup.object().shape({
  username: Yup.string()
    .required('Invalid Username')
    .min(2, 'Username cannot be less than 2 chars')
    .max(20, 'Username cannot be more than 20 chars'), // [TODO] Add more suitable validations

  password: Yup.string()
    .required('Invalid Password')
    .min(2, 'Password cannot be less than 2 chars')
    .max(20, 'Password cannot be more than 20 chars'),// [TODO] Add more suitable validations
});

export default schema;