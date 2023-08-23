'use client'

import { Image_Text_View1 } from "@/app/components/image_view"
import Accounts_Sidebar from "../sidebar"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { Store_ImageList_View, Warehouse_ImageList_View } from "@/app/components/imagelist_view"
import { InputForm_Store, InputForm_Warehouse } from "@/app/components/input_form"
import Stores_Warehouses_Sidebar from "../sidebar"

export default function Home() {
    return (
      <main className="min-h-screen">
        <Stores_Warehouses_Sidebar current_tab_id={4}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <SearchForm_WithView View={Store_ImageList_View} UpdateForm={InputForm_Store} load_API="http://localhost:8080/admin/store/load" 
          update_API="http://localhost:8080/admin/store/update" 
          objectName="cửa hàng" InputFields={<>
            <Input_Text label="Tên cửa hàng:" placeholder="(Bất kỳ)" name='name'/>
            <Input_Text label="Địa chỉ cửa hàng:" placeholder="(Bất kỳ)" name='address'/>
            <Input_Text label="Mô tả cửa hàng:" placeholder="(Bất kỳ)" name='description'/>
          </>} />
        </div>
      </main>
    )
  }

