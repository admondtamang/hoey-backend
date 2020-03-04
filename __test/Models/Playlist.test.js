const Playlist = require("../../Models/Playlist");
const mongoose = require("mongoose");

const DBTest = "mongodb://127.0.0.1:27017/testdbHoey";
beforeAll(async () => {
  await mongoose.connect(DBTest, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("Playlist schema test", () => {
  it("should be able to add new Playlist", async () => {
    let playlist = await Playlist.create({
      playlistName: "latestMusic"
    });
    expect(playlist.playlistName).toMatch("latestMusic");
  });

  it("Should be able to update Playlist", async () => {
    let playlist = await Playlist.create({ playlistName: "Latest Music" });
    playlist.playlistName = "Pop Music";
    let newUser = await playlist.save();
    expect(playlist.playlistName).toMatch("Pop Music");
  });

  it("Should be able to delete Playlist", async () => {
    let playlist = await Playlist.findOneAndDelete({
      playlistName: "latestMusic"
    });
    expect(playlist.playlistName).toBe("latestMusic");
  });
});
