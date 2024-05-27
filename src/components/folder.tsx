import { useState, useRef } from "react";
import File from "./file";
import { WebSocketHandler } from "@/lib/WebSocketHandler";
import { useSearchParams} from "react-router-dom";

type props = {
  item: any,
  size: number,
};


function Folder({ item, size }: props) {
  const [params, setParams] = useSearchParams();
  const boxId = params.get('boxId') || ""; 

  const subFiles = useRef([]);
  const wsh = WebSocketHandler.getInstance(boxId);
  const socket = wsh.getSocket();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const folderClickCallback = (path: string, data: []) => {
    if(path === item.path) {
      subFiles.current = data;
      setIsExpanded(true);
    }
  }

  wsh.whenFolderClick = folderClickCallback;
  
  function handleFolderClick(path: string) {
    socket?.send(JSON.stringify({event: 'folder-click', dirPath: path}));
  }
  
  function onClick() {
    if(isExpanded) {
      setIsExpanded(false); 
    }
    else {
      handleFolderClick(item.path);
    }
  }


  return (
    <>
      <div className="h-[25px] hover:bg-slate-700 w-[180px] select-none flex items-center" style={{paddingLeft: `${size}px`}} onClick={onClick}>
        <div className="mt-0.5 pl-1">
          {isExpanded ? <div><i className="material-icons" style={{fontSize: '17px'}}>folder_open</i></div> : <div><i className="material-icons" style={{fontSize: '17px'}}>folder</i></div>}
        </div>
        <div className="mb-[5px] pl-0.5">{item.name}</div>
      </div>
      {isExpanded && (subFiles.current.length > 0) ? subFiles.current.map((it: any, id:any) =>
          it.isFolder ? <Folder key={id} item={it} size={size+20} /> : <File key={id} item={it} size={size + 20}/>
        ): <></>}
    </>
  );
}

export default Folder;
