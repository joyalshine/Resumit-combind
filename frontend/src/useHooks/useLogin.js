import axios from "../api/axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext"; // Ensure you have this hook to get the auth context

const AUTH_URL = "/users/login";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [cookies, setCookie] = useCookies(["authUser"]);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        AUTH_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("login successful:", response.data);
        setAuthUser(response.data);

        // Set the auth data in cookies
        setCookie("authUser", JSON.stringify(response.data), {
          path: "/",
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        }); // Expires in 7 days
        console.log(response.data);
        return response.data;
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("login failed:", error.response.data);

        return error.response.data;
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return login;
};

export default useLogin;
