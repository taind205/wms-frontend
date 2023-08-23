import TopBar from "../components/topbar"

const pages=[
  {id:1, name:'Hàng hóa', link:'../products'},
  {id:2, name:'Phiếu nhập', link:'../imports'},
  {id:3, name:'Phiếu xuất', link:'../exports'},
]

const childpages=[
  {id:1, name:'Tạo phiếu xuất', link:'.../business/exports/create_export'},
  {id:2, name:'Phiếu xuất đã tạo', link:'/business/exports/list_exports'},
  {id:3, name:'Tạo phiếu nhập', link:'/business/imports/create_import'},
  {id:4, name:'Phiếu nhập đã tạo', link:'/business/imports/list_imports'},
  {id:5, name:'Thêm hàng hóa mới', link:'/business/products/add_product'},
  {id:6, name:'Tìm hàng hóa', link:'/business/products/find_products'},
  {id:7, name:'Nhãn hàng hóa', link:'/business/products/product_tags'},
  {id:8, name:'Thống kê hàng hóa tồn kho', link:'/business/products/inventory_report'},
  {id:9, name:'Thống kê hàng hóa sắp hết hạn', link:'/business/products/expiry_date_report'}
]

export default function BusinessLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>
      <div className="sticky top-0 z-10">
      <TopBar pages={pages} childpages={childpages}/>
      </div>
      <div className="bg-slate-700 text-slate-300">
      {children}
      </div>
      </>
  }