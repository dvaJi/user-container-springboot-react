import axios from "../utils/axios";

export const useAuth = () => {
  const register = async (email, password, phones = []) => {
    try {
      const response = await axios.post("/auth/signup", {
        email,
        password,
        phones,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, errorMsg: error.response.data.mensaje };
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, errorMsg: error.response.data.mensaje };
    }
  };

  const currentUser = () => {
    const userLS = localStorage.getItem("user");
    if (userLS) {
      return JSON.parse(userLS);
    } else {
      return null;
    }
  };

  return { register, login, currentUser };
};
