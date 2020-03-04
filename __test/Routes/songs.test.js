const axios = require("axios");
const baseurl = "http://localhost:3001/songs";

describe("SongsApI", () => {
  let songs;
  test("Post a song", async () => {
    let song = await axios.post(baseurl, {
      title: "Middle"
    });
    expect(song.data.title).toBe("Middle");
  });

  test("Get all Songs", async () => {
    return axios.get(baseurl).then(response => {
      songs = response.data;
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  //   test("Find a song by id", async () => {
  //     return axios.get(baseurl + `/${songs[0]._id}`).then(response => {
  //       expect(response.data.title).toBe("Middle");
  //     });
  //   });
  //   test("Update a Songs", async () => {
  //     return axios
  //       .put(baseurl + `play/${songs[0]._id}`, {
  //         name: "Personal"
  //       })
  //       .then(response => {
  //         expect(response.data.name).toBe("Personal");
  //       });
  //   });
  //   test("remove all songs", async () => {
  //     return axios.delete(baseurl).then(response => {
  //       expect(response.status).toBe(200);
  //     });
  //   });
});
