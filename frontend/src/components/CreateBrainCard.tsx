import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function CreateBrainCard() {
  const [contentType, setContentType] = useState("doccument"); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitContent() {
    setLoading(true);
    try {
      const brain = await axios.post(
        "http://localhost:3000/content",
        {
          title,
          link: content,
          text,
          type: contentType,
          tags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(brain);

      if (brain.status === 200) {
        alert("New Brain Created");
        navigate("/dashboard");
        return;
      }
      alert("Input Error");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response.status === 403) {
        alert("Server Error");
      }
    }
  }

  return (
    <div>
      <div className=" max-w-96 h-full rounded-lg shadow shadow-slate-400 py-4 px-4">
        <div className="flex justify-between">
          <Button
            variant={contentType === "doccument" ? "default" : "outline"}
            onClick={() => setContentType("doccument")}
          >
            Doccument
          </Button>
          <Button
            variant={contentType === "twitter" ? "default" : "outline"}
            onClick={() => setContentType("twitter")}
          >
            Twitter
          </Button>
          <Button
            variant={contentType === "youtube" ? "default" : "outline"}
            onClick={() => setContentType("youtube")}
          >
            Youtube
          </Button>
        </div>
        <div className="py-4">
          <input
            className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {contentType === "doccument" ? (
          <div className="py-4">
            <textarea
              className="w-full min-h-[150px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Write your tasks..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        ) : (
          <div className="py-4">
            <input
              className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              type="text"
              placeholder={`Paste your ${contentType} link`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
        <div className="py-4">
          <input
            className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Tags"
            value={tagsInput}
            onChange={(e) => {
              setTagsInput(e.target.value);
              const input = e.target.value
                .split(" ")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");
              setTags(input);
            }}
          />
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Button className="w-full" onClick={submitContent}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
