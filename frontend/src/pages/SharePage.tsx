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
  useEffect(() => {
    async function main() {
      console.log("hasj");

      try {
        const path = window.location.pathname; 
        const hash = path.split("/")[2]; 
        const resposne = await axios.get(`http://localhost:3000/brain/${hash}`);
        
        if (!resposne) {
          toast.error("backend has nothing to show");
        }
        const res = resposne.data.content
        setContent(res);
        setUserName(resposne.data.username);
      } catch (error: any) {
        toast.error("can't get brain");
      }
    }
    main();
  }, []);
  return (
    <div className="bg-sky-100 py-10 px-2 md:px-10 w-[100vw] h-[100vh]">
      <div className="text-xl font-bold text-indigo-600 md:text-2xl py-5">
        {`You are viewing ${userName}'s Second Brain`}
      </div>
      <div className="py-5 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        { content.length > 0
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
    </div>
  );
}
