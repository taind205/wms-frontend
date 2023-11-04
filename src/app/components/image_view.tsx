'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { DateDisplay } from "../func/convert"
import { API } from "../api/const"


const getStoreImage=API.store.img
const getWarehouseImage=API.warehouse.img
const getStorageLocationImage=API.st_lct.img
const getProductImage=API.product.img

export function Image_Text_View1({item, index, onEditBtnClick, onSelect, isSelected, View_Image, View_Text}:
            {item:{id:number, name:string, address: string, description:string, User:{fullname:string}, updatedAt:string},
            index:number, onEditBtnClick?:any, onSelect?:any, isSelected?:boolean, View_Image:React.JSX.Element, View_Text: React.JSX.Element}) {
    
    // const breakline_style = {
    //     white-space: pre-wrap;
    // }

    return(
        <div style={{minWidth:480, maxWidth:800}} className={"relative flex flex-col w-full justify-start items-center py-8 px-4 space-y-8" 
                + (index%2==0?' bg-slate-900 ':' bg-slate-800')
                + (onSelect?' hover:bg-slate-950':'')
                + (isSelected?' ring-8 ring-sky-700 my-2 bg-slate-950':'')}
        onClick={onSelect||undefined}>
            <div className="text-center text-xl">{item.name}</div>
            <div className="flex flex-row justify-center space-x-8 w-full">
                <div className="grid place-items-center w-2/5">
                    {View_Image}
                </div>
                <div className="flex flex-col justify-start space-y-3 w-3/5">
                    {View_Text}
                </div>
            </div>
            {onEditBtnClick? <div className='absolute right-6 -top-2'>
                 <button onClick={onEditBtnClick}>
                    <Image className='m-1 self-center' src='/icon/edit.png' width={40} height={40} alt="Edit"/>
                </button>
            </div>
            :<></>}
        </div>
    )
}

export function Warehouse_SmallView({item, index}:
    {item:{id:number, name:string, address: string},
    index:number}) {
    return(
    <div style={{}} className={"flex flex-row max-w-lg justify-start p-3 space-x-2"+ (index%2==0?' bg-slate-900 ':' bg-slate-800')}>
            <div className="grid place-items-center w-1/2">
                <img className="w-full" style={{}} src={getWarehouseImage+item.id} alt="Ảnh kho"/> 
            </div>
            <div style={{minWidth:160, maxWidth:240, maxHeight:150}} className="flex flex-col justify-start space-y-1 w-1/2">
                <div className="">{item.name}</div>
                <div>Địa chỉ kho: {item.address} </div>
            </div>
    </div>
)
}

export function Store_SmallView({item, index}:
    {item:{id:number, name:string, address: string},
    index:number}) {
    return(
    <div style={{}} className={"flex flex-row max-w-lg justify-start p-3 space-x-2"+ (index%2==0?' bg-slate-900 ':' bg-slate-800')}>
            <div className="grid place-items-center w-1/2">
                <img className="w-full" style={{}} src={getStoreImage+item.id} alt="Ảnh cửa hàng"/> 
            </div>
            <div style={{maxHeight:150}} className="flex flex-col justify-start space-y-1 w-1/2">
                <div className="">{item.name}</div>
                <div>Địa chỉ: {item.address} </div>
            </div>
    </div>
)
}

export function StorageLocation_View({item, index, onEditBtnClick, onSelect, isSelected, new_img_upload_obj_url}:
    {item:any,
    index:number, onEditBtnClick?:any, onSelect?:any, isSelected?:boolean, new_img_upload_obj_url?:string}) {

    return(
    <div style={{minWidth:400, maxWidth:700}} className={"relative flex flex-col w-full justify-start items-center py-5 px-3 space-y-5" 
            + (index%2==0?' bg-slate-800 ':' bg-slate-800')
            + (onSelect?' hover:bg-slate-950':'')
            + (isSelected?' ring-8 ring-sky-700 my-2 bg-slate-950':'')}
            onClick={onSelect||undefined}>
        <div className="flex flex-row justify-center space-x-3 h-full w-full">
            <div style={{minWidth:150, maxWidth:300, maxHeight:200}} className="flex justify-center items-center h-full w-1/2 bg-slate-900">
                <img style={{minWidth:150, maxWidth:300, maxHeight:200}} src={new_img_upload_obj_url || getStorageLocationImage+(item.id||item.StorageLocation.id)} alt="Ảnh vị trí lưu trữ"/> 
            </div>
            <div className="flex flex-col justify-start space-y-2 w-1/2">
                <div className="py-2 pr-10 text-xl">{item.name||item.StorageLocation.name}</div>
                {item.ProductStorageLocations?
                <div className="text-xl text-green-300">*{item.ProductStorageLocations[0].inventoryNumber} hàng hóa phù hợp</div>:
                <div className="whitespace-pre-wrap	">{item.description} </div>}
                {onEditBtnClick? <div className="text-slate-400 text-right">{new_img_upload_obj_url ? 'Vừa được cập nhật bởi bạn':''}</div>:<></>}
                {/* ('Cập nhật lần cuối lúc '+ item.updatedAt?.replace('T',' ').slice(0,-5)+' bởi '+item.User?.fullname)}} */}
            </div>
        </div>
        {onEditBtnClick? <div className='absolute right-2 top-0'>
            <button onClick={onEditBtnClick}>
                <Image className='m-1 self-center' src='/icon/edit.png' width={32} height={32} alt="Edit"/>
            </button>
        </div>
        :<></>}
    </div>
    )
}

export function Product_View_sm({item, onEditBtnClick, onInventoryBtnClick, new_img_upload_obj_url}:
    {item:{id:number, name:string},onEditBtnClick:any, onInventoryBtnClick:any, new_img_upload_obj_url?:string}) {

    const [showOptions,setShowOptions] = useState(false)

const fade_style = { top:"0%", right:"0%", bot:"0%", left:"0%", backgroundColor:"#00000080" };
const btn_style = "pl-1.5 py-1 text-left bg-sky-300 hover:bg-sky-400 text-black";
return(
<div style={{minWidth:"120px"}} className="flex flex-col justify-start items-center p-3 rounded-2xl bg-slate-300 h-60 space-y-3">
    <div onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} 
                    className="relative grid place-items-center rounded-xl bg-white h-40 w-full p-1">
        <img src={new_img_upload_obj_url || getProductImage+item.id} className="max-h-36"></img>
        {showOptions &&
        <div style={fade_style} className='absolute rounded-xl w-full h-full' >
            <div className="flex flex-col w-1/3 text-sm">
                <button className={btn_style}>Nhập...</button>
                <button className={btn_style}>Xuất...</button>
                <button onClick={onEditBtnClick} className={btn_style}>Chi tiết</button>
                <button onClick={onInventoryBtnClick} className={btn_style}>Tồn kho</button>
            </div>
        </div>}
    </div>
    <div className="flex h-20 overflow-auto"><div className="text-center self-center text-black">{item.name}</div></div>
    
</div>
)
}

export function Product_View_ViewOnly({item, onSelect, isSelected,}:
    {item:{id:number, name:string}, onSelect?:any, isSelected?:any}) {

    return(
        <div style={{minWidth:"120px"}} className={"flex flex-col justify-start items-center p-3 rounded-2xl h-60 space-y-3"
                        + (onSelect?' hover:bg-sky-300':'')
                        + (isSelected?' ring-8 ring-sky-700 bg-sky-400 hover:bg-sky-400':' bg-slate-300')}
                onClick={()=>onSelect()}>
            <div className="relative grid place-items-center rounded-xl bg-white h-40 w-full p-1">
                <img src={getProductImage+item.id} className="max-h-36"></img>
            </div>
            <div className="flex h-20 overflow-auto"><div className="text-center self-center text-black">{item.name}</div></div>
        </div>
)
}

export function Product_SmallView({item}:
    {item:any}) {
        // (index%2==0?' bg-slate-900 ':' bg-slate-800')
    return(
    <div style={{}} className={"flex flex-row max-w-lg justify-start p-3 space-x-2"}>
            <div className="grid place-items-center w-full space-y-1">
                <img className="w-full" style={{}} src={getProductImage+item.id} alt="Ảnh hàng hóa"/>
                <div className="">{item.name}</div> 
            </div>
    </div>
)
}

export function ProductBatch_View({item, index=0, onSelect, isSelected }:
    {item:any, index?:number, onSelect?:any, isSelected?:boolean}) {

    return(
    <div style={{minWidth:340, maxWidth:600}} className={"relative flex flex-col w-full justify-start items-center py-5 px-3 space-y-5" 
            + (index%2==0?' bg-slate-900 ':' bg-slate-900')
            + (onSelect?' hover:bg-slate-950':'')
            + (isSelected?' ring-8 ring-sky-700 my-2 bg-slate-950':'')}
            onClick={onSelect||undefined}>
        <div className="flex flex-row justify-center space-x-3 h-full w-full">
            <div style={{minWidth:120, maxWidth:240, maxHeight:150}} className="flex justify-center items-center h-full w-1/2 bg-slate-900">
                <img style={{minWidth:120, maxWidth:240, maxHeight:150}} src={getProductImage+(item.ProductId||item.Product.id)} alt="Ảnh hàng hóa"/> 
            </div>
            <div className="flex flex-col justify-start space-y-2 w-1/2">
                <div className="py-2 pr-10 text-xl">{item.Product.name}</div>
                <div className="">Số lượng: {item.ExportProduct?item.ExportProduct.productNumber:item.productNumber} </div>
                <div className="">Hạn sử dụng: {DateDisplay(item.expiryDate)} </div>
            </div>
        </div>
    </div>
    )
}

 // let img2:any;
    // useEffect(()=>{
    //     img2 = fetch('./api/get_product_img/2');
    //     }, [])

    // const breakline_style = {
    //     white-space: pre-wrap;
    // }

    // const img2 = fetch('./api/get_product_img/2')
