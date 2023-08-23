'use client'

import { postFormData } from "@/app/func/form_action"
import Warehouse_Sidebar from "../sidebar"
import { Form_StorageLocation } from "@/app/components/input_form"

export default function Home() {
    
    return (
      <main className="min-h-screen">
        <Warehouse_Sidebar current_tab_id={1}/>
        <div className="ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Thêm vị trí lưu trữ mới</h1>
            <Form_StorageLocation button_title='Thêm vị trí' onSubmit={(e:any) => 
                              postFormData(e,'http://localhost:8080/warehouse_keeper/storage_location/add')}/>

        </div>
      </main>
    )
  }