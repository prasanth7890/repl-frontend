import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useState} from "react";

export function SelectTemplate() {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <p className="mb-2">Template</p>
      <Select onValueChange={(v)=>setValue(v)} defaultValue="Node.js">
        {value}
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Choose Template" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Node.js">Node.js</SelectItem>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="C++">C++</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
