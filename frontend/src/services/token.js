// import Cookies from "universal-cookie";
// const cookies = new Cookies();

class TokenService {
  getAdminLocal() {
    return localStorage.getItem("adminInfo");
  }

  setAdminLocal(token) {
    return localStorage.setItem("adminInfo", token);
  }

  removeAdminLocal() {
    return localStorage.removeItem("adminInfo");
  }
}

export default new TokenService();
