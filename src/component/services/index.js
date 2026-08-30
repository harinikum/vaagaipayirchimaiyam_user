import { axiosInstance } from '../Api/instance'
// import { getLocalStorage } from "./localstorage";

const URL = "http://localhsot/Nursing_Check/controllers/api/User/";

// Signup Page

export const FooterApi = (data) => {
  return axiosInstance.post(`${URL}get/U_ViewStaticInfo.php`, data);
};

