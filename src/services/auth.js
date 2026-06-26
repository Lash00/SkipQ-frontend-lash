// // import axios from "axios";
// // const API_BASE_URL = import.meta.env.VITE_BASE_URL;
// // export const loginRequest = async (email, password) => {
// //   try {
// //     const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response ? error.response.data : new Error("Network error");
// //   }
// // };

// // export const signupRequest = async (formData) => {
// //   try {
// //     const response = await axios.post(`${API_BASE_URL}/api/organizations/signup`, formData);
// //     return response.data;
// //   } catch (error) {
// //     throw error.response ? error.response.data : new Error("Network error");
// //   }
// // };
// // export const getMeRequest = async () => {
// //   try {
// //     const token = localStorage.getItem("token");
// //     const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response ? error.response.data : new Error("Network error");
// //   }
// // };

// // export const logout = () => {
// //   localStorage.removeItem("token");
// // };

// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// // LOGIN
// // export const loginRequest = async ({ email, password }) => {
// //   try {
// //     const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
// //       email,
// //       password,
// //     });

// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || new Error("Invalid email or password");
// //   }
// // };
// import { accounts, roles } from "../../data/mockData"; // Import the mock accounts

// export const loginRequest = async ({ email, password }) => {
//   const account = accounts.find(
//     (acc) => acc.account_email === email && acc.password === password,
//   );

//   if (!account) {
//     throw new Error("Invalid email or password");
//   }

//   return {
//     token: account.account_email, // Return the token from the mock account
//     user: {
//       id: account.user_id,
//       role:
//         roles.find((r) => r.role_id === account.role_id)?.role_name ||
//         account.role, // Convert role to a more readable format
//       sector: account.sector,
//       email: account.account_email,
//     },
//   };
// };
// // SIGNUP
// export const signupRequest = async (formData) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/api/organizations/signup`,
//       formData,
//     );

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || new Error("Network error");
//   }
// };

// // GET CURRENT USER
// export const getMeRequest = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     // const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // });
//     const response = accounts.find((acc) => acc.account_email === token);

//     return response;
//   } catch (error) {
//     throw error.response?.data || new Error("Network error");
//   }
// };

// // LOGOUT
// export const logout = () => {
//   localStorage.removeItem("token");
// };
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// LOGIN
// import { accounts, roles } from "../../data/mockData"; // Import the mock accounts
import { accounts, roles } from "../../data/mockData"; // عدّل المسار لو شكل الفولدرات مختلف عندك

export const loginRequest = async ({ email, password }) => {
  const account = accounts.find(
    (acc) => acc.account_email === email && acc.password === password,
  );

  if (!account) {
    throw new Error("Invalid email or password");
  }

  return {
    token: account.account_email, // Return the token from the mock account
    user: {
      id: account.user_id,
      role:
        roles.find((r) => r.role_id === account.role_id)?.role_name ||
        account.role, // Convert role to a more readable format
      sector: account.sector,
      branch_id: account.branch_id, // <-- لازم! بدونها داش بورد مدير الفرع مش هيعرف يفلتر على أنهي فرع
      email: account.account_email,
    },
  };
};

// SIGNUP
export const signupRequest = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/organizations/signup`,
      formData,
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Network error");
  }
};

// GET CURRENT USER
export const getMeRequest = async () => {
  try {
    const token = localStorage.getItem("token");

    // const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = accounts.find((acc) => acc.account_email === token);

    return response;
  } catch (error) {
    throw error.response?.data || new Error("Network error");
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};
