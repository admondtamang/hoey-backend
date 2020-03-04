const axios = require("axios");

const baseurl = "http://localhost:3001/users";

describe("Users Route Test", () => {
  let token;
  test("sign up of new user", () => {
    return axios
      .post(baseurl + "/signup", {
        username: "admond",
        password: "tamang"
      })
      .then(response => {
        expect(response.data.status).toMatch("Signup success!");
      })
      .catch(err => {
        expect(err.response.status).toBe(500);
        expect(err.response.data.status).toMatch("Username already exists!");
      });
  });

  test("login of existing user", () => {
    return axios
      .post(baseurl + "/login", {
        username: "admond",
        password: "tamang"
      })
      .then(response => {
        token = response.data.token;
        expect(response.status).toBe(200);
        expect(response.data.status).toMatch("Login success!");
      })
      .catch(err => {
        expect(err.response.status).toBe(500);
      });
  });

  test("User should be able to view profile", () => {
    return axios
      .get(baseurl + "/me", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
});
