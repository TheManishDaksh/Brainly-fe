import { useSearchParams } from "react-router-dom";
import { Card, SearchBar } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type CardType = "twitter" | "youtube" | "doccument";

interface CardProps {
  id: string;
  type: CardType;
  title: string;
  link?: string;
  tags: string[];
  text?: string;
  onEdit: () => void;
}
export default function SearchPage() {
  const [URLSearchParams] = useSearchParams();
  const query = URLSearchParams.get("query");
  const [result, setResult] = useState<CardProps[]>([]);
  async function fetchData() {
    try {
      if (query) {
        console.log(query);
        const response = await axios.get(
          `http://localhost:3000/search?query=${query}`,{
            headers : {
              Authorization : localStorage.getItem("token")
            }
          }
        );
        const res = response.data.content;
        if (res && res.length > 0) {
          setResult(res);
        } else {
          toast.error("Nothing to show");
        }
      }
    } catch (error: any) {
      toast.error("data not found");
    }
  }

  useEffect(() => {
    fetchData();
  }, [query]);
  console.log(result);

  return (
    <div className="px-4 py-7">
      <div className="flex justify-center">
        {/*@ts-ignore*/}
        <SearchBar />
      </div>
      <div className="flex justify-center py-10">
        {result.length > 0 ? (
          result.map((item) => (
            <div key={item.id}>
              <Card type={item.type}
                title={item.title}
                id={item.id}
                text={item.text}
                tags={item.tags}
              />
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}
