'use client'

import { Export_Form, Import_Form } from "@/app/components/input_form"
// import { useState } from "react";
import { postFormData } from "@/app/func/form_action"
import Exports_Sidebar from "../sidebar"
// import {SearchForm_WithView} from "@/app/components/searchform_withview"
// import { Input_Text } from "@/app/components/input_field"
// // import Table from "./table"

export default function Home() {
    // 
    return (
      <main className="min-h-screen">
        <Exports_Sidebar current_tab_id={1}/>
        <div className="flex flex-col ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Tạo phiếu xuất</h1>
          <Export_Form button_title='Tạo phiếu xuất' onSubmit={(e:any,list:[]) => 
                            postFormData(e,'http://localhost:8080/business/export/create',list)}/>

        </div>
      </main>
    )
  }