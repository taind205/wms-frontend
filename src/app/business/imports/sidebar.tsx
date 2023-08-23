import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Tạo phiếu nhập', link:'create_import'},
  {id:2, name:'Phiếu nhập đã tạo', link:'list_imports'},
]

export default function Products_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }