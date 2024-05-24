import Explorer from "@/components/explorer";
import Editor from "@/components/code-editor";
import Output from "@/components/output";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams} from "react-router-dom";
import { resultType } from "@/components/explorer";
import TerminalComponent from "@/components/terminal";
import {useDispatch, useSelector } from "react-redux";
import { setWebSocket } from "@/features/socketSlice";
import { RootState } from "@/store";


export default function CodingPage() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true); 
  const boxId = params.get('boxId') || ""; 
  const socket = useSelector((state: RootState) => state.socket.value);
  const dispatch = useDispatch();
  const [folderStructureData, setFolderStructureData] = useState<resultType | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/connect?boxId=${boxId}`);

    dispatch(setWebSocket(ws));

    return () => {
      socket?.close();
    };
  }, []);
  
  useMemo(()=>{
    if(socket) {
      socket.onmessage = (event)=>{
        const message = JSON.parse(event.data);
        if(message.event === 'loaded') {
          setFolderStructureData(message.data);
          setLoading(false);
        }
      }
    }
  }, [socket]);


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
