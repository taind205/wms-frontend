import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Thêm kho mới', link:'create_warehouse'},
  {id:2, name:'Tìm kho', link:'find_warehouses'},
  {id:3, name:'Thêm cửa hàng mới', link:'create_store'},
  {id:4, name:'Tìm cửa hàng', link:'find_stores'}
]

export default function Stores_Warehouses_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }