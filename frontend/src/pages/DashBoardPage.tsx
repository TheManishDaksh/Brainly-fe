import { useState, useRef, useEffect } from "react";
import { Button, Card, CreateBrainCard, ShareBrainCard } from "../components";
import { Brain } from "lucide-react";
import { PlusIcon, ShareIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

type CardType = "twitter" | "youtube" | "doccument";

interface CardTypeProps {
  _id: string;
  title: string;
  type: CardType;
  link?: string;
  text?: string;
  tags?: string[];
}
const DashboardPage = () => {
  const [createBrain, setCreateBrain] = useState(false);
  const [shareBrain, setShareBrain] = useState(false);
  const [ cardData, setCardData ] = useState<CardTypeProps[]>([]);
  const shareRef = useRef(null);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(()=>{
    async function main(){
      try{
        const response = await axios.get("http://localhost:3000/content",{
      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
    if(!response){
      alert("No data or Server down")
      return;
    }
    const data = response.data;
    setCardData(data.content);
      }catch(error : any){
        alert("Some Internal Issues")
      }
    }
    main();
  },[])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cardRef.current &&
        !(cardRef.current as any).contains(event.target)
      ) {
        setCreateBrain(false);
      }
    }

    if (createBrain) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createBrain]);

   useEffect(() => {
    function handleClickOutsideCard(event: MouseEvent) {
      if (
        shareRef.current &&
        !(shareRef.current as any).contains(event.target)
      ) {
        setShareBrain(false);
      }
    }

    if (shareBrain) {
      document.addEventListener("mousedown", handleClickOutsideCard);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCard);
    };
  }, [shareBrain]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-indigo-600 font-bold text-xl cursor-pointer"
        >
          <Brain className="w-6 h-6" />
          Second Brain
        </div>

        <div className="flex items-center gap-4">
          <Button className="rounded-full px-5" onClick={() => setCreateBrain(true)}>
            <PlusIcon /> <span className="hidden sm:block">Create Brain</span>
          </Button>
          <Button onClick={()=>setShareBrain(true)}
          variant="outline" className="rounded-full px-5">
            <ShareIcon /> <span className="hidden sm:block">Share Brain</span>
          </Button>
        </div>
      </nav>
      <div className="px-10 py-10">
        { cardData.length > 0 ? (
          cardData.map((card)=>{
            return <div key={card._id}>
              <Card title={card.title}
                type={card.type}
                link={card.link}
                text={card.text}
                tags={card.tags ?? []}
              />
            </div>
          })
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-xl font-bold md:text-3xl">
            No Brain Found
          </div>
          <div>
            <Button onClick={()=>setCreateBrain(true)}
            size="lg"
            className="gap-2"
            ><PlusIcon /> <span>Create Brain</span></Button>
          </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {createBrain && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={cardRef}
              className="fixed z-50 left-[65%] top-[90%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl w-[400px] max-w-full"
              initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <CreateBrainCard />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareBrain && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={shareRef}
              className="fixed z-50 left-[65%] top-[70%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl w-[400px] max-w-full"
              initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ShareBrainCard/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
