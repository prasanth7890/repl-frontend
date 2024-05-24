import Folder from "./folder";
import File from "./file";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type resultType = {
  name?: string,
  path?: string,
  isFolder?: boolean,
  items?: resultType[]
}

type props = {
  folderStructureData: resultType | null,
}

function Explorer({folderStructureData}: props) {
  const socket = useSelector((state: RootState) => state.socket.value);

  if(!folderStructureData || !socket) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="h-[600px] w-[260px] border border-black border-dashed cursor-pointer">
      {
          folderStructureData?.items?.map((item, id) => {
          return item.isFolder ? <Folder key={id} item={item} size={0}/> : <File key={id} item={item} size={0}/>;
        })
      }
    </div>
  );
}

export default Explorer;
