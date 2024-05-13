import folderStructureData from "@/lib/folderData";
import Folder from "./folder";
import File from "./file";

function Explorer() {
  return (
    <div className="h-[600px] w-[260px] bg-yellow-400 border border-black border-dashed cursor-pointer">
      {
          folderStructureData.items.map((item, id) => {
          return item.isFolder ? <Folder key={id} item={item} size={0}/> : <File key={id} item={item} size={0}/>;
        })
      }
    </div>
  );
}

export default Explorer;
