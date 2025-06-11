import { motion } from "framer-motion";
import axios from "axios";
import { DockIcon, YoutubeIcon } from "lucide-react";
import { ShareIcon, DeleteIcon, TwitterIcon, EditIcon } from "../icons";
import { toast } from "react-toastify";

type CardType = "twitter" | "youtube" | "doccument";

interface CardProps {
  id: string;
  type: CardType;
  title: string;
  link?: string;
  tags: string[];
  text?: string;
  onEdit: () => void;
}

export default function Card({ id, type, title, link, tags, text, onEdit }: CardProps) {
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/content/${id}`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
        data: { contentId: id },
      });

      if (response.status === 200) {
        toast.success("Card deleted");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to delete card");
    }
  };

  const handleShare = () => {
    if (link) window.open(link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-2 md:p-3 bg-white shadow shadow-slate-400 max-w-72 rounded-lg hover:scale-105 transition-all duration-300 max-h-full flex flex-col items-center"
    >
      <div className="flex justify-between gap-8">
        <div>{type === "twitter" ? <TwitterIcon /> : type === "youtube" ? <YoutubeIcon /> : <DockIcon />}</div>
        <div className="text-base font-semibold truncate max-w-[100px]">{title || "Untitled"}</div>
        <div className="flex gap-3 text-slate-500 cursor-pointer">
          {type === "doccument" ? <EditIcon onClick={onEdit} /> : <ShareIcon onClick={handleShare} />}
          <DeleteIcon onClick={handleDeleteClick} />
        </div>
      </div>

      {/* Main Content */}
      {type === "doccument" && <p className="py-3 text-black">{text || "No content provided."}</p>}
      {type === "twitter" && (
        <div className="py-4 flex items-center justify-center min-w-full">
          <blockquote className="twitter-tweet" data-dnt="true">
            <p lang="en" dir="ltr">
              <a href={link?.replace("x", "twitter")}></a>
            </p>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        </div>
      )}
      {type === "youtube" && (
        <div className="py-5">
          <iframe
            src={link?.replace("watch", "embed").replace("?v=", "/")}
            title="youtube video player"
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {(tags.length ? tags : ["#productivity"]).map((tag, index) => (
          <span key={index} className="bg-indigo-200 rounded-full px-2 py-0.5 text-xs">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}