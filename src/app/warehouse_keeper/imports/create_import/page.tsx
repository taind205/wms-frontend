'use client'

import { Import_Form } from "@/app/components/input_form"
// import { useState } from "react";
import Products_Sidebar from "../sidebar"
import { postFormData } from "@/app/func/form_action"
import { API } from "@/app/api/const"
// import {SearchForm_WithView} from "@/app/components/searchform_withview"
// import { Input_Text } from "@/app/components/input_field"
// // import Table from "./table"

export default function Home() {
    // 
    
    return (
      <main className="min-h-screen">
        <Products_Sidebar current_tab_id={1}/>
        <div className="flex flex-col ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Tạo phiếu nhập</h1>
          <Import_Form button_title='Tạo phiếu nhập' onSubmit={(e:any,list:[]) => 
                            postFormData(e,API.import.create,list)}/>

        </div>
      </main>
    )
  }