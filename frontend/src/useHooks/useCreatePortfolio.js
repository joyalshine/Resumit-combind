import { useAuthContext } from "@/context/AuthContext";
import axios from "../api/axios";

const useCreatePortfolio = () => {
    const {authUser} = useAuthContext()
    const {data,token } = authUser
    const _id = data.user._id

    const createPortfolio = async (portfolioDetails) => {
        try {
            const config = {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
              };
              portfolioDetails["userId"] = _id

            const response = await axios.post("/portfolio/create-new", JSON.stringify(portfolioDetails), config);
            return response.data;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return createPortfolio;
};

export default useCreatePortfolio;