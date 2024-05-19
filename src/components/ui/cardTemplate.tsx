import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function CardWithForm() {
  const [name, setName] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit() {
    // if both name and template are there then continue 
    // check for the name in db, if its in db then we cant allow it else we can proceed
    navigate('/code?boxId=buttercup');
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Box</CardTitle>
        <CardDescription>Create your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e)=>setName(e.target.value)} id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Template</Label>
              <Select onValueChange={setTemplate}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="node">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>
  )
}
