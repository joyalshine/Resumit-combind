import { useAuthContext } from "@/context/AuthContext";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const useFetchResume = () => {
  const { authUser } = useAuthContext();
  const { data, token } = authUser;
  const _id = data.user._id;

  const fetchResumeList = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/resume/${_id}/userId`, config);

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
    console.log(_id, resumeId);
  };

  return fetchResumeList;
};

export default useFetchResume;
