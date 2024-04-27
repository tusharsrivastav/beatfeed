import React from "react";
import "./card.css";
import GenreItem from "./genreItem";

const Card = ({ albumInfo }) => {
  const releaseDate = albumInfo.releaseDate;
  const artistName = albumInfo.artistName;
  const albumTitle = albumInfo.albumTitle;
  const albumCoverUrl = albumInfo.albumCoverUrl;
  const genre = albumInfo.genre;
  const label = albumInfo.label;

  // Extract month and date as integers
  const monthString = releaseDate.match(/[a-zA-Z]+/)[0];
  const dateInt = parseInt(releaseDate.match(/\d+/)[0], 10);
  const yearInt = parseInt(releaseDate.match(/\b\d{4}\b/)[0], 10);

  // Map month string to month number (assuming English month names)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthInt = months.findIndex(
    (month) => month.toLowerCase() === monthString.toLowerCase()
  );

  // Create a new Date object using the extracted month and date
  const releaseDateObj = new Date();
  releaseDateObj.setFullYear(yearInt); // Set year
  releaseDateObj.setMonth(monthInt); // Set month (0-indexed)
  releaseDateObj.setDate(dateInt); // Set date

  const year = releaseDateObj.getFullYear();
  const month = releaseDateObj.toLocaleString("default", { month: "long" });
  const date = releaseDateObj.getDate();

  return (
    <div className="card-wrapper">
      <img
        src={
          albumCoverUrl === ""
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRf0hb13fLusfo_P50OtW_fQX8pkSsMwOt9GWvzhTDVw&s"
            : albumCoverUrl
        }
      />

      <div className="album-info-wrap">
        <div className="date poppins-regular">{`${month} ${date}, ${year}`}</div>
        <div className="title poppins-medium">{albumTitle}</div>
        <div className="artist poppins-light">{artistName}</div>
      </div>

      <div className="genre-list">
        {genre &&
          genre.map((item, key) => {
            return <GenreItem genre={item} key={key} />;
          })}
      </div>
    </div>
  );
};

export default Card;
