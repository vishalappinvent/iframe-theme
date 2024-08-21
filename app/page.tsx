"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [color,setColor]=useState('black');
  useEffect(()=>{
     window.addEventListener("message", (event)=>{
      console.log('event',event.data);
      setColor(event.data.color);
     });
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ color :color}}>Theme</div>
    </main>
  );
}
