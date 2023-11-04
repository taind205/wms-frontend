'use client'

// import { useState } from "react";
import Products_Sidebar from "../sidebar"
import {ProductForm, ProductTagForm, ReportForm} from "../form"
import { postFormData } from "@/app/func/form_action"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { Input_Date, Input_Text } from "@/app/components/input_field"
import { InventoryReport_Table, Tag_Table } from "@/app/components/table"
import { API } from "@/app/api/const"

export default function Home() {
    // 
    
    return (
      <main className="min-h-screen">
        <Products_Sidebar current_tab_id={4}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Thống kê hàng tồn kho</h1>
          <ReportForm View={InventoryReport_Table} Report_API={API.product.inventory_report}
           InputFields={<>
            <div>Chỉ bao gồm hàng hóa:</div>
            <Input_Date label="Hạn sử dụng từ ngày" label2="đến ngày" name="startDate" name2="endDate"/></>
          } filtFnc={(v:any) => v.totalInventory!=null}
           compareFnc={(a:any, b:any) => {
            const sumA = a.totalInventory*a.price;
            const sumB = b.totalInventory*b.price;
            if (sumA < sumB) {
              return 1;
            }
            if (sumA > sumB) {
              return -1;
            }
            return 0;
          }}/>
        </div>
      </main>
    )
  }