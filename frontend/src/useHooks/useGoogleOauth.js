import axios from "../api/axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext"; // Ensure you have this hook to get the auth context

const AUTH_URL = "/users/google-login";

const useGoogleOauth = () => {
  const { setAuthUser } = useAuthContext();
  const [cookies, setCookie] = useCookies(["authUser"]);

  const googleSignIn = async ({ credential_jwt }) => {
    try {
      const {data : response} = await axios.post(
        AUTH_URL,
        JSON.stringify({ credential_jwt }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status == "success") {
        console.log("Signup successful:", response);
        setAuthUser(response);

        setCookie("authUser", JSON.stringify(response), {
          path: "/",
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        });

      } 
      return response;
    } catch (error) {
      if(error.response && error.response.data) return error.response.data
      return {status : "fail", message : "Some error occured"}
    }
  };

  return googleSignIn;
};

export default useGoogleOauth;