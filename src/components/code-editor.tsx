import { useCallback, useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { WebSocketHandler } from "@/lib/WebSocketHandler";

function debounce(callback:any, timer: number) {
  let timeout: any = null;

  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, timer);
  }
}

function Editor() {
  const wsh = WebSocketHandler.getInstance('buttercup');
  const socket = wsh.getSocket();

  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [fileName, setFileName] = useState<string>('filename');
  const [filePath, setFilePath] = useState<string>('filePath');

  const handleFileClick = (...args: any) => {
    setCode(args[0]);
    setFileName(args[1])
    setFilePath(args[2]);
  }

  wsh.whenFileClick = handleFileClick;
  
  function handleChange(content: string) {
    setCode(content);
    if (socket) {
      socket.send(
        JSON.stringify({ event: "coding", data: content, filePath: filePath })
      );
      console.log('sent changed data');
    }
  }

  const debouncedHandleChange = debounce(handleChange, 2000);

  return (
    <>
      <div className="h-[600px] w-[700px] border border-black border-dashed pl-8 pt-4 overflow-y-scroll">
        <div className="border border-white">
          <div>{fileName}</div>
          <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter your code."
            onChange={(e) => debouncedHandleChange(e.target.value)}
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