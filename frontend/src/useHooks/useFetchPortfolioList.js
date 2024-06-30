import { useAuthContext } from "@/context/AuthContext";
import axios from "../api/axios";

const useFetchPortfolioList = () => {
    const { authUser } = useAuthContext()
    const { data,token } = authUser
    const _id = data.user._id

    const fetchPortfolioList = async () => {
        try {
            const config = {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            };

            const response = await axios.post("/portfolio/fetch-portfolio-list", JSON.stringify({ userId : _id }), config);
            return response.data;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return fetchPortfolioList;
};

export default useFetchPortfolioList;