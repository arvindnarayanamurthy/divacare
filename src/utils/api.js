import axios from "axios";
const DocApi = axios.create({
    baseURL: "https://wd8zuu3ctg.execute-api.us-east-2.amazonaws.com/test",
    withCredentials: false,
    crossdomain: true,
});
export default DocApi;
