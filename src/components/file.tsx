import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setRenderEditor } from "@/features/renderEditorSlice";


type props = {
    item: any,
    size: number,
}

function File({item, size}: props) {
  const socket = useSelector((state: RootState) => state.socket.value);
  const dispatch = useDispatch();

  function handleFileClick(path: string) {
    socket?.send(JSON.stringify({event: 'file-click', data: path}));
    dispatch(setRenderEditor(true));
  }
  
  return (
    <div style={{paddingLeft: `${size}px`}} className="hover:bg-slate-700 w-[180px] select-none" onClick={()=>handleFileClick(item.path)}>
      <div className="pb-[2px] pl-1">{item.name}</div>
    </div>
  )
}

export default File
