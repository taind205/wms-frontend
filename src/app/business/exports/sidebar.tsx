import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Tạo phiếu xuất', link:'create_export'},
  {id:2, name:'Phiếu xuất đã tạo', link:'list_exports'},
]

export default function Exports_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }