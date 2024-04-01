import axios from "axios";
const AUTH_API_URL = "http://localhost:3000";
const service = axios.create({
  baseURL: AUTH_API_URL,
});
export const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  service.defaults.headers.common["authorization"] = `Bearer ${token}`;
  const response = await service.get("/user");
  req.userid = response.data.id;
  next();
};
