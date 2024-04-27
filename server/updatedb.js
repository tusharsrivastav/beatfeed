import mongoose from "mongoose";
import connectDB from "./mongodb/connect.js";
import * as dotenv from "dotenv";

import AlbumList from "./mongodb/models/Albums.js";

dotenv.config();

connectDB(process.env.MONGODB_URL);

const compareAndUpdateData = (musicData) => {
  try {
    // RETRIEVING DATA FROM THE DATABASE
    AlbumList.find({})
      .then((albumList) => {
        console.log(`Documents in database: ${albumList.length}`);
        // If no data exists in database, add the current data
        if (albumList.length == 0) {
          console.log(`New data is created:\n${JSON.stringify(musicData)}`);
          const newAlbumList = new AlbumList(musicData);
          return newAlbumList.save().catch((err) => console.log(err));
        } else {
          console.log("Data already exists");
        }

        // If data already exists in DB, compare data stored in db and scraped data
        const { Amount, MusicReleaseData } = musicData;

        const dbId = albumList[0]._id;
        const dbAmount = albumList[0].Amount;
        const dbMusicReleaseData = albumList[0].MusicReleaseData;

        let isDifferent = false;

        dbMusicReleaseData.forEach((dbAlbum, i) => {
          const newAlbum = MusicReleaseData[i];

          // Comparing top-level properties
          if (
            dbAlbum.releaseDate !== newAlbum.releaseDate ||
            dbAlbum.albumCoverUrl !== newAlbum.albumCoverUrl
          ) {
            isDifferent = true;
          }
          // Comparing nested arrays (genre and label)
          const dbGenres = new Set(dbAlbum.genre);
          const newGenres = new Set(newAlbum.genre);
          if (!setsAreEqual(dbGenres, newGenres)) {
            isDifferent = true;
          }

          const dbLabels = new Set(dbAlbum.label);
          const newLabels = new Set(newAlbum.label);
          if (!setsAreEqual(dbLabels, newLabels)) {
            isDifferent = true;
          }
        });

        if (isDifferent) {
          console.log("There are differences in music data, updating database...");
        } else {
          console.log("Music data is the same");
        }

      })
      .then(() => mongoose.disconnect());
  } catch (error) {
    console.error(error);
  }
};

// Function to check if two sets are equal
function setsAreEqual(set1, set2) {
  if (set1.size !== set2.size) {
    return false;
  }
  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

export default compareAndUpdateData;
