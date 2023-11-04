'use client'

// import WidgetsIcon from '@mui/icons-material/Widgets';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';

// import { useState } from 'react';
// import Image from 'next/image'
// import { Input_Option, Input_Text } from '@/app/components/input_field';
// import { postFormData, postFormData_UpdateState } from '@/app/func/form_action';
// import { LoadMore_Button } from '@/app/components/button';
import React, { useRef, useState } from 'react';
import { Product_View_ViewOnly, StorageLocation_View, Image_Text_View1 } from '@/app/components/image_view';
import { Product_View_sm } from '@/app/components/image_view';
import { DateDisplay } from '../func/convert';

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SearchPickerForm_WithView } from './searchform_withview';
import { ProductBatch_Table } from './table';
import { Input_Text } from './input_field';
import { API } from '../api/const';


const getStoreImage=API.store.img;
const getWarehouseImage=API.warehouse.img;

// const style = {
//     position: 'absolute' as 'absolute',
//     width:'70%',
//     height:'90%',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: '#334155ff',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   function ChildModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <React.Fragment>
//         <Button className='text-sky-300' onClick={handleOpen}>Chọn</Button>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="child-modal-title"
//           aria-describedby="child-modal-description"
//         >
//           <Box sx={{ ...style, width: 500 }}>
//             <h2 id="child-modal-title" className='text-center my-2'>Chọn vị trí xuất kho</h2>
//             <p className='grid justify-items-center my-3' id="child-modal-description">
//                 <div>
//                     <div className="mx-1">Số lượng:</div>
//                     <input className="m-1 px-0.5 text-sky-950"></input>
//                     <div className="mt-1 mx-1">Vị trí kho:</div>
//                     <input className="m-1 px-0.5 text-sky-950"></input>
//                 </div>
//             </p>
//             <div className='grid justify-items-center my-1'>
//                 <Button onClick={handleClose} className='self-center'>Thêm</Button>
//             </div>
//           </Box>
//         </Modal>
//       </React.Fragment>
//     );
//   }
//

// const vh80 = {
//     height: '80vh'
// }

// const fade_mystyle = {
//     top:"0%",
//     right:"0%",
//     bot:"0%",
//     left:"0%",
//     width:"100%",
//     height:"100%",
//     backgroundColor:"#000000b3"
//     };

const cell_classname = "py-2 ";

export function StorageLocation_ImageList_View({stateful_items, openForm, onSelectItem, selectItemId}:
                {stateful_items:any, openForm?: any, onSelectItem?:any, selectItemId?:number}){

    console.log(stateful_items)
    return(
        <>
        <div className="grid grid-cols-2 gap-4 w-full">
            {stateful_items?.map((i:any, index:number) => (
                <StorageLocation_View key={i.id||i.StorageLocation.id} item={i} onEditBtnClick={openForm?() => {openForm(i)} : undefined}
                     new_img_upload_obj_url={i.new_img_upload_obj_url} index={index}
                     onSelect={onSelectItem? ()=>onSelectItem(i): undefined} isSelected={((i.id||i.StorageLocation.id)==selectItemId)}/>
            ))}
            {/* <LoadMore_Button endLoad={endLoad} noResult={stateful_items?.length==0} loadmore={() => loadMore()}/> */}
        </div>
        </>
    )
}

export function Warehouse_ImageList_View({stateful_items, openForm, onSelectItem, selectItemId}:
                {stateful_items:any, openForm?: any, onSelectItem?:any, selectItemId?:number}){

    console.log(stateful_items)
    return(
        <>
        <div className="flex flex-col w-full items-center">
            {stateful_items?.map((i:any, index:number) => (
                <Image_Text_View1 key={i.id} item={i} index={index} onEditBtnClick={openForm?() => {openForm(i)} : undefined}
                     View_Image={<img className="max-h-80 h-auto" src={i.new_img_upload_obj_url || getWarehouseImage+i.id} alt="Ảnh kho"/> }
                     View_Text={<><div>Địa chỉ kho: {i.address} </div>
                     <div className="whitespace-pre-wrap	">{i.description} </div>
                     {openForm? <div className="text-slate-400 text-right">{i.new_img_upload_obj_url ? 'Vừa được cập nhật bởi bạn':
                     ('Cập nhật lần cuối lúc '+ DateDisplay(i.updatedAt)+' bởi '+i.User?.fullname)}</div>:<></>}
                    </>}
                     onSelect={onSelectItem? ()=>onSelectItem(i): undefined} isSelected={(i.id==selectItemId)}/>
            ))}
            {/* <LoadMore_Button endLoad={endLoad} noResult={stateful_items?.length==0} loadmore={() => loadMore()}/> */}
        </div>
        </>
    )
}

export function Store_ImageList_View({stateful_items, openForm, onSelectItem, selectItemId}:
                {stateful_items:any, openForm?: any, onSelectItem?:any, selectItemId?:number}){
                    
    console.log(stateful_items)
    return(
        <>
        <div className="flex flex-col w-full items-center">
            {stateful_items?.map((i:any, index:number) => (
                <Image_Text_View1 key={i.id} item={i} index={index} onEditBtnClick={openForm?() => {openForm(i)} : undefined}
                     View_Image={<img className="max-h-80 h-auto" src={i.new_img_upload_obj_url || getStoreImage+i.id} alt="Ảnh cửa hàng"/> }
                     View_Text={<><div>Địa chỉ cửa hàng: {i.address} </div>
                     <div className="whitespace-pre-wrap	">{i.description} </div>
                     {openForm? <div className="text-slate-400 text-right">{i.new_img_upload_obj_url ? 'Vừa được cập nhật bởi bạn':
                     ('Cập nhật lần cuối lúc '+DateDisplay(i.updatedAt)+' bởi '+i.User?.fullname)}</div>:<></>}
                    </>}
                     onSelect={onSelectItem? ()=>onSelectItem(i): undefined} isSelected={(i.id==selectItemId)}/>
            ))}
            {/* <LoadMore_Button endLoad={endLoad} noResult={stateful_items?.length==0} loadmore={() => loadMore()}/> */}
        </div>
        </>
    )
}

export function Product_ImageList_View({stateful_items, openForm, onSelectItem, selectItemId}:
{stateful_items:any, openForm: any, onSelectItem?:any, selectItemId?:number}){

    const item = useRef<any>({});
    const [open, setOpen] = useState(false);
    const handleOpen = (content:any) => {item.current=content; console.log(item.current); setOpen(true); }
    const handleClose = () => setOpen(false);
    
    const modal_style = {
        overflow: 'auto',
        position: 'absolute' as 'absolute',
        width:'70%',
        height:'90%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#334155ff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        };


    return(
        <>
        <div className="grid grid-cols-4 gap-2 bg-slate-500 p-8 rounded-3xl">
            {onSelectItem?<>
            {stateful_items.map((i:any) => (
                <Product_View_ViewOnly key={i.id} item={i} onSelect={onSelectItem? ()=>onSelectItem(i):undefined} isSelected={(i.id==selectItemId)}/>))}
            </>:<>
            {stateful_items.map((i:any) => (
                <Product_View_sm key={i.id} item={i} onEditBtnClick={() => {openForm(i)}}
                onInventoryBtnClick={() => handleOpen(i)}
                new_img_upload_obj_url={i.new_img_upload_obj_url}/>))
            }
            </>}
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modal_style}>
                    <div className='text-center text-3xl my-4'>
                        Tra cứu hàng hóa tồn kho "{item.current.name}"
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                        <SearchPickerForm_WithView objectName="Lô hàng hóa" View={ProductBatch_Table}
                        onPickItem={null}
                        searchInputFields={
                        <>
                            <input type='hidden' value={item.current.id} name='id'></input>
                            <Input_Text label="Kho:" placeholder="(Bất kỳ)" name='WarehouseName'/>
                        </>} initSearchObj={{n:0, id:item.current.id}}
                        load_API={process.env.BE_DOMAIN+"/business/product_batch/load_byProductId"} loadSize={3}/>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}