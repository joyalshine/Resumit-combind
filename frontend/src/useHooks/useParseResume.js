import { useAuthContext } from "@/context/AuthContext";
import axios from "../api/axios";

const useResumeParser = () => {
    const {authUser} = useAuthContext()
    const {token } = authUser

    const parseResume = async ({ formData, setUploadProgess }) => {
        try {
            const config = {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization" : `Bearer ${token}`
                },
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgess(percentCompleted);
                }
            };
            const response = await axios.post("/portfolio/resume-parser", formData, config);
            return response.data;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return parseResume;
};

export default useResumeParser;