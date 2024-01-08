// import Cookies from "universal-cookie";
// const cookies = new Cookies();

class TokenService {
  getLocal(clientInfo) {
    return localStorage.getItem(clientInfo);
  }

  setLocal(clientInfo, token) {
    return localStorage.setItem(clientInfo, token);
  }

  removeLocal(clientInfo) {
    return localStorage.removeItem(clientInfo);
  }
}

export default new TokenService();
