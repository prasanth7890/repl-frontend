import Explorer from "@/components/explorer";
import Editor from "@/components/code-editor";
import Output from "@/components/output";
import { useState, useEffect } from "react";
import { useSearchParams} from "react-router-dom";
import { resultType } from "@/components/explorer";
import TerminalComponent from "@/components/terminal";
// import {useDispatch, useSelector } from "react-redux";
// import { setWebSocket } from "@/features/socketSlice";
// import { RootState } from "@/store";
import { WebSocketHandler } from "@/lib/WebSocketHandler";

export default function CodingPage() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true); 
  const boxId = params.get('boxId') || ""; 
  // const socket = useSelector((state: RootState) => state.socket.value);
  // const dispatch = useDispatch();
  const [folderStructureData, setFolderStructureData] = useState<resultType | null>(null);
  let wsh: WebSocketHandler | null;
  
  useEffect(() => {
    wsh = WebSocketHandler.getInstance(boxId);
    wsh.addEventListeners();

    const handleLoading = (...args: any) => {
      setLoading(false);
      setFolderStructureData(args[0]);
    }

    if(wsh) {
      wsh.whenLoaded = handleLoading;
    }

    return () => {
      wsh?.closeSocket();
      wsh?.clearInstance();
    };
  }, []);

  if(loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="ml-10">
      <div className="flex">
        <Explorer folderStructureData={folderStructureData} />
        <Editor/>
        <div className="flex flex-col">
          <Output />
          <TerminalComponent />
        </div>
      </div>
    </div>
  );
}
