import React, { useEffect, useState } from "react";
import Card from "./card/index.jsx";
import { sub } from "date-fns";
import "./cardList.css";
import axios from "axios";
// import { musicData } from "../../Data.jsx";

const CardList = ({ query, filter }) => {
  const currentDate = new Date();
  let filteredMusicData = [];
  let [musicData, setMusicData] = useState({ MusicReleaseData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/all-releases/2024")
      .then((response) => {
        console.log('Content-Type:', response.headers['content-type']);
        setMusicData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(musicData.MusicReleaseData);

  if (
    !musicData ||
    !musicData.MusicReleaseData ||
    musicData.MusicReleaseData.length === 0
  ) {
    return <div>No music data available.</div>;
  }


  if (filter == "upcoming") {
    filteredMusicData = musicData.MusicReleaseData.filter((item) => {
      const releaseDate = new Date(item.releaseDate);
      return releaseDate > currentDate && item.albumCoverUrl !== "";
    });
  } else if (filter == "last30days") {
    filteredMusicData = musicData.MusicReleaseData
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
