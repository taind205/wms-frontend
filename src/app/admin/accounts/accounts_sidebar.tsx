import { useState } from "react";
import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Tạo tài khoản mới', link:'create_accounts'},
  {id:2, name:'Tìm tài khoản', link:'find_accounts'},
  {id:3, name:'Quyền tài khoản', link:'roles'}
]

export default function Accounts_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }