import axios from "axios";

const axiosCommon = axios.create({
    baseURL: "https://fullstacksalesoverviewapp.onrender.com/api"
})



const useCommon = () => {
    return axiosCommon
};

export default useCommon;
