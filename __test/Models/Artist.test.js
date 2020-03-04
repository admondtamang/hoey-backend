const Artist = require("../../Models/Artist");
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

describe("Artist schema test", () => {
  it("should be able to add new Artist", async () => {
    let artist = await Artist.create({
      artistName: "justin"
    });
    expect(artist.artistName).toMatch("justin");
  });

  it("Should be able to update Artist", async () => {
    let artist = await Artist.create({ artistName: "Tulsi kumar" });
    artist.artistName = "Atif Aslam";
    let newUser = await artist.save();
    expect(newUser.artistName).toMatch("Atif Aslam");
  });

  it("Should be able to delete Artist", async () => {
    let artist = await Artist.findOneAndDelete({
      artistName: "Atif Aslam"
    });
    expect(artist.artistName).toBe("Atif Aslam");
  });
});
