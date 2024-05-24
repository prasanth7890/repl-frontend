import { useState, useRef } from "react";
import File from "./file";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

type props = {
  item: any,
  size: number,
};


function Folder({ item, size }: props) {
  const subFiles = useRef([]);
  const socket = useSelector((state: RootState) => state.socket.value);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  function handleFolderClick(path: string): Promise<void> {
    return new Promise((resolve, reject)=> {
      if(socket) {
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.event === 'folder' && message.path === item.path) {
            subFiles.current = message.data;
            resolve();
          }
        }
  
        socket?.send(JSON.stringify({event: 'folder-click', dirPath: path}));
      }
    })
  }
  
  async function onClick() {
    if(isExpanded) {
      setIsExpanded(false); 
    }
    else {
      await handleFolderClick(item.path);
      if(subFiles.current.length > 0) {
        setIsExpanded(true);
      }
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
