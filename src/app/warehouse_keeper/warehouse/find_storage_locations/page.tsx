'use client'

import { Image_Text_View1 } from "@/app/components/image_view"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { StorageLocation_ImageList_View, Warehouse_ImageList_View } from "@/app/components/imagelist_view"
import {Form_StorageLocation, InputForm_Warehouse} from "@/app/components/input_form"
import Warehouse_Sidebar from "../sidebar"

export default function Home() {

  const c_wid = sessionStorage.getItem('WarehouseId')||'';
  console.log('whid from cookie:', c_wid)

    return (
      <main className="min-h-screen">
        <Warehouse_Sidebar current_tab_id={2}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <SearchForm_WithView View={StorageLocation_ImageList_View} UpdateForm={Form_StorageLocation}
          load_API="http://localhost:8080/warehouse_keeper/storage_location/load" 
          update_API="http://localhost:8080/warehouse_keeper/storage_location/update" 
          objectName="Vị trí lưu trữ" InputFields={<>
            <input type="hidden" name='WarehouseId' value={c_wid}/>
            <Input_Text label="Tên vị trí:" placeholder="(Bất kỳ)" name='name'/>
            <Input_Text label="Mô tả vị trí:" placeholder="(Bất kỳ)" name='description'/>
          </>} loadSize={4} init_searchObj={{n:0,WarehouseId:c_wid}}/>
        </div>
      </main>
    )
  }