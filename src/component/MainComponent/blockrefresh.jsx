// BlockPageRefresh.js
import { useEffect } from "react";

const BlockPageRefresh = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
        if ((e.key === "F5") || (e.ctrlKey && e.key === "r")) {
      e.preventDefault();
        }
      e.returnValue = "if u want to refresh"; // triggers the browser's confirmation popup
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default BlockPageRefresh;
