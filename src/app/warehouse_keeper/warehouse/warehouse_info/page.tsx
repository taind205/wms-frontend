'use client'

import { Warehouse_ImageList_View } from "@/app/components/imagelist_view"
import Warehouse_Sidebar from "../sidebar"
import { useEffect, useState } from "react";

export default function Home() {
  const [info,setInfo] = useState<any[]>([]);

  const c_wid = sessionStorage.getItem('WarehouseId')||'';
  console.log('whid from cookie:', c_wid)    
  console.log("get info...")
      let res:any;
      useEffect(() => {
        res = fetch('http://localhost:8080/admin/warehouse/load?id='+c_wid, 
      { headers: {'Content-Type': 'application/json'} }).then((r)=> (r.json())).then(j=>{console.log(j); setInfo(j);});
      
    }, []);
    
      
      // alert(d.msg);
      // location.reload();

    return (
      <main className="min-h-screen">
        <Warehouse_Sidebar current_tab_id={3}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <Warehouse_ImageList_View stateful_items={info}/>
        </div>
      </main>
    )
  }