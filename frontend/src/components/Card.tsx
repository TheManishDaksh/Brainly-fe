import {  DockIcon, YoutubeIcon } from "lucide-react";
import { SharIcon, DeleteIcon, TwitterIcon } from "../icons";


type CardType = "twitter" | "youtube" | "doccument";

interface CardProps{
    type : CardType,
    title : String,
    link? : String,
    tags : String,
    text? : String
}

export default function Card({type, title, link, tags, text}:CardProps){
    
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
               {/* <div className="py-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas aperiam a quam necessitatibus odit laudantium illum facere. Eveniet officiis, at pariatur dicta sint, atque nostrum labore nemo nam quas incidunt.
               </div> */}
               <div>
                <blockquote data-dnt="true"><a href="https://twitter.com/Reza_Zadeh/status/1344009123004747778?ref_src=twsrc%5Etfw">December 29, 2020</a></blockquote>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
               </div>
               
               <div>
                <div><iframe src="https://www.youtube.com/embed/q3lX2p_Uy9I?rel=0" className="w-full h-full rounded-lg" allowFullScreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"></iframe></div>
               </div>
               <span className="bg-indigo-200 border-none rounded-full px-2 py-0.5">
                    { tags || "#productivity"}
               </span>
            </div>
        </div>
    )
}   