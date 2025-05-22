import {  DockIcon, YoutubeIcon } from "lucide-react";
import { SharIcon, DeleteIcon, TwitterIcon } from "../icons";


type CardType = "twitter" | "youtube" | "doccument";

interface CardProps{
    type : CardType,
    title : String,
    link : String,
    tags : String
}

export default function Card({type, title, link, tags}:CardProps){
    
    return(
        <div className="p-4">
            <div className=" p-4 bg-white shadow shadow-slate-400 max-w-72">
               <div className="flex justify-between gap-3 items-center">
                    <div className="flex items-center "> 
                    {type === "twitter" ? <TwitterIcon/> :
                        type === "youtube" ? <YoutubeIcon/> : <DockIcon/>
                    }
                    </div>
                    <div className="text-base font-semibold"
                    >{title || "Title is tweeter most uncommon"}
                    </div>
                    <div className=" flex text-slate-500 cursor-pointer gap-3">
                        <SharIcon/>
                        <DeleteIcon/>
                    </div>
               </div>
               <div className="py-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas aperiam a quam necessitatibus odit laudantium illum facere. Eveniet officiis, at pariatur dicta sint, atque nostrum labore nemo nam quas incidunt.
               </div>
               <span className="bg-indigo-200 border-none rounded-full px-2 py-0.5">
                    { tags || "#productivity"}
               </span>
            </div>
        </div>
    )
}   