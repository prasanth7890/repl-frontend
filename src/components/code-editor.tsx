import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

type props = {
  socket: WebSocket | null,
}

function Editor({socket}: props) {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [fileName, setFileName] = useState<string>('filename')

  if(socket) {
    socket.onmessage = (event)=>{
      const message = JSON.parse(event.data);
      if(message.event === 'file') {
        setCode(message.data);
        setFileName(message.name);
      }
    }
  }

  return (
    <>
      <div className="h-[600px] w-[700px] border border-black border-dashed pl-8 pt-4 overflow-y-scroll">
        <div className="border border-white">
          <div>{fileName}</div>
          <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter your code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            className="text-[16px] bg-transparent select-text overflow-y-scroll"
            style={{
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      </div>
    </>
    
  );
}

export default Editor;
