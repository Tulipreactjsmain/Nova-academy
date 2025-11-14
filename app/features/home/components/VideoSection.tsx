"use client";

import React from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/ds1NNAagjZo?autoplay=1&mute=1&loop=1&playlist=ds1NNAagjZo&controls=0&showinfo=0&rel=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
    </div>
  );
};

export default VideoSection;
