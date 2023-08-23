import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Thêm vị trí lưu trữ', link:'add_storage_location'},
  {id:2, name:'Tìm vị trí lưu trữ', link:'find_storage_locations'},
  {id:3, name:'Thông tin kho', link:'warehouse_info'},
]

export default function Warehouse_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }