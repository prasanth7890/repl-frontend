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
}

function Explorer({folderStructureData}: props) {

  if(!folderStructureData) {
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
