import { DockIcon, YoutubeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ShareIcon, DeleteIcon, TwitterIcon } from "../icons";

type CardType = "twitter" | "youtube" | "doccument";

interface CardProps {
  type: CardType;
  title: String;
  link?: String;
  tags: String;
  text?: String;
}

export default function Card({ type, title, link, tags, text }: CardProps) {
  return (
    <motion.div 
    initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    className=" p-4 bg-white shadow shadow-slate-400 max-w-72 rounded-lg hover:scale-105 transition-all duration-300">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex items-center ">
          {type === "twitter" ? (
            <TwitterIcon />
          ) : type === "youtube" ? (
            <YoutubeIcon />
          ) : (
            <DockIcon />
          )}
        </div>
        <div className="text-base font-semibold">
          {title || "Title is tweeter most uncommon"}
        </div>
        <div className=" flex text-slate-500 cursor-pointer gap-3">
          <ShareIcon />
          <DeleteIcon />
        </div>
      </div>
      {type === "doccument" ? (
        <div className="py-3">
          {text || "plase enter your text"}
        </div>
      ) : type === "twitter" ? (
        <div>
          <blockquote className="twitter-tweet">
                    <a href={link?.replace("x.com", "twitter.com")}></a> 
                </blockquote>
        </div>
      ) : (
        <div className="py-5">   
          <iframe
            src={link?.replace("watch", "embed").replace("?v=", "/")}
            title="youtube video player"
            className="w-full h-full rounded-lg"
            allowFullScreen
            scrolling="no"
            allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
          ></iframe>
        </div>
      )}

      <span className="bg-indigo-200 border-none rounded-full px-2 py-0.5">
        {tags || "#productivity"}
      </span>
    </motion.div>
  );
}
