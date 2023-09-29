"use client"
import React, { useState, useEffect } from "react";

export default function WikipediaSearch() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const url =
    "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Berlin";

  const extractAPIContents = json => {
    const { pages } = json.query;
    return Object.keys(pages).map(id => pages[id].extract);
  };

  const getContents = async () => {
    let resp;
    let contents = [];
    setLoading(true);
    try {
      resp = await fetch(url);
      const json = await resp.json();
      contents = extractAPIContents(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    setContents(contents);
  };

  useEffect(() => {
    getContents();
  }, []);

  if (loading) return "Loading ...";
  if (error) return "An error occurred";
  return (
    <div>
      <h1>Article</h1>
      {contents.map(content => (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ))}
    </div>
  );
};
