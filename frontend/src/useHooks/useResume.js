import axios from "@/api/axios";
import { useAuthContext } from "@/context/AuthContext";

const useGetResume = () => {
  const { authUser } = useAuthContext();
  const { data, token } = authUser;
  const _id = data.user._id;

  const fetchResumebyResumeId = async (resumeId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/resume/${resumeId}/resumeId`, config);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
    console.log(_id, resumeId);
  };

  const updateResume = async (resumeId, data) => {
    try {
      const response = await axios.patch(`resume/${resumeId}/update`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createResume = async ({ title }) => {
    try {
      const data = {
        title: title,
        userId: _id,
      };

      const response = await axios.post(`resume/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchResumebyResumeId, updateResume, createResume };
};

export default useGetResume;
