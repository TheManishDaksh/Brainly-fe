import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button, Card, CreateBrainCard, ShareBrainCard } from "../components";
import { Brain } from "lucide-react";
import { PlusIcon, ShareIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const DashboardPage = () => {
  const [createBrain, setCreateBrain] = useState(false);
  const [shareBrain, setShareBrain] = useState(false);
  const [cardData, setCardData] = useState<CardTypeProps[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editingCard, setEditingCard] = useState<CardTypeProps | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  
  const shareRef = useRef(null);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    async function main() {
      try {
        const response = await axios.get("http://localhost:3000/content", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        if (!response) {
          toast.error("No data or Server down");
          return;
        }
        const data = response.data.content;
        setCardData(data);
      } catch (error: any) {
        if (error.response.status === 403) {
          toast.error("Some Internal Issues");
        }
      }
    }
    main();
  }, []);

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

  useEffect(() => {
    function handleClickOutsideEdit(event: MouseEvent) {
      if (
        editRef.current &&
        !(editRef.current as any).contains(event.target)
      ) {
        handleCancelEdit();
      }
    }

    if (isEditable) {
      document.addEventListener("mousedown", handleClickOutsideEdit);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEdit);
    };
  }, [isEditable]);

  const handleEdit = (card: CardTypeProps) => {
    setEditingCard(card);
    setEditedTitle(card.title);
    setEditedText(card.text || "");
    setTagsInput((card.tags || []).join(" "));
    setIsEditable(true);
  };

  const handleSaveEdit = async () => {
    if (!editingCard) return;

    try {
      const updatedTags = tagsInput
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
        const id = editingCard._id;
      const response = await axios.put(
        `http://localhost:3000/content/${id}`,
        {
          title: editedTitle,
          text: editedText,
          tags: updatedTags,
        },
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );
      
      if (response.status === 200) {
        toast.success("Content updated");
        setIsEditable(false);
        setEditingCard(null);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to edit card");
    }
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setEditingCard(null);
    setEditedTitle("");
    setEditedText("");
    setTagsInput("");
  };

  const handleBackdropClick = (e: FormEvent) => {
    if (e.target === e.currentTarget) {
      handleCancelEdit();
    }
  };

  const handleModalClick = (e: FormEvent) => {
    e.stopPropagation();
  };

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
          <Button onClick={() => setShareBrain(true)}
            variant="outline" className="rounded-full px-5">
            <ShareIcon /> <span className="hidden sm:block">Share Brain</span>
          </Button>
        </div>
      </nav>

      <div className="px-2 md:px-10 py-10">
        {cardData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card) => (
              <Card
                key={card._id}
                title={card.title}
                id={card._id}
                type={card.type}
                link={card.link}
                text={card.text}
                tags={card.tags ?? []}
                onEdit={() => handleEdit(card)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-xl font-bold md:text-3xl">No Brain Found</div>
            <div>
              <Button onClick={() => setCreateBrain(true)} size="lg" className="gap-2">
                <PlusIcon /> <span>Create Brain</span>
              </Button>
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
              <ShareBrainCard />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditable && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            />

            <motion.div
              ref={editRef}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleModalClick}
              >
                <h2 className="text-xl font-semibold mb-4">Edit Document</h2>
                <input
                  type="text"
                  className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
                  placeholder="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="w-full mb-4 p-3 h-32 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
                  placeholder="Content"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
                  placeholder="Tags (space separated)"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;