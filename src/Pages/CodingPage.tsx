import Explorer from "@/components/explorer";
import CodeEditor from "@/components/code-editor";
import Output from "@/components/output";
import Terminal from "@/components/terminal";

export default function CodingPage() {
  return (
    <div className="ml-10">
      <div className="flex">
        <Explorer />
        <CodeEditor />
        <div className="flex flex-col">
          <Output />
          <Terminal />
        </div>
      </div>
    </div>
  );
}
