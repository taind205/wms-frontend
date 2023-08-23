'use client'

import { Input_Image, Input_ListOption_QuickSearch, Input_Option, Input_Option_Unit, Input_Text, Input_TextArea } from "@/app/components/input_field"
import { ProductTag_DisplayText, ProductTag_ItemView } from "@/app/components/item_view"
import { ProductPrice_Table } from "@/app/components/table"
import { postFormData } from "@/app/func/form_action"
import { useEffect, useRef, useState } from "react"
// const API = isUpdateForm ? 'http://localhost:8080/admin/product/update' : 'http://localhost:8080/admin/product/create'
// const method = isUpdateForm ? 'POST' : 'POST' //upload thing, post should be use in the update form, not put...
const getProductImage='http://localhost:8080/business/product/img/'

export function ProductForm({init_value, button_title, onSubmit}:
                        {init_value?:any,button_title:string, onSubmit:any}) {

    const [productPrices, setProductPrices] = useState<any[]>([]);

useEffect(()=>{
    init_value?
        load():{};   
    }, [])

  const load = async () => {
    console.log("load price")
    const res = await fetch('http://localhost:8080/business/product/prices/?id='+init_value.id , 
    { method: 'GET', headers: {'Content-Type': 'application/json'} });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
    else{
        let data = await res.json();
        console.log(data);
        setProductPrices(data);
    }
}

  const c_uid = sessionStorage.getItem('UserId')||'';
  console.log('userid from cookie:', c_uid)

  return(
    <>
      <form className="flex flex-col items-center space-y-4" action="" method="" encType="multipart/form-data" onSubmit={onSubmit} onKeyDown={(e) => {if(e.key == 'Enter') {
        e.preventDefault();}}}>
          <input name='UserId' value={c_uid} type='hidden'/>
          <input name='id' value={init_value?.id} type='hidden'/>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col space-y-4">
              <Input_Text label="Tên hàng hóa:" placeholder="Nhập tên hàng hóa..." name='name' init_value={init_value?.name}/>
              <Input_Text label="Giá hàng hóa:" placeholder="Nhập giá hàng hóa..." name='price' init_value={productPrices[0]?.price||''}/>
              <Input_Image label="Ảnh hàng hóa:" placeholder="Chọn ảnh hàng hóa..." name='image' init_value={init_value?.id? getProductImage+init_value.id:''}/>
            </div>
            <div className="flex flex-col space-y-4">
              <Input_Option_Unit label="Thời hạn sử dụng:" name='shelfLife' type="number"
                 init_value={init_value?.shelfLife} options={[{name:'Tháng',value:'m'}]} option_name="dateValueType"/>
              <Input_Option label="Trạng thái hàng hóa:" name='StatusId' init_value={init_value?.StatusId}
                    options={[{value:'1',name:'Khả dụng'}]}/>
              <Input_ListOption_QuickSearch objectName='Nhãn hàng hóa' placeholder="Thêm nhãn hàng hóa..." inputName="tags" 
                load_API="http://localhost:8080/business/product_tag/load" 
                loadbyID_API="http://localhost:8080/business/product_tag/load_byProductId"
                init_value={init_value?.id}
                SelectedItemView={ProductTag_ItemView} ResultText={ProductTag_DisplayText}/>
              </div>
            {/* <div className="flex w-full justify-center space-x-4">
            </div>
            <div className="flex w-full justify-center space-x-4">
              
              </div> */}
            </div>
          <Input_TextArea label="Mô tả hàng hóa:" placeholder="Mô tả hàng hóa..." name='description' init_value={init_value?.description}/>
      
            <button type='submit' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
        </form>
        {init_value?
        <div className="flex justify-center py-4">
          <div className="w-1/2 self-center">
          <ProductPrice_Table stateful_items={productPrices}/>
          </div>
        </div>
        :<></>}
    </>
  )
}


const categoryName = ['Không xác định', 'Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];

export function ProductTagForm({init_value, button_title, onSubmit}:
                        {init_value?:any,button_title:string, onSubmit:any}) {

    // const API = isUpdateForm ? 'http://localhost:8080/admin/product/update' : 'http://localhost:8080/admin/product/create'
    // const method = isUpdateForm ? 'POST' : 'POST' //upload thing, post should be use in the update form, not put...

    return(
        <form className='flex flex-col items-center'action="" method="" id={'productTag_Form'+init_value?.id} onSubmit={onSubmit}>
            {/* <input name='modifiedBy' value='1' type='hidden'/> */}
            <input name='id' value={init_value?.id} type='hidden'/>
            <div className="flex flex-row justify-center space-x-8 mt-4 w-full">
                <Input_Text label="Tên nhãn hàng hóa:" placeholder="Nhập tên nhãn hàng hóa..." name='name' init_value={init_value?.name}/>
                <Input_Option label="Loại nhãn:" name="CategoryId" form={'productTag_Form'+init_value?.id} options={
                            categoryName.map((v:string,i:number)=>({value:i,name:v})).slice(1)} init_value={init_value?.CategoryId}/>
                {/* <Input_Text label="Loại nhãn:" placeholder="Nhập nhãn hàng hóa..." name='category' init_value={''}/> */}
            </div>
            <Input_TextArea label="Mô tả nhãn hàng hóa:" placeholder="Mô tả nhãn hàng hóa..." name='description' init_value={init_value?.description}/>
              <button type='submit' className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">{button_title}</button>
          </form>
    )
}

export function ReportForm({View, InputFields, Report_API, compareFnc, dataHandle, filtFnc}:
          {View:any, InputFields:React.JSX.Element, Report_API:string, compareFnc?:any, dataHandle?:any, filtFnc?:any}) {
    const [stateful_items, setStateful_items]=useState<any[]>([]);
    let searchObjectRef = useRef<any>({});

    const load = async () => {
        console.log("load")
        console.log(searchObjectRef.current);
        const res = await fetch(Report_API +'?'+ new URLSearchParams(searchObjectRef.current).toString(), 
        { method: 'GET', headers: {'Content-Type': 'application/json'} });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
          }
        else{
            let data = await res.json();
            // console.log(loadSize);
            // if(data.length < loadSize) //Alter: data[data.length-1]==null
            // {    
            //     data = data.filter(Boolean)
            //     setEndLoad(true);
            // }
            // else setEndLoad(false);
            console.log(data);
            if(dataHandle) dataHandle(data);
            // data=data.filter((v:any) => v.totalInventory!=null);
            if(filtFnc) data=data.filter(filtFnc);
            if(compareFnc) data.sort(compareFnc);
            

            console.log(data);
            setStateful_items(data);
            if(data.length==0)
              alert('Không có dữ liệu phù hợp.');
            // load_new(data,clearCurrent);
            // searchObjectRef.current.n++;
        }
    }

    function search(event:any) {
      console.log("submit")
      event.preventDefault();
      const form = event.target;
      const formdata = new FormData(form);
      const new_searchObj = Object.fromEntries(formdata.entries());
      
      searchObjectRef.current = new_searchObj;
      // searchObjectRef.current.n = 0;
      console.log("new report:");
      load();
    }

    return(
      <>
        <form className='m-4 flex flex-col items-center'action="" method="" id={'report_Form'} onSubmit={search}>
            {/* <input name='modifiedBy' value='1' type='hidden'/> */}
            {/* <input name='id' value={init_value?.id} type='hidden'/> */}
              {InputFields}
              <button type='submit' className="m-8 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Thống kê</button>
          </form>

          {(stateful_items.length>0)? <View stateful_items={stateful_items}/>:<></> }
          {/* openForm={(content:any)=>handleOpen(content)}/> */}
      </>
    )
}

// const formSubmit = async (event:any) => {
    //     console.log("submit")
    //     event.preventDefault();
    //     const data = new FormData(event.target);
    //     // let formObject = Object.fromEntries(data.entries());
    //     const res = await fetch('http://localhost:8080/admin/warehouse/create/', 
    //     { method: 'POST', body: data, headers:{"Access-Control-Allow-Origin":"*"} });
    //     const d = await res.json();
    //     console.log(d);
    //     alert(d.msg);
    //   }