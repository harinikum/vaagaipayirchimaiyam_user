export const getLocalStorage = () => {
  let userID = localStorage.getItem("userMail");
  return {
    userId: userID,
  };
};

