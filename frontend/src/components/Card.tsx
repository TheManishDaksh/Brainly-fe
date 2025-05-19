import {  DockIcon, YoutubeIcon } from "lucide-react";
import { SharIcon, DeleteIcon, TwitterIcon } from "../icons";


type CardType = "twitter" | "youtube" | "doccument";

interface CardProps{
    type : CardType,
    title : String,
    link : String
}

export default function Card({type, title, link}:CardProps){
    
    return(
        <div className="p-4">
            <div className=" p-4 bg-white shadow shadow-slate-400 max-w-72">
               <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 "> 
                    {type === "twitter" ? <TwitterIcon/> :
                        type === "youtube" ? <YoutubeIcon/> : <DockIcon/>
                    }
                    <p className="text-lg font-semibold"
                    >{title || "Title is tweeter most uncommon"}</p> 
                    </div>
                    <div className=" flex text-slate-500 cursor-pointer gap-3">
                        <SharIcon/>
                        <DeleteIcon/>
                    </div>
               </div>
               <div className="py-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas aperiam a quam necessitatibus odit laudantium illum facere. Eveniet officiis, at pariatur dicta sint, atque nostrum labore nemo nam quas incidunt.
               </div>
               <div className="">
                    #productivity
               </div>
            </div>
        </div>
    )
}   