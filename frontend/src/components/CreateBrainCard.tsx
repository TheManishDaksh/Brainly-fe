import { useState } from "react";
import Button from "./Button";
import axios from "axios";

export default function CreateBrainCard() {
  const [contentType, setContentType] = useState("document");
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ tags, setTags ] = useState("");

  async function submitContent(){
    try{
        await axios.post("http://localhost:3000/content",{
            title, content, contentType, tags
        },{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
    }catch(error : any){
        alert(`error in posting data${error.data.message}`)
    }
  }
  return (
    <div>
      <div className=" max-w-96 h-full rounded-lg shadow shadow-slate-400 py-4 px-4">
        <div className="flex justify-between">
          <Button
            variant={contentType === "document" ? "default" : "outline"}
            onClick={() => setContentType("document")}
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
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        {contentType === "document" ? (
          <div className="py-4">
            <textarea
  className="w-full min-h-[150px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
  placeholder="Write your tasks..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
/>

          </div>
        ) : (
          <div className="py-4">
            <input
               className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              type="text"
              placeholder={`Paste your ${contentType} link`}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </div>
        )}
        <div className="py-4">
            <input
               className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e)=>setTags(e.target.value)}
            />
          </div>
        <div>
            <Button className="w-full"
            onClick={()=>submitContent}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
