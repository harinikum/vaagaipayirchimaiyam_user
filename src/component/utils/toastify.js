import { toast } from "react-toastify";

export const successToaster = ({ msg = "Default Toast", ...rest } = {}) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...rest,
  });
};

export const errorToaster = ({ msg = "Default Toast", ...rest } = {}) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...rest,
  });
};
