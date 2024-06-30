import axios from "../api/axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext"; // Ensure you have this hook to get the auth context

const AUTH_URL = "/users/signup";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [cookies, setCookie] = useCookies(["authUser"]);

  const signup = async ({ username, email, password, passwordConfirm }) => {
    try {
      const response = await axios.post(
        AUTH_URL,
        JSON.stringify({ username, email, password, passwordConfirm }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        setAuthUser(response.data);

        // Set the auth data in cookies
        setCookie("authUser", JSON.stringify(response.data), {
          path: "/",
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        }); // Expires in 7 days

        return response.data;
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup failed:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return signup;
};

export default useSignup;
