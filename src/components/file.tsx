import { WebSocketHandler } from "@/lib/WebSocketHandler";
import { useSearchParams} from "react-router-dom";

type props = {
    item: any,
    size: number,
}

function File({item, size}: props) {
  const [params, setParams] = useSearchParams();
  const boxId = params.get('boxId') || ""; 

  const wsh = WebSocketHandler.getInstance(boxId);
  const socket = wsh.getSocket();

  function handleFileClick(path: string) {
    socket?.send(JSON.stringify({event: 'file-click', data: path}));
  }
  
  return (
    <div style={{paddingLeft: `${size}px`}} className="hover:bg-slate-700 w-[180px] select-none" onClick={()=>handleFileClick(item.path)}>
      <div className="pb-[2px] pl-1">{item.name}</div>
    </div>
  )
}

export default File
