import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const userLS = localStorage.getItem("user");
  useEffect(() => {
    if (userLS) {
      setUser(JSON.parse(userLS));
    } else {
      setUser(null);
    }
  }, [userLS]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    history.push("/auth/login");
  }, []);

  return [user, logout];
};
