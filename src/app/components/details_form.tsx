import { useEffect, useState } from "react";
import { DateDisplay } from "../func/convert";
import { Store_SmallView, Warehouse_SmallView } from "./image_view";
// import { ImportDetail_Table, StorageLocationDetail_Table } from "./table";
import Button from "@mui/material/Button";
import { ExportProductLocations_Form, ImportProductLocations_Form } from "./input_form";
import { postFormData } from "../func/form_action";
//import { getCookies } from "../func/cookies";
// import { cookies } from "next/headers";

const categoryName = ['Không xác định', 'Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];
const ImportStatusName = ['Không xác định', 'Chờ duyệt', 'Đã duyệt, chờ nhập kho', 'Đã nhập kho', 'Đã hủy'];
const cell_classname = "py-2 ";

export function ImportDetails_Form({item}:{item:any}){

  const [importProducts,setImportProducts] = useState([]);
  const [editable, setEditable] = useState(false);
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(0);

    useEffect(()=>{
        load();
        console.log(item);
        fetch('http://localhost:8080/role/get',{credentials:"include"}).then((v)=>v.json()).then((v)=>{
          setRole(v.role);
          setStatus(item.StatusId);})        
    }, [])

    console.log(item);

    const load = async () => {
      console.log("load detail")
      const res = await fetch('http://localhost:8080/warehouse_keeper/import/detail/load?id='+item.id , 
      { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
      if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
      else{
          let data = await res.json();
          console.log(data);
          setImportProducts(data);
      }
  }

    const handleApprove_Refuse = async (Approve:boolean) => {
      console.log("approve/refuse")
      const c_uid = sessionStorage.getItem('UserId')||'';
      console.log('userid from cookie:', c_uid)
      let reqbody:any={};
      reqbody.id = item.id;
      if(Approve)
      {
        reqbody.StatusId=2;
        setStatus(2);
        reqbody.approvedBy=c_uid; // userID
      }
      else {
        reqbody.StatusId=4;
        setStatus(4);
        //reqbody.note=item.note;
      }
      const res = await fetch('http://localhost:8080/warehouse_keeper/import/update', 
      { method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json'}, credentials: "include"  });
      if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
      else{
          let data = await res.json();
          alert(data.msg);
          location.reload();
      }
    }
  
    const c_uid = sessionStorage.getItem('UserId')||'';
  console.log('userid from cookie:', c_uid)

    return(
      <>
    {item? 
        <div className="flex flex-col w-full items-center space-y-4">
           
          <Import_InfoView item={item}/>
          {(status==2&&role==2)?
            <div className="text-2xl">Nhập kho</div>
          :<></>}
          <ImportProductLocations_Form importProducts={importProducts} viewOnly={(status!=2||role!=2)} onSubmit={(e:any,list:[]) => 
                            {postFormData(e,'http://localhost:8080/warehouse_keeper/import/update',list); setStatus(3);}}/>
          <input form='ImportProductLocations_Form' name='id' value={item.id} type='hidden'/>
          <input form='ImportProductLocations_Form' name='StatusId' value={3} type='hidden'/>
          
          {(status==1&&role==3)?<div className="flex flex-row space-x-4 justify-center">
            <button type='button' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(false)}>Hủy phiếu nhập</button>
            </div>
          :<></>}
          {(status==1&&role==2)?<div className="flex flex-row space-x-4 justify-center">
            <button type="button" className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(true)}>Duyệt phiếu nhập</button>
            <button type='button' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(false)}>Hủy phiếu nhập</button>
            </div>
          :<></>}
          {(status==2&&role==2)?<>
            <button form='ImportProductLocations_Form' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
                 onClick={()=>setEditable(!editable)}>Nhập kho</button>
            </>
          :<></>}
          
      </div> 
    :<></>}
    </>
  )
}

export function Import_InfoView({item}:{item:any}){
  return(
    <div className="flex flex-col w-2/3 bg-slate-800 my-2 p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4 ">
        <div>Người lập: {item.createdUser.fullName}</div>
        <div>Ngày lập: {DateDisplay(item.createdAt)}</div>
        <div>Người duyệt: {item.approvedUser?.fullName}</div>
        <div>Ngày nhập kho: {DateDisplay(item.importDate)}</div>
        <div>Trạng thái: {ImportStatusName[item.StatusId]} </div>
      </div>
      <div>Ghi chú: {item.note}</div>
      <div className="mb-0.5">Nơi nhập:</div>
      <div className="self-center"><Warehouse_SmallView index={2} item={item.Warehouse}/></div>
    </div>
  )
}

export function ExportDetails_Form({item}:{item:any}){

  const [exportProducts,setExportProducts] = useState([]);
  const [editable, setEditable] = useState(false);
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(0);

    useEffect(()=>{
        load();
        console.log(item);
        fetch('http://localhost:8080/role/get',{credentials:"include"}).then((v)=>v.json()).then((v)=>{
          setRole(v.role);
            setStatus(item.StatusId);})     
    }, [])

    console.log(item);

    const load = async () => {
      console.log("load detail")
      const res = await fetch('http://localhost:8080/warehouse_keeper/export/detail/load?id='+item.id , 
      { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
      if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
      else{
          let data = await res.json();
          console.log(data);
          setExportProducts(data.map((v:any)=>{v.productNumber=v.ExportProducts[0].productNumber; return v;}));
      }
  }

    const handleApprove_Refuse = async (Approve:boolean) => {
      console.log("approve/refuse")
      const c_uid = sessionStorage.getItem('UserId')||'';
      console.log('userid from cookie:', c_uid)
      let reqbody:any={};
      reqbody.id = item.id;
      if(Approve)
      {
        reqbody.StatusId=2;
        setStatus(2);
        reqbody.approvedBy=c_uid; // userID
      }
      else {
        reqbody.StatusId=4;
        setStatus(4);
        reqbody.note=item.note;
      }
      const res = await fetch('http://localhost:8080/warehouse_keeper/export/update', 
      { method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json'}, credentials: "include"  });
      if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
      else{
          let data = await res.json();
          alert(data.msg);
          location.reload();
      }
    }
  
    return(
      <>
    {item? 
        <div className="flex flex-col w-full items-center space-y-4">
           
          <Export_InfoView item={item}/>
          {(status==2&&role==2)?
            <div className="text-2xl">Xuất kho</div>
          :<></>}
          <ExportProductLocations_Form exportProducts={exportProducts} viewOnly={(status!=2||role!=2)} onSubmit={(e:any,list:[]) => 
                            {postFormData(e,'http://localhost:8080/warehouse_keeper/export/update',list); setStatus(3);}}/>
          <input form='ExportProductLocations_Form' name='id' value={item.id} type='hidden'/>
          <input form='ExportProductLocations_Form' name='StatusId' value={3} type='hidden'/>
          
          {(status==1&&role==3)?<div className="flex flex-row space-x-4 justify-center">
            <button type='button' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(false)}>Hủy phiếu xuất</button>
            </div>
          :<></>}
          {(status==1&&role==2)?<div className="flex flex-row space-x-4 justify-center">
            <button type="button" className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(true)}>Duyệt phiếu xuất</button>
            <button type='button' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
            onClick={()=>handleApprove_Refuse(false)}>Hủy phiếu xuất</button>
            </div>
          :<></>}
          {(status==2&&role==2)?<>
            <button form='ExportProductLocations_Form' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
                 onClick={()=>setEditable(!editable)}>Xuất kho</button>
            <button type='button' className='bg-sky-300 hover:bg-sky-400 text-black m-2 py-2 px-4 rounded'
                onClick={()=>handleApprove_Refuse(false)}>Hủy phiếu xuất</button>
            </>
          :<></>}
          
      </div> 
    :<></>}
    </>
  )
}

export function Export_InfoView({item}:{item:any}){
  return(
    <div className="flex flex-col w-2/3 bg-slate-800 my-2 p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4 ">
        <div>Người lập: {item.createdUser.fullName}</div>
        <div>Ngày lập: {DateDisplay(item.createdAt)}</div>
        <div>Người duyệt: {item.approvedUser?.fullName}</div>
        <div>Ngày xuất kho: {DateDisplay(item.importDate)}</div>
        <div>Trạng thái: {ImportStatusName[item.StatusId]} </div>
      </div>
      <div>Ghi chú: {item.note}</div>
      <div className="mb-0.5">Nơi xuất:</div>
      <div className="self-center"><Warehouse_SmallView index={2} item={item.Warehouse}/></div>
      <div className="mb-0.5">Nơi nhập:</div>
      <div className="self-center"><Store_SmallView index={2} item={item.Store}/></div>
    </div>
  )
}