'use client'

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
import React, { useEffect, useRef } from 'react';
// import { useState } from 'react';
import Image from 'next/image'
import { DateDisplay, DateOnlyDisplay } from '../func/convert';
// import { Input_Option, Input_Text } from '@/app/components/input_field';
// import { postFormData, postFormData_UpdateState } from '@/app/func/form_action';

const categoryName = ['Không xác định', 'Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];
const ImportStatusName = ['Không xác định', 'Chờ duyệt', 'Đã duyệt, chờ nhập kho', 'Đã nhập kho', 'Đã hủy'];
const ExportStatusName = ['Không xác định', 'Chờ duyệt', 'Đã duyệt, chờ xuất kho', 'Đã xuất kho', 'Đã hủy'];
const cell_classname = "py-2 px-2 ";


export function ProductBatch_Table({stateful_items, onSelectItem, selectItemId}:
                {stateful_items:any, onSelectItem:any, selectItemId:number}){

    return(
        <>
          <table style={{minWidth:"300px"}} className="table-fixed w-full">
              <thead>
                  <tr className="bg-slate-300 text-gray-900">
                      {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                      <th className={cell_classname+' w-1/2'}>Kho</th>
                      <th className={cell_classname+' w-1/3'}>HSD</th>
                      <th className={cell_classname+''}>SL tồn</th>
                  </tr>
              </thead>
              <tbody>
                {
                stateful_items.map((item:any, index:number) => (
                  <tr key={item.id} className={"hover:bg-gray-900 text-center" + (index%2!=0 ? " bg-gray-700" : " bg-gray-800")
                       +(item.id==selectItemId ? " bg-gray-900" : "")}
                      onClick={()=>(onSelectItem(Object.assign(item,{name:'Lô hàng ở '+item.Import.Warehouse.name+' | HSD: '+DateOnlyDisplay(item.expiryDate)})))}>
                    <td className={cell_classname+' text-left'}>{item.Import.Warehouse.name}</td>
                    <td className={cell_classname+' text-left'}>{DateDisplay(item.expiryDate)}</td>
                    <td className={cell_classname+' text-left'}>{item.inventory}</td>
                    {/* {viewOnly?<></>: <td className={cell_classname}>
                        <button type='button' onClick={()=>handleRemoveItem(item)}>
                            <Image className='self-center' src='/icon/remove.png' width={32} height={32} alt="Remove"/>
                        </button>
                    </td>} */}
                  </tr>
                ))}
              </tbody>
          </table>
        </>
    )
}

export function ExportDetail_Table({stateful_items, setItem, viewOnly}:
                {stateful_items:any, setItem?:any, viewOnly?:boolean}){

    console.log('exportdetail',stateful_items);
    function handleNumberChange(n:number|string, item:any) {
        const newItem = stateful_items.map((i:any) => {
          if (i === item) {
            i.productNumber=n;
            return i;
          } else {
            return i;
          }
        });
        setItem(newItem);
      }

    function handleRemoveItem(item:any) {
      setItem(
          stateful_items.filter((i: any) => i!==item)
        );
    }

    return(
        <>
          <table style={{minWidth:"300px"}} className="table-fixed w-full">
              <thead>
                  <tr className="bg-slate-300 text-gray-900">
                      {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                      <th className={cell_classname+' w-1/3'}>Kho</th>
                      <th className={cell_classname+' w-1/3'}>HSD</th>
                      <th className={cell_classname+''}>SL tồn</th>
                      <th className={cell_classname+''}>SL xuất</th>
                      {viewOnly?<></>: <th className={cell_classname+' w-1/12'}></th>}
                  </tr>
              </thead>
              <tbody>
                {
                stateful_items.map((item:any, index:number) => (
                  <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-800") + " text-center"}>
                    <td className={cell_classname+' text-left'}>{item.Import.Warehouse.name}</td>
                    <td className={cell_classname+' text-left'}>{DateDisplay(item.expiryDate)}</td>
                    <td className={cell_classname+' text-left'}>{item.inventory}</td>
                    <td className={cell_classname}><input style={{minWidth:20, maxWidth:80}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.productNumber} name='' type='number' min={1} step={1} max={item.inventory}
                       onChange={(e)=>(handleNumberChange(e.target.value,item))} readOnly={viewOnly}/></td>
                    {/* <td className={cell_classname}><input style={{minWidth:60, maxWidth:240}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.description} name="" onChange={(e)=>(handleDescriptionChange(e.target.value,item))} readOnly={viewOnly}/></td> */}
                    {viewOnly?<></>: <td className={cell_classname}>
                        <button type='button' onClick={()=>handleRemoveItem(item)}>
                            <Image className='self-center' src='/icon/remove.png' width={32} height={32} alt="Remove"/>
                        </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
          </table>
        </>
    )
}

export function ImportDetail_Table({stateful_items, setItem, viewOnly}:
                {stateful_items:any, setItem?:any, viewOnly?:boolean}){

    const current_date = new Date(Date.now()).toISOString().slice(0,-8);

    function handleNumberChange(n:number|string, item:any) {
        const newItem = stateful_items.map((i:any) => {
          if (i === item) {
            i.productNumber=n;
            return i;
          } else {
            return i;
          }
        });
        setItem(newItem);
      }
    
      function handleExpiryDateChange(ed:string, item:any) {
        const newItem = stateful_items.map((i:any) => {
          if (i === item) {
            i.expiryDate=ed;
            return i;
          } else {
            return i;
          }
        });
        setItem(newItem);
      }

      function handleRemoveItem(item:any) {
        setItem(
            stateful_items.filter((i: any) => i!==item)
          );
      }

    return(
        <>
          <table style={{minWidth:"480px"}} className="table-fixed w-full">
              <thead>
                  <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                      {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                      <th className={cell_classname+' w-1/12'}>STT</th>
                      <th className={cell_classname}>Tên hàng hóa</th>
                      <th className={cell_classname+' w-1/6'}>Số lượng</th>
                      <th className={cell_classname+' w-1/4'}>Hạn sử dụng</th>
                      {viewOnly?<></>: <th className={cell_classname+' w-1/12'}></th>}
                  </tr>
              </thead>
              <tbody>
                {
                stateful_items.map((item:{id:number, Product:{id:number, name:string}, productNumber:string, expiryDate:string}, index:number) => (
                  <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
                    {/* <td className={cell_classname}>{item.email}</td> */}
                    
                    <td className={cell_classname}>{index+1}</td>
                    <td className={cell_classname+' text-left'}>{item.Product.name}</td>
                    <td className={cell_classname}><input style={{minWidth:50, maxWidth:120}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.productNumber} name='' type='number' min={1} step={1} onChange={(e)=>(handleNumberChange(e.target.value,item))} readOnly={viewOnly}/></td>
                    <td className={cell_classname}><input style={{minWidth:124, maxWidth:220}} className='mx-2 px-1 text-slate-900 w-full'
                                        type="datetime-local" id="" name="" value={item.expiryDate.slice(0,16)} min={current_date} max=""
                                        onChange={(e)=>(handleExpiryDateChange(e.target.value,item))} readOnly={viewOnly}/></td>
                    {viewOnly?<></>: <td className={cell_classname}>
                        <button type='button' onClick={()=>handleRemoveItem(item)}>
                            <Image className='self-center' src='/icon/remove.png' width={32} height={32} alt="Remove"/>
                        </button>
                    </td>}
                    {/* <td className={cell_classname}>{item.idstt=="2" ?
                        <button className='text-sky-300' onClick={() => {handleOpen(item.pblist), setIsPend(true)}}>Duyệt</button>
                        :<button onClick={() => {handleOpen(item.pblist), setIsPend(false)}}>
                            <Image className='self-center' src='/icon/read_more.png' width={32} height={32} alt="Detail"/>
                        </button>}
                      </td> */}
                  </tr>
                )
                )
                }
              </tbody>
          </table>
        </>
    )
}

export function StorageLocationDetail_Table({stateful_items, setItem, viewOnly}:
                {stateful_items:any, setItem?:any, viewOnly?:boolean}){

    console.log('table sld',stateful_items);
    function handleNumberChange(n:number|string, item:any) {
        const newItem = stateful_items.map((i:any) => {
          if (i === item) {
            i.productNumber=n;
            return i;
          } else {
            return i;
          }
        });
        setItem(newItem);
      }
    
      // function handleDescriptionChange(d:string, item:any) {
      //   const newItem = stateful_items.map((i:any) => {
      //     if (i === item) {
      //       i.description=d;
      //       return i;
      //     } else {
      //       return i;
      //     }
      //   });
      //   setItem(newItem);
      // }

      function handleRemoveItem(item:any) {
        setItem(
            stateful_items.filter((i: any) => i!==item)
          );
      }

    return(
        <>
          <table style={{minWidth:"300px"}} className="table-fixed w-full">
              <thead>
                  <tr className="bg-slate-300 text-gray-900">
                      {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                      <th className={cell_classname+' w-2/3'}>Vị trí lưu trữ</th>
                      <th className={cell_classname+''}>Số lượng</th>
                      {viewOnly?<></>: <th className={cell_classname+' w-1/12'}></th>}
                  </tr>
              </thead>
              <tbody>
                {
                stateful_items.map((item:{id:number, StorageLocation:{id:number, name:string}, productNumber:string, description:string}, index:number) => (
                  <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-800") + " text-center"}>
                    <td className={cell_classname+' text-left'}>{item.StorageLocation.name}</td>
                    <td className={cell_classname}><input style={{minWidth:20, maxWidth:80}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.productNumber} name='' type='number' min={1} step={1} onChange={(e)=>(handleNumberChange(e.target.value,item))} readOnly={viewOnly}/></td>
                    {/* <td className={cell_classname}><input style={{minWidth:60, maxWidth:240}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.description} name="" onChange={(e)=>(handleDescriptionChange(e.target.value,item))} readOnly={viewOnly}/></td> */}
                    {viewOnly?<></>: <td className={cell_classname}>
                        <button type='button' onClick={()=>handleRemoveItem(item)}>
                            <Image className='self-center' src='/icon/remove.png' width={32} height={32} alt="Remove"/>
                        </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
          </table>
        </>
    )
}

export function Import_Table({stateful_items, openForm}:
  {stateful_items:any, openForm: any}){

  return(
  <>
    <div style={{minWidth:"480px"}} className='flex flex-col justify-center w-full'>
    <table className="table-fixed w-full">
      <thead>
        <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
            {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
            <th className={cell_classname+' w-1/5'}>Ngày lập</th>
            <th className={cell_classname+' w-1/5'}>Người lập</th>
            <th className={cell_classname+' w-1/6'}>Trạng thái</th>
            <th className={cell_classname}>Ghi chú</th>
            <th className={cell_classname+' w-1/12'}></th>
        </tr>
      </thead>
      <tbody>
        {stateful_items.map((item:any, index:number) => (
          <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-900") + ""}>
            {/* <td className={cell_classname}>{item.email}</td> */}
            
            <td className={cell_classname}>{DateDisplay(item.createdAt)}</td>
            <td className={cell_classname}>{item.createdUser.fullName}</td>
            <td className={cell_classname}>{ImportStatusName[item.StatusId]}</td>
            <td className={cell_classname}>{item.note}</td>
            <td className={cell_classname}>
                <button onClick={() =>{openForm(item); console.log(item)} }>
                    <Image className='self-center' src='/icon/more.png' width={32} height={32} alt="Detail"/>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  </>
)
}

export function Export_StorageLocation_Table({stateful_items, setItem, viewOnly}:
                {stateful_items:any, setItem?:any, viewOnly?:boolean}){

    console.log('table export sl',stateful_items);

    function handleNumberChange(n:number|string, item:any) {
        const newItem = stateful_items.map((i:any) => {
          if (i === item) {
            i.exportNumber=n;
            return i;
          } else {
            return i;
          }
        });
        setItem(newItem);
      }

      function handleRemoveItem(item:any) {
        setItem(
            stateful_items.filter((i: any) => i!==item)
          );
      }

    return(
        <>
          <table style={{minWidth:"300px"}} className="table-fixed w-full">
              <thead>
                  <tr className="bg-slate-300 text-gray-900">
                      {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                      <th className={cell_classname+''}>Vị trí lưu trữ</th>
                      <th className={cell_classname+' w-1/6'}>Số lượng tồn</th>
                      <th className={cell_classname+' w-1/6'}>Số lượng xuất</th>
                      {viewOnly?<></>: <th className={cell_classname+' w-1/12'}></th>}
                  </tr>
              </thead>
              <tbody>
                {
                stateful_items.map((item:any, index:number) => (
                  <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-800") + " text-center"}>
                    <td className={cell_classname+' text-left'}>{item.StorageLocation.name}</td>
                    <td className={cell_classname}>{item.inventoryNumber}</td>
                    <td className={cell_classname}><input style={{minWidth:20, maxWidth:80}} className='mx-2 px-1 text-slate-900 w-4/5'
                      value={item.exportNumber} name='' type='number' min={1} max={item.inventoryNumber} step={1} onChange={(e)=>(handleNumberChange(e.target.value,item))} readOnly={viewOnly}/></td>
                    {/* <td className={cell_classname}><input style={{minWidth:60, maxWidth:240}} className='mx-2 px-1 text-slate-900 w-full'
                      value={item.description} name="" onChange={(e)=>(handleDescriptionChange(e.target.value,item))} readOnly={viewOnly}/></td> */}
                    {viewOnly?<></>: <td className={cell_classname}>
                        <button type='button' onClick={()=>handleRemoveItem(item)}>
                            <Image className='self-center' src='/icon/remove.png' width={32} height={32} alt="Remove"/>
                        </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
          </table>
        </>
    )
}

export function Export_Table({stateful_items, openForm}:
  {stateful_items:any, openForm: any}){

  return(
  <>
    <div style={{minWidth:"480px"}} className='flex flex-col justify-center w-full'>
    <table className="table-fixed w-full">
      <thead>
        <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
            {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
            <th className={cell_classname+' w-1/5'}>Ngày lập</th>
            <th className={cell_classname+' w-1/5'}>Người lập</th>
            <th className={cell_classname+' w-1/6'}>Trạng thái</th>
            <th className={cell_classname}>Ghi chú</th>
            <th className={cell_classname+' w-1/12'}></th>
        </tr>
      </thead>
      <tbody>
        {stateful_items.map((item:any, index:number) => (
          <tr key={item.id} className={(index%2!=0 ? "bg-gray-800" : "bg-gray-900") + ""}>
            {/* <td className={cell_classname}>{item.email}</td> */}
            <td className={cell_classname}>{DateDisplay(item.createdAt)}</td>
            <td className={cell_classname}>{item.createdUser.fullName}</td>
            <td className={cell_classname}>{ExportStatusName[item.StatusId]}</td>
            <td className={cell_classname}>{item.note}</td>
            <td className={cell_classname}>
                <button onClick={() =>{openForm(item); console.log(item)} }>
                    <Image className='self-center' src='/icon/more.png' width={32} height={32} alt="Detail"/>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  </>
)
}

export function Tag_Table({stateful_items, openForm}:
                {stateful_items:any, openForm: any}){
    // let categoryArray = useRef([]);
    // useEffect(()=>{
    //     // console.log(loadSize);
    // }, [])
    // const loadCategoryArray = async() => {
    //     const res = await fetch('http://localhost:8080/business/product_tag/category/load', 
    //     { method: 'GET', headers: {'Content-Type': 'application/json'} });
    //     if (!res.ok) {
    //         // This will activate the closest `error.js` Error Boundary
    //         throw new Error('Failed to fetch data')
    //       }
    //     else{
    //         let data = await res.json();
    //         console.log(data);
    //         categoryArray.current=data;
    //     }
    // }
    
    return(
        <>
        <div style={{minWidth:"480px"}} className='flex flex-col justify-center w-full'>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                        {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                        <th className={cell_classname+' w-1/5'}>Loại nhãn</th>
                        <th className={cell_classname+' w-1/5'}>Tên nhãn</th>
                        <th className={cell_classname}>Mô tả</th>
                        <th className={cell_classname+' w-1/12'}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stateful_items.map((item:{id:number, name:string, description:string, CategoryId:number}, index:number) => (
                            <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
                                {/* <td className={cell_classname}>{item.email}</td> */}
                                
                                <td className={cell_classname}>{categoryName[item.CategoryId]}</td>
                                <td className={cell_classname}>{item.name}</td>
                                <td className={cell_classname}>{item.description}</td>
                                <td className={cell_classname}>
                                    <button onClick={() => openForm(item)}>
                                        <Image className='self-center' src='/icon/settings.png' width={32} height={32} alt="Detail"/>
                                    </button>
                                </td>
                                {/* <td className={cell_classname}>{item.idstt=="2" ?
                                    <button className='text-sky-300' onClick={() => {handleOpen(item.pblist), setIsPend(true)}}>Duyệt</button>
                                    :<button onClick={() => {handleOpen(item.pblist), setIsPend(false)}}>
                                        <Image className='self-center' src='/icon/read_more.png' width={32} height={32} alt="Detail"/>
                                    </button>}
                                </td> */}
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
        
        </>
    )
}

export function ProductPrice_Table({stateful_items}:
                {stateful_items:any}){
    
    return(
        <>
        <div style={{minWidth:"480px"}} className='flex flex-col justify-center w-full'>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                        {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                        <th className={cell_classname+''}>Giá hàng hóa</th>
                        <th className={cell_classname+''}>Ngày thay đổi</th>
                        {/* <th className={cell_classname}>Mô tả</th>
                        <th className={cell_classname+' w-1/12'}></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        stateful_items.map((item:any, index:number) => (
                            <tr key={item.id} className={(index%2!=0 ? "bg-gray-800" : "bg-gray-900") + " text-center"}>
                                {/* <td className={cell_classname}>{item.email}</td> */}
                                
                                <td className={cell_classname}>{item.price}</td>
                                <td className={cell_classname}>{DateDisplay(item.createdAt)}</td>
                                {/* <td className={cell_classname}>{item.description}</td>
                                <td className={cell_classname}>
                                    <button onClick={() => openForm(item)}>
                                        <Image className='self-center' src='/icon/settings.png' width={32} height={32} alt="Detail"/>
                                    </button>
                                </td> */}
                                {/* <td className={cell_classname}>{item.idstt=="2" ?
                                    <button className='text-sky-300' onClick={() => {handleOpen(item.pblist), setIsPend(true)}}>Duyệt</button>
                                    :<button onClick={() => {handleOpen(item.pblist), setIsPend(false)}}>
                                        <Image className='self-center' src='/icon/read_more.png' width={32} height={32} alt="Detail"/>
                                    </button>}
                                </td> */}
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
        
        </>
    )
}

export function InventoryReport_Table({stateful_items}:{stateful_items:any}){
    return(
      <>
        <div style={{minWidth:"480px"}} className='my-2 flex flex-col justify-center w-2/3'>
          <table className="table-fixed w-full">
            <thead>
              <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                <th className={cell_classname+''}>Hàng hóa</th>
                <th className={cell_classname+' w-1/6'}>Số lượng tồn</th>
                <th className={cell_classname+' w-1/4'}>Tổng giá trị</th>
              </tr>
            </thead>
            <tbody>
            {stateful_items.map((item:any, index:number) => (
              <tr key={item.id} className={(index%2!=0 ? "bg-gray-800" : "bg-gray-900") + " text-center"}>
                <td className={cell_classname+' text-left'}>{item.Product.name}</td>
                <td className={cell_classname}>{item.totalInventory}</td>
                <td className={cell_classname}>{numberWithSpaces(item.totalInventory*item.price)}</td>
              </tr>))}
            </tbody>
          </table>
        </div> 
      </>
    )
}

export function ExpiryDateReport_Table({stateful_items}:{stateful_items:any}){
    return(
      <>
        <div  className='my-2 flex flex-col items-center w-full'>
          <table style={{minWidth:"480px",maxWidth:"800px"}} className="table-fixed w-full">
            <thead>
              <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                <th className={cell_classname+' w-1/4'}>Khoảng thời gian hết hạn</th>
                <th className={cell_classname+''}>Hàng hóa</th>
                <th className={cell_classname+' w-1/6'}>Số lượng tồn</th>
                <th className={cell_classname+' w-1/5'}>Tổng giá trị</th>
              </tr>
            </thead>
            <tbody>
            {stateful_items.map((item:any, index:number) => (<>
              
                {item.info.map((i:any, idx:number) => (
                // <tr key={idx} className={(index%2!=0 ? "bg-gray-900" : "bg-gray-950")}></tr>
                <>
                <tr key={index} className={(idx%2!=0 ? "bg-gray-800" : "bg-gray-700") + " text-center"}
                      style={(item.info.length-idx==1)?{borderBottom:'thick double lightskyblue'}:{}}>
                {(idx==0)? <td className={cell_classname+(index%2!=0 ? "bg-gray-900" : "bg-gray-950")+' border border-slate-500'}
                      rowSpan={item.info.length}>
                      {DateOnlyDisplay(item.startDate)+'-'+DateOnlyDisplay(item.endDate)}</td>:<></>}
                  <td className={cell_classname+' text-left'}>{i.Product.name}</td>
                  <td className={cell_classname}>{i.totalInventory}</td>
                  <td className={cell_classname}>{numberWithSpaces(i.totalInventory*i.price)}</td>
                </tr></>))}
                  </>))}
            </tbody>
          </table>
        </div> 
      </>
    )
}

function numberWithSpaces(x:Number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}