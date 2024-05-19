import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm-js';
import 'xterm/css/xterm.css';

function TerminalComponent() {
  const terminalRef = useRef<any>(null);

  let prevOp = "";

  function terminalHandler(terminal: any, input: string) {
    if(input === '\r') {
      terminal.writeln('');
      terminal.write('$ ');
      prevOp = '';
    }
    else if(input === '\u007f') {
      if(prevOp.length > 0) {
        prevOp = prevOp.substring(0, prevOp.length - 1);
        terminal.write('\b \b');
      }
    }
    else {
      terminal.write(input); 
      prevOp = prevOp + input;
    }
  }

  useEffect(()=>{
    const terminal = new Terminal({
      cols: 56,
      rows: 16,
    });

    if(terminalRef.current) {
      terminal.open(terminalRef.current);
    }

    terminal.write('Hello from \x1B[1;3;31mcodebox\x1B[0m $ ');

    terminal.onData(data => {
      terminalHandler(terminal, data);
    });

    terminal.onKey((event)=>{
      if(event.domEvent.key === 'Enter') {
        if(prevOp.length > 0) {
          console.log('send it to server ' + prevOp.trim());
        }
      }
    })

    return ()=>{
      terminal.dispose();
    }
  });

  return (
    <div className="h-[300px] w-[500px] border border-black border-dashed" ref={terminalRef}></div>
  )
}

export default TerminalComponent
