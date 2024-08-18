import axios from "../api/axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext"; // Ensure you have this hook to get the auth context

const AUTH_URL = "/users/signup";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [cookies, setCookie] = useCookies(["authUser"]);

  const signup = async ({ username, email, password, passwordConfirm }) => {
    try {
      const {data} = await axios.post(
        AUTH_URL,
        JSON.stringify({ username, email, password, passwordConfirm }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.status == "success") {
        setAuthUser(data);

        setCookie("authUser", JSON.stringify(data), {
          path: "/",
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        }); 

      }
      return data;
    } catch (error) {
      return {status : "fail",message : "Some error occured"}
    }
  };

  return signup;
};

export default useSignup;
