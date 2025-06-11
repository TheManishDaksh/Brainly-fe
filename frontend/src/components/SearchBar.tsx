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
        <div>
            <input 
            type="text"
            placeholder="Search..."
            value={input}
            //@ts-ignore    
            onChange={(e:FormEvent)=>setInput(e.target.value)}
            />
            <Button variant="default" size="sm" onClick={handleSearch}>Search</Button>
        </div>
    )
}