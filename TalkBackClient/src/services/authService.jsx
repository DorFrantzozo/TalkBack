import axios from "axios";
const AUTH_API_URL = "http://localhost:3000";
const service = axios.create({
  baseURL: AUTH_API_URL,
});

const refreshTokenValidation = async (token) => {
  try {
    const response = await service.put("/token", { token });
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      await assignTokens(accessToken, refreshToken);
      return true;
    } else {
      await deassignTokens();
      return false;
    }
  } catch (error) {
    console.log(error.response);
    // if (error.response.status === 400) {
    //   let { errors } = error.response.data;
    //   return errors;
    // }
    // console.error("Error signning in ", error);

    throw error;
  }
};

const deassignTokens = async () => {
  delete service.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
};

const assignTokens = async (accessToken, refreshToken) => {
  service.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  localStorage.setItem("token", JSON.stringify(refreshToken));
};
export const loginTokenValidation = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return await refreshTokenValidation(token);
  } else {
    return false;
  }
};
export const logoutTokenValidation = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return await deleteLogout(token);
  } else {
    return false;
  }
};

export const postSignin = async (email, password) => {
  try {
    const response = await service.post(
      "/signin",
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const { accessToken, refreshToken } = response.data;
    await assignTokens(accessToken, refreshToken);
  } catch (error) {
    if (error.response.status === 400) {
      let { errors } = error.response.data;
      return errors;
    }

    console.error("Error signning in ", error);
    throw error;
  }
};

export const postSignup = async (email, password, firstName, lastName) => {
  try {
    const response = await service.post(
      "/signup",
      { email, password, firstName, lastName },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, refreshToken } = response.data;
    await assignTokens(accessToken, refreshToken);
  } catch (error) {
    if (error.response.status === 400) {
      let { errors } = error.response.data;
      return errors;
    }

    console.error("Error signning in ", error);

    throw error;
  }
};

export const deleteLogout = async (token) => {
  try {
    const response = await service.delete("/logout", { token });

    if (response.status === 200) {
      await deassignTokens();
      console.log("logged out successfully");
      return true;
    } else {
      console.error(
        "Logout failed with status:",
        response.status,
        response.data
      );
    }
  } catch (error) {
    console.error("Error logging out  ", error);
    throw error;
  }
};
