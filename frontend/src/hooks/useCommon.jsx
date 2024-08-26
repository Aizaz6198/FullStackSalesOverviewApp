import axios from "axios";

const axiosCommon = axios.create({
    baseURL: "https://full-stack-sales-overview-app.vercel.app/api"
})



const useCommon = () => {
    return axiosCommon
};

export default useCommon;
