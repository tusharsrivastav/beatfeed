import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  releaseDate: { type: String, required: true },
  artistName: { type: String, required: true },
  albumTitle: { type: String, required: true },
  albumCoverUrl: { type: String },
  genre: { type: [String] },
  label: { type: [String] },
});

const AlbumListSchema = new Schema({
  Amount: {
    type: Number,
  },
  MusicReleaseData: [AlbumSchema],
});

const albumsModel = mongoose.model("AlbumList", AlbumListSchema);

export default albumsModel;
