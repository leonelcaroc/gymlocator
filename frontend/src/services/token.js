import Cookies from "universal-cookie";

const cookies = new Cookies();
// class TokenService {
//   getJwt() {
//     return cookies.get("jwt");
//   }

//   setJwt(token) {
//     return cookies.set("jwt", token);
//   }

//   removeJwt() {
//     return cookies.remove("jwt");
//   }a
// }

class TokenService {
  getLocal(clientInfo) {
    return JSON.parse(localStorage.getItem(clientInfo)).token;
  }

  setLocal(clientInfo, token) {
    return localStorage.setItem(clientInfo, token);
  }

  removeLocal(clientInfo) {
    return localStorage.removeItem(clientInfo);
  }
}

export default new TokenService();
