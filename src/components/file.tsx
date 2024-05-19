type props = {
    item: any,
    size: number,
    handleClick: (path: string)=>void,
}

function File({item, size, handleClick}: props) {

  return (
    <div style={{paddingLeft: `${size}px`}} className="hover:bg-slate-700 w-[180px] select-none" onClick={()=>handleClick(item.path)}>
      <div className="pb-[2px] pl-1">{item.name}</div>
    </div>
  )
}

export default File
