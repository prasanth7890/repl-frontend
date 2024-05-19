import { useState } from "react";
import File from "./file";


type props = {
  item: any,
  size: number,
  handleFileClick: (path:string)=>void,
};

function Folder({ item, size, handleFileClick }: props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="h-[25px] hover:bg-slate-700 w-[180px] select-none flex items-center" style={{paddingLeft: `${size}px`}} onClick={() => setIsExpanded((state) => !state)}>
        <div className="mt-0.5 pl-1">
          {isExpanded ? <div><i className="material-icons" style={{fontSize: '17px'}}>folder_open</i></div> : <div><i className="material-icons" style={{fontSize: '17px'}}>folder</i></div>}
        </div>
        <div className="mb-[5px] pl-0.5">{item.name}</div>
      </div>
      {isExpanded &&
        item.items.map((it: any, id:any) =>
          it.isFolder ? <Folder key={id} item={it} size={size+20} handleFileClick={handleFileClick}/> : <File key={id} item={it} size={size + 20} handleClick={handleFileClick}/>
        )}
    </>
  );
}

export default Folder;
