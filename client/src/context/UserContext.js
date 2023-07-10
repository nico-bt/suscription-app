import { createContext, useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const token = localStorage.getItem("token");

  if (token) {
    // Set the token in the header for all the axios requests
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
        "https://bored-pear-beret.cyclic.app/api/auth/me"
      );
      // console.log(response);
      if (response && response._id) {
        setUser({
          data: {
            id: response._id,
            email: response.email,
            customerStripeId: response.customerStripeId,
          },
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      setUser({
        data: null,
        loading: false,
        error: err.response?.data.msg || err.message,
      });
      // console.log(err)
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({ data: null, loading: false, error: null });
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
