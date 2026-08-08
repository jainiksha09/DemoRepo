"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/message");
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage("Connection failed");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Frontend Connected</h1>
      <p>{message}</p>
    </div>
  );
}