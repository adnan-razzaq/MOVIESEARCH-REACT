import React, { useState } from "react";

export default function Search({ search }) {
  const [searchValue, setsearchValue] = useState("");

  /* Handlesubmit */
  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchValue);
    setsearchValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setsearchValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
