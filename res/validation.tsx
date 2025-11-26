export const validateLogin = (email, password) => {
  let errors = {};

  const emailRegex = /\S+@\S+\.\S+/;
   const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must contain 8 characters, uppercase, lowercase, number, special character";
  }

  return errors;
};
