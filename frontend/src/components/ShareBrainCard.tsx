import Button from "./Button";

export default function ShareBrainCard() {
  
    function copyUrl(){

    }
  return (
    <div>
      <div className=" max-w-96 h-full rounded-lg shadow shadow-slate-400 py-4 px-4">
        <div className="text-lg font-bold"> 
            Please copy the below url
        </div>
        <div className="py-4">
            <input
            className="w-full min-h-[40px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Title"
            defaultValue={``}
            readOnly
          />
        </div>
        <div>
            <Button className="w-full"
            onClick={copyUrl}>Copy Url</Button>
        </div>
      </div>
    </div>
  );
}
