import { useState } from "react";
import File from "./file";


type props = {
  item: any,
  size: number
};

function Folder({ item, size }: props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="h-[25px] bg-slate-400 hover:bg-slate-300 w-[180px] select-none flex items-center" style={{paddingLeft: `${size}px`}} onClick={() => setIsExpanded((state) => !state)}>
        <div className="mt-0.5 pl-1">
          {isExpanded ? <div><i className="material-icons" style={{fontSize: '17px'}}>folder_open</i></div> : <div><i className="material-icons" style={{fontSize: '17px'}}>folder</i></div>}
        </div>
        <div className="mb-[5px] pl-0.5">{item.name}</div>
      </div>
      {isExpanded &&
        item.items.map((it: any, id:any) =>
          it.isFolder ? <Folder key={id} item={it} size={size+20} /> : <File key={id} item={it} size={size + 20}/>
        )}
    </>
  );
}

export default Folder;
