import { useState, type FormEvent } from "react"
import { Button } from "./";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const [ input, setInput] = useState("");
    const navigate = useNavigate();

    function handleSearch(){
        navigate(`/search?query=${input}`)
    }
    return (
        <div className="px-4 py-2 border max-w-full flex justify-between md:max-w-[500px] lg:max-w-[700px] border-slate-400 shadow rounded-lg">
            <input 
            className="outline-none w-full"
            type="text"
            placeholder="Search..."
            value={input}
            //@ts-ignore    
            onChange={(e:FormEvent)=>setInput(e.target.value)}
            />
            <Button variant="default" size="md" onClick={handleSearch}>Search</Button>
        </div>
    )
}