import SideBar from "../../components/sidebar"

const tabs=[
  {id:1, name:'Thêm hàng hóa mới', link:'add_product'},
  {id:2, name:'Tìm hàng hóa', link:'find_products'},
  {id:3, name:'Nhãn hàng hóa', link:'product_tags'},
  {id:4, name:'Thống kê hàng hóa tồn kho', link:'inventory_report'},
  {id:5, name:'Thống kê hàng hóa sắp hết hạn', link:'expiry_date_report'}
]

export default function Products_Sidebar({current_tab_id}:{current_tab_id:number}) {
    return <>
      <div className="fixed left-0">
      <SideBar tabs={tabs} current_tab_id={current_tab_id}/>
      </div>
    </>
  }