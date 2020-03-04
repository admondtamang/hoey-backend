const Song = require("../../Models/Songs");
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

describe("Song schema test", () => {
  it("should be able to add new Song", async () => {
    let song = await Song.create({
      title: "aladin",
      link: "1.mp3",
      artistName: "becky g"
    });
    expect(song.title).toMatch("aladin");
  });
});
