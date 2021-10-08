import axios from "axios";

const LoginCall = async (userCredencial, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("api/auth/login", userCredencial);
    dispatch({ type: "LOGIN_SUCCESS", paylode: res.data });
    console.log(res.data);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", paylode: error });
  }
};

export default LoginCall;
