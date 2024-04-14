import React from "react";
import Card from "./card";
import { sub } from "date-fns";
import "./cardList.css";
import { musicData } from "../../Data.jsx";

const CardList = ({ query, filter }) => {
  const currentDate = new Date();
  let filteredMusicData = [];

  if (filter == "upcoming") {
    filteredMusicData = musicData.filter((item) => {
      const releaseDate = new Date(item.releaseDate);
      return releaseDate > currentDate && item.albumCoverUrl !== "";
    });
  } else if (filter == "last30days") {
    filteredMusicData = musicData
      .filter((item) => {
        const releaseDate = new Date(item.releaseDate);
        const newDate = sub(new Date(currentDate), { months: 1 });
        return (
          releaseDate < currentDate &&
          releaseDate > newDate &&
          item.albumCoverUrl !== ""
        );
      })
      .reverse();
  }

  const searchFilteredMusicData = filteredMusicData.filter((item) => {
    return (
      item.artistName.toLowerCase().includes(query.toLowerCase()) ||
      item.albumTitle.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="cards">
      {searchFilteredMusicData.map((item, key) => {
        return <Card key={key} albumInfo={item} />;
      })}
    </div>
  );
};

export default CardList;
