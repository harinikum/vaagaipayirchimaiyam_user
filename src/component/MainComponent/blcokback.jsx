import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlockBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable back button completely
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  return null;
};

export default BlockBackNavigation;
