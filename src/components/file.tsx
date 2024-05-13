type props = {
    item: any,
    size: number
}

function File({item, size}: props) {
  return (
    <div style={{paddingLeft: `${size}px`}} className="bg-slate-400 hover:bg-slate-300 w-[180px] select-none">
      <div className="pb-[2px] pl-1">{item.name}</div>
    </div>
  )
}

export default File
