import Folder from "./folder";
import File from "./file";

export type resultType = {
  name?: string,
  path?: string,
  isFolder?: boolean,
  items?: resultType[]
}

type props = {
  folderStructureData: resultType | null,
  socket: WebSocket | null,
}

function Explorer({folderStructureData, socket}: props) {

  function handleFileClick(path: string) {
    socket?.send(JSON.stringify({event: 'file-click', data: path}));
  }

  if(!folderStructureData || !socket) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="h-[600px] w-[260px] border border-black border-dashed cursor-pointer">
      {
          folderStructureData?.items?.map((item, id) => {
          return item.isFolder ? <Folder key={id} item={item} size={0} handleFileClick={handleFileClick}/> : <File key={id} item={item} size={0} handleClick={handleFileClick}/>;
        })
      }
    </div>
  );
}

export default Explorer;
