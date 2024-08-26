import axios from "axios";

const axiosCommon = axios.create({
    baseURL: "http://localhost:5000/api"
})



const useCommon = () => {
    return axiosCommon
};

export default useCommon;
