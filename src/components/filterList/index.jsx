import React, { useState } from "react";
import "./filterList.css";

const FilterList = ({ filter, sendFilterToParent }) => {
  return (
    <div className="filter-wrapper">
      <div
        className={`filter ${(filter === "upcoming") ? 'filter-active' : ''} poppins-regular cur-po`}
        onClick={() => {sendFilterToParent("upcoming")}}>
        Upcoming Releases
      </div>
      <div
        className={`filter ${(filter === "last30days") ? 'filter-active' : ''} poppins-regular cur-po`}
        onClick={() => {sendFilterToParent("last30days")}}>
        Last 30 days
      </div>
    </div>
  );
};

export default FilterList;
