import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"

export default function Navbar() {
    return(
        <nav className="sticky top-[1px]">
            <div className="flex w-screen justify-around items-center h-[50px]">
                <Link to={'/'} className="font-semibold text-xl">CodeBox</Link>
                <div className="flex w-[130px] justify-between">
                    <ModeToggle/>
                    <Button variant={"outline"}>Logout</Button>
                </div>
            </div>
        </nav>
    )
}