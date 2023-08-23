
export function ProductTag_ItemView({value, onRemove}:{value:any, onRemove?:any}) {
    return(
        <span className="inline-flex items-baseline rounded bg-slate-600 m-1 p-1">
                    <img src="/icon/tag.png" alt="" className="self-center w-4 h-4 mx-1" />
                    <span><ProductTag_DisplayText value={value}/></span>
                    <button type="button" className="self-center w-4 h-4 mx-1 opacity-50 hover:opacity-100" 
                            onClick={()=>onRemove()}>
                        <img src="/icon/remove.png" alt=""/>
                    </button>
                </span>
)
}

export function ProductTag_DisplayText({value}:{value:any}){
    const categoryName = ['Không xác định', 'Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];
    return <div>{categoryName[value.CategoryId]+': '+ value.name}</div>
}

export function WarehouseKeeper_ItemView({value, onRemove}:{value:any, onRemove?:any}) {
    return(
        <span className="inline-flex items-baseline rounded bg-slate-600 m-1 p-1">
                    <img src="/icon/user_mini.png" alt="" className="self-center w-4 h-4 mx-1" />
                    <span><WarehouseKeeper_DisplayText value={value}/></span>
                    <button type="button" className="self-center w-4 h-4 mx-1 opacity-50 hover:opacity-100" 
                            onClick={()=>onRemove()}>
                        <img src="/icon/remove.png" alt=""/>
                    </button>
                </span>
)
}

export function WarehouseKeeper_DisplayText({value}:{value:any}){
    return <><div>{value.Account.id+' ('+ value.fullName +')'}</div>
    {value.WarehouseName && <div className="text-sky-600">*Thủ kho ở {value.WarehouseName}</div>}
    </>
}