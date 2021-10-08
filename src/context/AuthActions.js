export const LoginStart = (userCredencials) => ({
  type: "Login_START",
});

export const LoginSuccess = (user) => ({
  type: "Login_SUCCESS",
  paylode: user,
});

export const LoginFailure = (error) => ({
  type: "Login_FAILURE",
  paylode: error,
});
