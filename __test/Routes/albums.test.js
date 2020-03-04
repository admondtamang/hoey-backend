const axios = require("axios");
const baseurl = "http://localhost:3001/admin/albums";

describe("AlbumsApi", () => {
  let ablums;
  test("Post an album", async () => {
    let album = await axios.post(baseurl, {
      albumTitle: "Highway"
    });
    expect(album.data.albumTitle).toBe("Highway");
  });

  test("Get all albums", async () => {
    return axios.get(baseurl).then(response => {
      ablums = response.data;
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  // test("Find a album by id", async () => {
  //   return axios.get(baseurl + `play/${ablums[0]._id}`).then(response => {
  //     expect(response.data.title).toBe("Middle");
  //   });
  // });
  // test("Update a ablums", async () => {
  //   return axios
  //     .put(baseurl + `play/${ablums[0]._id}`, {
  //       albumTitle: "Personal"
  //     })
  //     .then(response => {
  //       expect(response.data.albumTitle).toBe("Personal");
  //     });
  // });
  // test("remove all ablums", async () => {
  //   return axios.delete(baseurl).then(response => {
  //     expect(response.status).toBe(405);
  //   });
  // });
});
