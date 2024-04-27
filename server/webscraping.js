import cheerio from "cheerio";
import axios from "axios";

const webscraping = async (year) => {
  let musicData = {};
  try {
    const url = `https://en.wikipedia.org/wiki/List_of_${year}_albums`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const rows = [];
    let releaseDateValue = "";

    const table = $("table.wikitable tr:nth-child(5)");

    for (const row of table) {
      // Extract data from each column of the row
      const columns = $(row).find("td");

      // extraction of data from columns
      const artistName = $(columns[0]).text().trim();
      const albumTitle = $(columns[1]).text().trim();
      const genreText = $(columns[2]).text().trim();
      const genres = genreText
        .split(",")
        .map((genre) => genre.trim().replace(/\s+/g, "-"));
      const labelText = $(columns[3]).text().trim();
      const labels = labelText
        .split(",")
        .map((label) => label.trim().replace(/\s+/g, "-"));

      //   Release Date
      const releaseDateCell = $(row).find("th");
      let releaseDateText = releaseDateCell.text().trim();

      // Check if the row has release date cell
      if ($(row).find("th").length > 0) {
        releaseDateValue = releaseDateText; // Store the release date value
      } else {
        // Use the stored release date value for rows that don't have the release date cell
        releaseDateText = releaseDateValue;
      }

      //   Getting the link of album page
      const albumLink = $(columns[1]).find("a").attr("href");
      const albumCoverUrl = await getImageLink(albumLink);
      //   console.log(albumCoverUrl);

      const albumInfo = {
        releaseDate: releaseDateText + ", " + year,
        artistName,
        albumTitle,
        albumCoverUrl,
        genre: genres[0] === "" ? [] : genres,
        label: labels[0] === "" ? [] : labels,
      };

      rows.push(albumInfo);
    }

    musicData = {
      Amount: rows.length,
      MusicReleaseData: rows,
    };
    // console.log(musicData.MusicReleaseData);
  } catch (error) {
    console.log(error);
  }

  return musicData;
};

const getImageLink = async (albumLink) => {
  let albumCoverUrl = "";

  if (albumLink && albumLink.startsWith("/wiki/")) {
    const albumPageLink = "https://en.wikipedia.org" + albumLink;

    // If albumLink is valid, get the album cover image
    try {
      const { data } = await axios.get(albumPageLink);
      const $ = cheerio.load(data);
      albumCoverUrl = $(".infobox img").attr("src") || "";
    } catch (error) {
      console.error("Error fetching album cover image:", error.message);
    }
  }

  return albumCoverUrl;
};

export default webscraping;
