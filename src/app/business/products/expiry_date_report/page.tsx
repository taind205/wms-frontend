'use client'

// import { useState } from "react";
import Products_Sidebar from "../sidebar"
import {ProductForm, ProductTagForm, ReportForm} from "../form"
import { postFormData } from "@/app/func/form_action"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { Input_Date, Input_Option, Input_Text } from "@/app/components/input_field"
import { ExpiryDateReport_Table, InventoryReport_Table, Tag_Table } from "@/app/components/table"

export default function Home() {
    // 
    
    return (
      <main className="min-h-screen">
        <Products_Sidebar current_tab_id={5}/>
        <div className="flex flex-col ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Thống kê hàng sắp hết hạn</h1>
          <ReportForm View={ExpiryDateReport_Table} Report_API="http://localhost:8080/business/product/report/expiryDate" 
          InputFields={<>
            <Input_Option label="Chu kỳ thống kê" name='cycle' options={
                  [{value:(1000*60*60*24*30),name:'Một tháng'},{value:(1000*60*60*24*15),name:'Nửa tháng'}]} />
            <Input_Option label="Số chu kỳ" name='cycleNumber' options={
                  [{value:1,name:'1'},{value:2,name:'2'},{value:3,name:'3'},{value:4,name:'4'},{value:5,name:'5'}]} />
            </>
          } dataHandle={(reports:any) =>
            { for(let r of reports)
              {r.info = r.info.filter((v:any) => v.totalInventory!=null);
              r.info.sort((a:any, b:any) => {
                const sumA = a.totalInventory*a.price;
                const sumB = b.totalInventory*b.price;
                if (sumA < sumB) {
                  return 1;
                }
                if (sumA > sumB) {
                  return -1;
                }
                return 0;
                })}
            }}/>
        </div>
      </main>
    )
  }