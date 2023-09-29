"use client"
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "../components/ui/dialog"

export default function DialogueBox({tag}) {
  const {resolvedTheme} = useTheme();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const url =
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${tag}`;

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
      resp=await fetch(`api/wikiOne?text=${tag}`);
      const json = await resp.json();
      contents = json.contents;
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={()=>{
          // getContents();
        }}>{tag}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[80%] h-[80vh] overflow-y-auto overflow-x-hidden shadow-xl ${resolvedTheme==='dark'?'bg-[#2D4263] text-white':'bg-white text-black'}`}>
        <div className={`sticky -top-2 w-auto max-w-[30%] h-[30px] text-lg font-medium border border-amber-600 p-0.5 ${resolvedTheme==='dark'?'bg-white text-black':'bg-black text-white'}`}>{tag}</div>
      {contents?.map(content => (
        <div dangerouslySetInnerHTML={{ __html: content }}/>
      ))}
      </DialogContent>
    </Dialog>
  )
}



