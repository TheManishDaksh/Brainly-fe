import { useEffect, useState } from "react";
import { ShareCard } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

type CardType = "twitter" | "youtube" | "doccument";

interface CardTypeProps {
  _id: string;
  title: string;
  type: CardType;
  link?: string;
  text?: string;
  tags?: string[];
}

export default function SharePage() {
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState<CardTypeProps[]>([]);

  const fetchContent = async () => {
    try {
      const path = window.location.pathname;
      const hash = path.split("/")[2];
      const response = await axios.get(`http://localhost:3000/brain/${hash}`);

      if (!response.data) {
        toast.error("backend has nothing to show");
        return;
      }

      const res = response.data.content;
      setContent(res);
      setUserName(response.data.username);
    } catch (error: any) {
      toast.error("can't get brain");
      console.error("Error fetching brain data:", error);
    }
  };

  useEffect(()=>{
    fetchContent();
  },[])

  return (
    <div className="bg-sky-100 pt-10 px-2 md:px-10 w-[100vw] h-[100%]">
      <div className="text-xl font-bold text-indigo-600 md:text-2xl py-5">
        {`You are viewing ${userName}'s Second Brain`}
      </div>

      {/* Optional: Add a Refresh button */}
      <button
        onClick={fetchContent}
        className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        Refresh Content
      </button>

      <div className="py-5 grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {content.length > 0
          ? (content.map((c) => (
              <ShareCard
                key={c._id}
                id={c._id}
                type={c.type}
                title={c.title}
                link={c.link}
                text={c.text}
                tags={c.tags ?? []}
              />
            )))
          : ("There is nothing to show you")}
      </div>
      {/* Footer */}
      <footer className="bg-slate-100 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Second Brain. All rights reserved.
      </footer>
    </div>
  );
}
