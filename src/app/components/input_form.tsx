'use client'

import { Input_Image, Input_ListOption_QuickSearch, Input_Option, Input_Option_QuickSearch, Input_Text, Input_TextArea } from "@/app/components/input_field"
import { postFormData } from "@/app/func/form_action"
import { WarehouseKeeper_DisplayText, WarehouseKeeper_ItemView } from "./item_view"
import { SearchPickerForm_WithView } from "@/app/components/searchform_withview";
import { Input_OptionPicker_WithView } from "@/app/components/input_field";
import { useEffect, useRef, useState } from "react";
import { ProductBatch_View, Warehouse_SmallView, Image_Text_View1, Store_SmallView, Product_SmallView } from "@/app/components/image_view";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ExportDetail_Table, Export_StorageLocation_Table, ImportDetail_Table, ProductBatch_Table, StorageLocationDetail_Table } from "@/app/components/table";
import { Product_ImageList_View, StorageLocation_ImageList_View, Store_ImageList_View, Warehouse_ImageList_View } from "@/app/components/imagelist_view";
import { Import_InfoView } from "./details_form";

const getWarehouseImage='http://localhost:8080/admin/warehouse/img/'
const getStoreImage='http://localhost:8080/admin/store/img/'
const getStorageLocationImage='http://localhost:8080/warehouse_keeper/storage_location/img/'

export function LoginForm() {

  const handleLogin = async (event:any) => {
    console.log("Login & receive msg...")
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let res:any;
    let formJson:any;
    formJson = Object.fromEntries(formData.entries());

    res = await fetch('./login', 
    { method: 'POST', body: JSON.stringify(formJson), headers: {'Content-Type': 'application/json'} });
    const d = await res.json();
    if(d.fullName)
      { sessionStorage.setItem("fullName", d.fullName);
        sessionStorage.setItem("UserId", d.UserId);
        if(d.WarehouseId)
          sessionStorage.setItem("WarehouseId", d.WarehouseId);}
    console.log(d);
    alert(d.msg);
    location.reload();
  }

  return(
    <form className='flex flex-col items-center' onSubmit={(e)=>handleLogin(e)}>
        <Input_Text label='Tài khoản:' placeholder='Nhập tên tài khoản' name='id'/>
        <Input_Text label='Mật khẩu:' placeholder='Nhập mật khẩu' name='password' type='password'/>
        <button className='bg-sky-300 hover:bg-sky-400 text-black mx-2 my-8 py-2 px-4 rounded'>Đăng nhập </button>
      </form>
  )
}

export function InputForm_Warehouse({init_value, button_title, isUpdateForm, onSubmit}:
                        {init_value?:any,button_title:string,isUpdateForm:boolean, onSubmit:any}) {

    const API = isUpdateForm ? 'http://localhost:8080/admin/warehouse/update' : 'http://localhost:8080/admin/warehouse/create'
    const method = isUpdateForm ? 'POST' : 'POST' //upload thing, post should be use
    const c_uid = sessionStorage.getItem('UserId')||'';
    console.log('userid from cookie:', c_uid);

    return(
        <form className="flex flex-col items-center" action="" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <input name='modifiedBy' value={c_uid} type='hidden'/>
            <input name='id' value={init_value?.id} type='hidden'/>
            <div className="flex justify-center space-x-8">
              <div className="my-4 w-1/2">
                <Input_Text label="Tên kho:" placeholder="Nhập tên kho..." name='name' init_value={init_value?.name}/>
                <Input_Text label="Địa chỉ kho:" placeholder="Địa chỉ kho..." name='address' init_value={init_value?.address}/>
                <Input_ListOption_QuickSearch objectName="Thủ kho" inputName="keepers" placeholder="Thêm thủ kho..."
                         init_value={init_value?.id} 
                         load_API="http://localhost:8080/admin/warehouse_keeper/load_available"
                         loadbyID_API="http://localhost:8080/admin/warehouse_keeper/load"
                         SelectedItemView={WarehouseKeeper_ItemView}
                         ResultText={WarehouseKeeper_DisplayText}/>
              </div>
              <div className="my-4 w-1/2">
                <Input_Image label="Ảnh kho" placeholder="Chọn ảnh kho..." name='image' init_value={init_value?.id? getWarehouseImage+init_value.id:''}/>
              </div>
            </div>
            <Input_TextArea label="Mô tả kho:" placeholder="Mô tả kho..." name='description' init_value={init_value?.description}/>
            <div className="flex justify-center	">
              <button type='submit' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
            </div>
          </form>
    )
}

export function InputForm_Store({init_value, button_title, isUpdateForm, onSubmit}:
                        {init_value?:any,button_title:string,isUpdateForm:boolean, onSubmit:any}) {

    // const API = isUpdateForm ? 'http://localhost:8080/admin/warehouse/update' : 'http://localhost:8080/admin/warehouse/create'
    // const method = isUpdateForm ? 'POST' : 'POST' //upload thing, post should be use
    const c_uid = sessionStorage.getItem('UserId')||'';
    console.log('userid from cookie:', c_uid)

    return(
        <form className="flex flex-col items-center" action="" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <input name='modifiedBy' value={c_uid} type='hidden'/>
            <input name='id' value={init_value?.id} type='hidden'/>
            <div className="flex justify-center space-x-8">
              <div className="my-4 w-1/2">
                <Input_Text label="Tên cửa hàng:" placeholder="Nhập tên cửa hàng..." name='name' init_value={init_value?.name}/>
                <Input_Text label="Địa chỉ cửa hàng:" placeholder="Địa chỉ cửa hàng..." name='address' init_value={init_value?.address}/>
              </div>
              <div className="my-4 w-1/2">
                <Input_Image label="Ảnh cửa hàng" placeholder="Chọn ảnh cửa hàng..." name='image' init_value={init_value?.id? getStoreImage+init_value.id:''}/>
              </div>
            </div>
            <Input_TextArea label="Mô tả cửa hàng:" placeholder="Mô tả cửa hàng..." name='description' init_value={init_value?.description}/>
            <div className="flex justify-center	">
              <button type='submit' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
            </div>
          </form>
    )
}

export function Form_StorageLocation({init_value, button_title, onSubmit}:{init_value?:any,button_title:string, onSubmit:any}) {

  const [importProducts,setImportProducts] = useState<any[]>([]);
  
  useEffect(()=>{
      if(init_value)
        load();        
    }, [])
                    
   const load = async () => {
      console.log("load detail")
      const res = await fetch('http://localhost:8080/warehouse_keeper/storage_location/product/load?id='+init_value.id , 
      { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
      if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
      else{
          const data = await res.json();
          console.log(data);
          let list:any[]=[];
          for(let d of data)
          {
            d.ImportProduct.productNumber = d.inventoryNumber;
            list.push(d.ImportProduct);
          }
          console.log(list);
          setImportProducts(list);
      }
  }

  const c_uid = sessionStorage.getItem('UserId')||'';
  console.log('userid from cookie:', c_uid)
  const c_wid = sessionStorage.getItem('WarehouseId')||'';
  console.log('warehouseid from cookie:', c_wid)

    return(<>
        <form className="flex flex-col items-center" action="" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <input name='modifiedBy' value={c_uid} type='hidden'/>
            <input name='WarehouseId' value={c_wid} type='hidden'/>
            <input name='id' value={init_value?.id} type='hidden'/>
            <div className="flex justify-center space-x-8">
              <div className="my-4 w-1/2">
                <Input_Text label="Tên vị trí:" placeholder="Nhập tên vị trí..." name='name' init_value={init_value?.name}/>
                <Input_TextArea label="Mô tả vị trí:" placeholder="Mô tả vị trí..." name='description' init_value={init_value?.description}/>
              </div>
              <div className="my-4 w-1/2">
                <Input_Image label="Ảnh vị trí" placeholder="Chọn ảnh vị trí..." name='image' init_value={init_value?.id? getStorageLocationImage+init_value.id:''}/>
              </div>
            </div>
            <div className="flex justify-center	">
              <button type='submit' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
            </div>
          </form>
          {init_value?<>
          <div className="text-2xl text-center py-6">Danh sách hàng hóa lưu trữ</div>
          <ImportProductLocations_Form importProducts={importProducts} viewOnly={true}/></>
          :<></>
          }
        </>
    )
}

export function Import_Form({init_value, button_title, onSubmit}:{init_value?:any,button_title:string, onSubmit:any}) {
    
    const [warehouse, setWarehouse] = useState<any>(init_value?.Warehouse||undefined);
    const [products, setProducts] = useState<any[]>(init_value?.ProductBatches||[]);
    const [open, setOpen] = useState(false);
    const [modalNum, setModalNum] = useState(0);
    // const [productNumber, setProductNumber] = useState(0);
    // const [expiryDate, setExpiryDate] = useState('');

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
        boxShadow: 24
      };
    
    function handlePickItem(item:any) {
      let new_product:any={};
      new_product.Product = {};
      new_product.Product.id = item.id;
      new_product.Product.name = item.name;
      new_product.ProductId = item.id; //Send to back-end for fast create;
      new_product.productNumber = 1;
      new_product.expiryDate = new Date(Date.now()+1000*60*60*24*365).toISOString().slice(0,-8);
      setProducts([...products, new_product]);
      setOpen(false);
    }

    const c_uid = sessionStorage.getItem('UserId')||'';
    console.log('userid from cookie:', c_uid)

    return(
        <>
        <form className='flex flex-col items-center' action="" method="" id='Import_Form' onSubmit={(e)=>onSubmit(e,products)}>
            <input name='id' value={init_value?.id} type='hidden'/>
            <input name='createdBy' value={c_uid} type='hidden'/>
            <div className="flex flex-row justify-center space-x-8 mt-4 w-full">
            </div>
            <Input_OptionPicker_WithView objectName="Kho" inputName="WarehouseId" openPicker={()=>{setOpen(true); setModalNum(1);}}
             displayedItem={ warehouse?.id?<Warehouse_SmallView index={1} item={warehouse}/> : <></>} value={warehouse?.id} />

             <Input_OptionPicker_WithView objectName="Hàng hóa" inputName="products" openPicker={()=>{setOpen(true); setModalNum(2);}}
             displayedItem={ <ImportDetail_Table stateful_items={products} setItem={setProducts}/>} listItem={true} />

            <Input_TextArea label="Ghi chú:" placeholder="Ghi chú (nếu có)..." name='note' init_value={init_value?.note}/>
  
            <button type='submit' form='Import_Form' className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
        </form>
        <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={modal_style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                    { modalNum==1 ?
                    <SearchPickerForm_WithView objectName="Kho" View={Warehouse_ImageList_View}
                     onPickItem={(i: any)=>{setWarehouse(i); setOpen(false);}}
                    searchInputFields={
                    <>
                        <Input_Text label="Tên kho:" placeholder="(Bất kỳ)" name='name'/>
                        <Input_Text label="Địa chỉ kho:" placeholder="(Bất kỳ)" name='address'/>
                        <Input_Text label="Mô tả kho:" placeholder="(Bất kỳ)" name='description'/>
                    </>} load_API="http://localhost:8080/admin/warehouse/load" loadSize={2}/>
                    : <></>}
                    { modalNum==2 ?
                     <SearchPickerForm_WithView objectName="Hàng hóa" View={Product_ImageList_View} 
                     onPickItem={handlePickItem}
                     searchInputFields={
                     <>
                        <Input_Text label="Tên hàng hóa:" placeholder="(Bất kỳ)" name='name'/>
                        <Input_Text label="Mô tả hàng hóa:" placeholder="(Bất kỳ)" name='description'/>
                     </>} load_API="http://localhost:8080/business/product/load" loadSize={4}/>
                    : <></>} 
                </Typography>
            </Box>
        </Modal>
        </>
    )
}

export function ImportProductLocations_Form({importProducts, init_details, onSubmit, viewOnly}
                :{importProducts:Array<any>, init_details?:Array<any>, onSubmit?:any, viewOnly:boolean}) {
  
    const [storageLocationDetails, setStorageLocationDetails] = useState<Array<any[]>>(init_details || [[]]);
    const [missings, setMissings] = useState<Array<number>>([]);
    const [open, setOpen] = useState(false);
    const currentIndex = useRef(0);
    
    const c_wid = sessionStorage.getItem('WarehouseId')||'';

    useEffect(() => {
      console.log(importProducts);
      if(storageLocationDetails.length<=importProducts.length) // init value for the first time
        // for(const i in products)
        {setStorageLocationDetails(importProducts.map(()=>([])));
          setMissings(importProducts.map((value)=>(value.productNumber)));  }
      console.log('set for sld...',importProducts.map(()=>([]))) ;
    }, [importProducts]);

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
        boxShadow: 24
      };
    
    function handlePickItem(item:any) {
      console.log('pick item', item);
      if(storageLocationDetails[currentIndex.current].find((s)=>s.StorageLocation.id==item.id))
        {alert('Vị trí lưu trữ bị trùng'); return}

      let new_storageLocationDetails:any={};
      new_storageLocationDetails.StorageLocation = {};
      new_storageLocationDetails.StorageLocation.id = item.id;
      new_storageLocationDetails.StorageLocationId = item.id; //sent to back-end for fast create
      new_storageLocationDetails.StorageLocation.name = item.name;
      new_storageLocationDetails.productNumber = 1;
      // new_storageLocationDetails.description='';

      const newItem = storageLocationDetails.map((product_slds:any,index:number) => {
        if (currentIndex.current==index) {
          product_slds=[...product_slds, new_storageLocationDetails];
          checkMissings(product_slds,currentIndex.current);
          return product_slds;
        } else {
          return product_slds;
        }
      });
      setStorageLocationDetails(newItem);
      setOpen(false);
    }

    function handleChangeItem(new_item:any, new_item_index:number) {
      const newItem = storageLocationDetails.map((sld:any,index:number) => {
        if (new_item_index==index) {
          sld=new_item;
          return sld;
        } else {
          return sld;
        }
      });
      setStorageLocationDetails(newItem);
      checkMissings(new_item, new_item_index);
    }

    function checkMissings(item:any, index:number)
    {
      let productSumNumber:number=0;
      for(const d of item)
          {productSumNumber=Number(d.productNumber)+Number(productSumNumber);}
          
      setMissings(missings.map((m:any,i:number)=>{
        if (i==index) {
          m=importProducts[index].productNumber - productSumNumber;
          return m;
        } else {
          return m;
        }
      }));
    }

    function handleSubmit(e:any){
      e.preventDefault();
      let current_index=0;
      let submit_list: any[]=[];
      for(const sld_arr of storageLocationDetails)
      {
        let productSumNumber:number=0;
        for(const d of sld_arr)
        { 
          productSumNumber+=Number(d.productNumber);
          let record:any={};
          record.ImportProductId=importProducts[current_index].id;
          record.StorageLocationId=d.StorageLocation.id;
          record.inventoryNumber=d.productNumber;
          //record.description = d.description;
          submit_list.push(record);
        }
        
        if(importProducts[current_index].productNumber != productSumNumber)
          {
            console.log('alert',importProducts)
            console.log(current_index)
            console.log(productSumNumber);
            alert('Hàng hóa ['+importProducts[current_index].Product.name+'] có số lượng lưu trữ không bằng số lượng trên phiếu nhập.');
            return;
          }
        
        current_index++;
      }
      onSubmit(e, submit_list);
    }

  return(
      <>
      <form className='flex flex-col items-center'action="" method="" id='ImportProductLocations_Form' onSubmit={(e)=>handleSubmit(e)}>
          {viewOnly?
          <div className="grid grid-cols-2 w-full bg-slate-800 gap-2 p-2 m-2">
          {importProducts.map((i:any, index:number)=>(
            <ProductBatch_View key={index} item={i}/>))}
          </div>
          :
          importProducts.map((i:any, index:number)=>(
          <div className="flex flex-row w-full bg-slate-800 space-x-2 m-2 p-3">
            <div className="w-1/2 self-center">
              <ProductBatch_View item={i}/>
            </div>
            <div className="w-1/2">
              <Input_OptionPicker_WithView objectName="Vị trí lưu trữ" openPicker={()=>{setOpen(true); currentIndex.current=index;}}
                displayedItem={ <StorageLocationDetail_Table
                       stateful_items={storageLocationDetails[index]||[]}
                       setItem={(new_item:any)=>handleChangeItem(new_item,index)}/>} 
                       listItem={true} />
              {missings[index]>0? <div className="text-red-400 text-xl">*Thiếu {missings[index]} hàng hóa</div>: 
              <>{missings[index]<0? <div className="text-yellow-300 text-xl">*Dư {-missings[index]} hàng hóa</div>:
              <div className="text-green-300 text-xl">*Số lượng hàng hóa đã đủ</div>}</>}
              </div>
          </div>)
          )}
          {/* <div className="flex flex-row justify-center space-x-8 mt-4 w-full">
          </div>
          <button type='submit' form='ImportProductLocations_Form'
           className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button> */}
      </form>
      <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modal_style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                  <SearchPickerForm_WithView objectName="Vị trí lưu trữ" View={StorageLocation_ImageList_View}
                   onPickItem={handlePickItem}
                  searchInputFields={
                  <>
                      <input type="hidden" name='WarehouseId' value={c_wid}/>
                      <Input_Text label="Tên vị trí lưu trữ:" placeholder="(Bất kỳ)" name='name'/>
                      <Input_Text label="Mô tả:" placeholder="(Bất kỳ)" name='description'/>
                  </>} load_API="http://localhost:8080/warehouse_keeper/storage_location/load" loadSize={4}
                   initSearchObj={{n:0,WarehouseId:c_wid}}/>
              </Typography>
          </Box>
      </Modal>
    </>
  )
}

export function ExportProductLocations_Form({exportProducts, init_details, onSubmit, viewOnly}
                :{exportProducts:Array<any>, init_details?:Array<any>, onSubmit:any, viewOnly:boolean}) {
  
    const [storageLocationDetails, setStorageLocationDetails] = useState<Array<any[]>>(init_details || [[]]);
    const [missings, setMissings] = useState<Array<number>>([]);
    const [open, setOpen] = useState(false);
    const currentIndex = useRef(0);
    useEffect(() => {
      console.log('--- export product ---',exportProducts);
      console.log('---- stdt',storageLocationDetails)
      if(storageLocationDetails.length<=exportProducts.length) // init value for the first time
        // for(const i in products)
        {setStorageLocationDetails(exportProducts.map(()=>([])));
          setMissings(exportProducts.map((value)=>(value.productNumber))); 
        console.log('missing -----',exportProducts.map((value)=>(value.productNumber))) }
      console.log('set for sld...',exportProducts.map(()=>([]))) ;
    }, [exportProducts]);

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
        boxShadow: 24
      };
    
    function handlePickItem(item:any) {
      console.log('pick item', item);
      if(storageLocationDetails[currentIndex.current].find((s)=>s.StorageLocation.id==item.id))
        {alert('Vị trí chứa hàng xuất kho đã tồn tại trong danh sách.'); return}

      let new_storageLocationDetails:any={};
      new_storageLocationDetails.StorageLocation = {};
      new_storageLocationDetails.StorageLocation.id = item.id;
      new_storageLocationDetails.StorageLocation.name = item.name;
      new_storageLocationDetails.inventoryNumber = item.ProductStorageLocations[0].inventoryNumber;
      new_storageLocationDetails.exportNumber = 1;

      const newItem = storageLocationDetails.map((product_slds:any,index:number) => {
        if (currentIndex.current==index) {
          product_slds=[...product_slds, new_storageLocationDetails];
          checkMissings(product_slds,currentIndex.current);
          return product_slds;
        } else {
          return product_slds;
        }
      });
      setStorageLocationDetails(newItem);
      setOpen(false);
    }

    function handleChangeItem(new_item:any, new_item_index:number) {
      const newItem = storageLocationDetails.map((sld:any,index:number) => {
        if (new_item_index==index) {
          sld=new_item;
          return sld;
        } else {
          return sld;
        }
      });
      setStorageLocationDetails(newItem);
      checkMissings(new_item, new_item_index);
    }

    function checkMissings(item:any, index:number)
    {
      let exportSumNumber:number=0;
      for(const d of item)
          {exportSumNumber=Number(d.exportNumber)+Number(exportSumNumber);}
          
      setMissings(missings.map((m:any,i:number)=>{
        if (i==index) {
          m=exportProducts[index].productNumber - exportSumNumber;
          return m;
        } else {
          return m;
        }
      }));
    }

    function handleSubmit(e:any){
      e.preventDefault();
      let current_index=0;
      let submit_list: any[]=[];
      for(const sld_arr of storageLocationDetails)
      {
        let exportSumNumber:number=0;
        for(const d of sld_arr)
        { 
          exportSumNumber+=Number(d.exportNumber);
          let record:any={};
          record.ImportProductId=exportProducts[current_index].id;
          record.StorageLocationId=d.StorageLocation.id;
          record.inventoryNumber=d.inventoryNumber-d.exportNumber;
          record.exportNumber=d.exportNumber;
          //record.description = d.description;
          submit_list.push(record);
        }
        
        if(exportProducts[current_index].productNumber != exportSumNumber)
          {
            console.log('alert',exportProducts)
            console.log(current_index)
            console.log(exportSumNumber);
            alert('Hàng hóa ['+exportProducts[current_index].Product.name+'] có số lượng xuất không bằng số lượng trên phiếu xuất.');
            return;
          }
        
        current_index++;
      }
      onSubmit(e, submit_list);
    }

  return(
      <>
      <form className='flex flex-col items-center'action="" method="" id='ExportProductLocations_Form' onSubmit={(e)=>handleSubmit(e)}>
          {viewOnly?
          <div className="grid grid-cols-2 w-full bg-slate-800 gap-2 p-2 m-2">
          {exportProducts.map((i:any, index:number)=>(
            <ProductBatch_View key={index} item={i}/>))}
          </div>
          :
          exportProducts.map((i:any, index:number)=>(
          <div className="flex flex-row w-full bg-slate-800 space-x-2 m-2 p-3">
            <div className="w-1/2 self-center">
              <ProductBatch_View item={i}/>
            </div>
            <div className="w-1/2">
              <Input_OptionPicker_WithView objectName="Vị trí chứa hàng hóa cần xuất" openPicker={()=>{setOpen(true); currentIndex.current=index;}}
                displayedItem={ <Export_StorageLocation_Table
                       stateful_items={storageLocationDetails[index]||[]}
                       setItem={(new_item:any)=>handleChangeItem(new_item,index)}/>} 
                       listItem={true} />
              {missings[index]>0? <div className="text-red-400 text-xl">*Thiếu {missings[index]} hàng hóa</div>: 
              <>{missings[index]<0? <div className="text-yellow-300 text-xl">*Dư {-missings[index]} hàng hóa</div>:
              <div className="text-green-300 text-xl">*Số lượng hàng hóa đã đủ</div>}</>}
              </div>
          </div>)
          )}
          {/* <div className="flex flex-row justify-center space-x-8 mt-4 w-full">
          </div>
          <button type='submit' form='ImportProductLocations_Form'
           className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button> */}
      </form>
      <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modal_style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                  <SearchPickerForm_WithView objectName="Vị trí chứa hàng hóa cần xuất" View={StorageLocation_ImageList_View}
                   onPickItem={handlePickItem}
                  searchInputFields={
                  <>
                      <input type="hidden" name='id' value={exportProducts[currentIndex.current]?.id}></input>
                      <Input_Text label="Tên vị trí lưu trữ:" placeholder="(Bất kỳ)" name='name'/>
                      <Input_Text label="Mô tả:" placeholder="(Bất kỳ)" name='description'/>
                  </>} load_API="http://localhost:8080/warehouse_keeper/storage_location/load_byProductId" loadSize={4}
                  initSearchObj={{n:0, id:exportProducts[currentIndex.current]?.id}} />
              </Typography>
          </Box>
      </Modal>
    </>
  )
}

export function Export_Form({init_value, button_title, onSubmit}:{init_value?:any,button_title:string, onSubmit:any}) {
  
  const [store, setStore] = useState<any>(init_value?.Store||undefined);
  const [products, setProducs] = useState<Array<any>>([]);
  const [exportProductBatches_Segments, setExportProductBatches_Segments] = useState<Array<any[]>>([[]]);
  const warehouses = useRef<number[]>([]);
  const [open, setOpen] = useState(false);
  const [modalNum, setModalNum] = useState(0);
  const currentIndex = useRef(0);
  // useEffect(() => {
  //   // console.log(importProducts);
  //   // if(storageLocationDetails.length<importProducts.length) // init value for the first time
  //   //   // for(const i in products)
  //   //   {setStorageLocationDetails(importProducts.map(()=>([])));
  //   //     setMissings(importProducts.map((value)=>(value.productNumber)));  }
  //   // console.log('set for sld...',importProducts.map(()=>([]))) ;
  // }, [importProducts]);

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
        boxShadow: 24
      };
    
    function handlePickProduct(item:any) {
      console.log('pick product', item);
      if(products.find((p)=>p.id==item.id))
        {alert('Hàng hóa đã tồn tại trong danh sách.'); return}

      setProducs([...products,item]);
      setExportProductBatches_Segments([...exportProductBatches_Segments,[]]);
      setOpen(false);
    }

    function handlePickProductBatch(item:any) {
      console.log('pick item', item);
      if(exportProductBatches_Segments[currentIndex.current].find((e)=>e.id==item.id))
        {alert('Lô hàng hóa đã tồn tại trong danh sách.'); return}

      let new_exportPB:any={};
      new_exportPB=item;
      new_exportPB.productNumber = 1;
      // new_storageLocationDetails.description='';

      if(warehouses.current.findIndex(w=>w==item.Import.Warehouse.id)==-1)
          warehouses.current.push(item.Import.Warehouse.id);

      const newItem = exportProductBatches_Segments.map((i:any,idx:number) => {
        if (currentIndex.current==idx) {
          i=[...i, new_exportPB];
          // checkMissings(product_slds,currentIndex.current);
          return i;
        } else {
          return i;
        }
      });
      setExportProductBatches_Segments(newItem);
      setOpen(false);
    }

    function handleChangeProductBatch(new_items:any, new_item_index:number) {
      warehouses.current=[]
      const newItem = exportProductBatches_Segments.map((segment:any,idx:number) => {
        if (new_item_index==idx) {
          { segment=new_items;
            for(const epb of new_items)
            {
              if(warehouses.current.findIndex(w=>w==epb.Import.Warehouse.id)==-1)
                warehouses.current.push(epb.Import.Warehouse.id);
            }
          }
          return segment;
        } else {
          for(const epb of segment)
            {
              if(warehouses.current.findIndex(w=>w==epb.Import.Warehouse.id)==-1)
                warehouses.current.push(epb.Import.Warehouse.id);
            }
          return segment;
        }
      });
      setExportProductBatches_Segments(newItem);
      // checkMissings(new_item, new_item_index);
    }

    // function checkMissings(item:any, index:number)
    // {
    //   let productSumNumber:number=0;
    //   for(const d of item)
    //       {productSumNumber=Number(d.productNumber)+Number(productSumNumber);}
          
    //   setMissings(missings.map((m:any,i:number)=>{
    //     if (i==index) {
    //       m=importProducts[index].productNumber - productSumNumber;
    //       return m;
    //     } else {
    //       return m;
    //     }
    //   }));
    // }

    function handleSubmit(e:any){
      e.preventDefault();

      let submit_list:Array<any> =[];
      let ExportDetails:Array<any> =[];
      for(const segment of exportProductBatches_Segments)
      {
        for(const detail of segment)
        {
          ExportDetails.push({ImportProductId:detail.id, WarehouseId:detail.Import.Warehouse.id, productNumber:detail.productNumber});
        }
      }
      submit_list.push(warehouses.current);
      submit_list.push(ExportDetails);

      onSubmit(e, submit_list);
    }

    const c_uid = sessionStorage.getItem('UserId')||'';
    console.log('userid from cookie:', c_uid)

  return(
      <>
      <form className='flex flex-col items-center' action="" method="" id='Export_Form' onSubmit={(e)=>handleSubmit(e)}>
          {/* <div className="grid grid-cols-2 w-full bg-slate-800 gap-2 p-2 m-2">
          {importProducts.map((i:any, index:number)=>(
            <ImportProduct_View key={index} item={i}/>))}
          </div>
          : */}
          <input name='id' value={init_value?.id} type='hidden'/>
            <input name='createdBy' value={c_uid} type='hidden'/>
            {/* <div className="flex flex-row justify-center space-x-8 mt-4 w-full"></div> */}
            <Input_OptionPicker_WithView objectName="Cửa hàng" inputName="StoreId" openPicker={()=>{setOpen(true); setModalNum(1);}}
             displayedItem={ store?.id?<Store_SmallView index={1} item={store}/> : <></>} value={store?.id} />
          <Input_OptionPicker_WithView objectName="Hàng hóa"
             openPicker={()=>{setOpen(true); setModalNum(2);}}
             displayedItem={<> 
          {products.map((i:any, index:number)=>(
          <div className="flex flex-row w-full bg-slate-800 space-x-2 p-3">
            <div className="w-1/3 self-center">
              <Product_SmallView item={i}/>
            </div>
            <div className="w-2/3">
              <Input_OptionPicker_WithView objectName="Lô hàng hóa"
                 openPicker={()=>{setOpen(true); currentIndex.current=index; setModalNum(3);}}
                displayedItem={ <ExportDetail_Table
                       stateful_items={exportProductBatches_Segments[index]||[]}
                       setItem={(new_item:any)=>handleChangeProductBatch(new_item,index)}/>} 
                       listItem={true} />
              </div>
          </div>)
          )}</>} listItem={true} />
          {warehouses.current.length>0? <div className="text-yellow-400 text-xl">*Xuất hàng từ {warehouses.current.length} kho</div>:<></>}
          <Input_TextArea label="Ghi chú:" placeholder="Ghi chú (nếu có)..." name='note' init_value={init_value?.note}/>
          <button type='submit' form='Export_Form' className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
      </form>
      <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modal_style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
              { modalNum==1 ?
                    <SearchPickerForm_WithView objectName="Cửa hàng" View={Store_ImageList_View}
                     onPickItem={(i: any)=>{setStore(i); setOpen(false);}}
                    searchInputFields={
                    <>
                        <Input_Text label="Tên cửa hàng:" placeholder="(Bất kỳ)" name='name'/>
                        <Input_Text label="Địa chỉ cửa hàng:" placeholder="(Bất kỳ)" name='address'/>
                        <Input_Text label="Mô tả cửa hàng:" placeholder="(Bất kỳ)" name='description'/>
                    </>} load_API="http://localhost:8080/admin/store/load" loadSize={2}/>
                    : <></>}
              { modalNum==2 ?
                <SearchPickerForm_WithView objectName="Hàng hóa" View={Product_ImageList_View} 
                onPickItem={handlePickProduct}
                searchInputFields={
                <>
                    <Input_Text label="Tên hàng hóa:" placeholder="(Bất kỳ)" name='name'/>
                    <Input_Text label="Mô tả hàng hóa:" placeholder="(Bất kỳ)" name='description'/>
                </>} load_API="http://localhost:8080/business/product/load" loadSize={4}/>
                : <></>}
              { modalNum==3 ?
                <SearchPickerForm_WithView objectName="Lô hàng hóa" View={ProductBatch_Table}
                onPickItem={handlePickProductBatch}
                searchInputFields={
                <>
                    <input type='hidden' value={products[currentIndex.current].id} name='id'></input>
                    <Input_Text label="Kho:" placeholder="(Bất kỳ)" name='WarehouseName'/>
                </>} initSearchObj={{n:0, id:products[currentIndex.current].id}}
                load_API="http://localhost:8080/business/product_batch/load_byProductId" loadSize={3}/>
              : <></>}
              </Typography>
          </Box>
      </Modal>
    </>
  )
}

export function Personal_Info_Form({button_title, onSubmit}:
                        {button_title:string, onSubmit:any}) {

    const [userInfo, setUserInfo] = useState<any>({});
    

  const c_uid = sessionStorage.getItem('UserId')||'';
  console.log('userid from session storage:', c_uid)

  useEffect(()=>{
      load();   
    }, [])

  const load = async () => {
    console.log("load user info")
    const res = await fetch('http://localhost:8080/userinfo/get?id='+c_uid , 
    { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
    else{
        let data = await res.json();
        console.log(data);
        setUserInfo(data);
    }
}

  return(
    <>
      <form className="flex flex-col items-center space-y-4" action="" method="" encType="" onSubmit={onSubmit} onKeyDown={(e) => {if(e.key == 'Enter') {
        e.preventDefault();}}}>
          <input name='id' value={c_uid} type='hidden'/>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col space-y-4">
              <Input_Text label="Tên đầy đủ:" placeholder="Nhập tên đầy đủ..." name='fullName' init_value={userInfo.fullName||''}/>
              <Input_Text label="Ngày sinh:" placeholder="Chọn ngày sinh..." name='dateOfBirth' init_value={userInfo.dateOfBirth||''}
              type="date"/>
              <Input_Text label="Số điện thoại:" placeholder="Nhập số điện thoại..." name='phoneNumber' init_value={userInfo.phoneNumber||''}/>
              <Input_Text label="Địa chỉ liên hệ:" placeholder="Nhập địa chỉ liên hệ..." name='address' init_value={userInfo.address||''}/>
            </div>
            <div className="flex flex-col space-y-4">
              <Input_Option label="Giới tính:" name='gender' init_value={userInfo?.gender||0}
                    options={[{value:'0',name:'Nam'},{value:'1',name:'Nữ'}]}/>
              <Input_Text label="Căn cước công dân:" placeholder="Nhập căn cước công dân..." name='citizenID' init_value={userInfo.citizenID||''}/>
              <Input_Text label="Địa chỉ email:" placeholder="Nhập địa chỉ email..." name='email' init_value={userInfo.email||''}/>
            </div>
          </div>
          <button type='submit' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
        </form>
    </>
  )
}
