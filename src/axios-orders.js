import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-project-1767f.firebaseio.com/"
});

export default instance;
