'use client'

// import { useState } from "react";
// import Products_Sidebar from "../sidebar"
import { postFormData } from "@/app/func/form_action"
// import {SearchForm_WithView} from "@/app/components/searchform_withview"
// import { Input_Text } from "@/app/components/input_field"
// // import Table from "./table"
import { SearchForm_WithView } from "@/app/components/searchform_withview"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import { Export_Table, Import_Table } from "@/app/components/table"
import { ExportDetails_Form, ImportDetails_Form } from "@/app/components/details_form"
import Exports_Sidebar from "../sidebar"
import { API } from "@/app/api/const"

export default function Home() {
  
  const c_uid = sessionStorage.getItem('UserId')||'';
    console.log('userid from cookie:', c_uid)

    return (
      <main className="min-h-screen">
        <Exports_Sidebar current_tab_id={2}/>
        <div className="flex flex-col ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
            <SearchForm_WithView  View={Export_Table} CustomForm={ExportDetails_Form}
                load_API={API.export.load} 
                objectName="phiếu xuất" loadSize={5} InputFields={<>
                    <input type='hidden' name="createdBy" value={c_uid}/>
                    <Input_Text label="Ghi chú:" placeholder="(Bất kỳ)" name='note'/>
                    <Input_Option label="Trạng thái phiếu xuất:" name="StatusId" form="searchform_withview" options={[
                            {value:'',name:"Bất kỳ"}, {value:"1",name:"Chờ duyệt"}, {value:"2",name:"Đã duyệt, chờ xuất kho"},
                            {value:"3",name:"Đã xuất kho"}, {value:"4",name:"Đã hủy"}]}/>
                  </>} init_searchObj={{n:0,createdBy:c_uid}} />
        </div>
      </main>
    )
  }
