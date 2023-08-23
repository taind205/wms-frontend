import TopBar from "../components/topbar"

const pages=[
  {id:1, name:'Quản lý tài khoản', link:'../accounts'},
  {id:2, name:'Danh mục kho, cửa hàng', link:'../stores_warehouses'},
]

const childpages=[
  {id:1, name:'Tạo tài khoản mới', link:'../accounts/create_accounts'},
  {id:2, name:'Tìm tài khoản', link:'../accounts/find_accounts'},
  {id:3, name:'Quyền tài khoản', link:'../accounts/roles'},
  {id:4, name:'Thêm kho mới', link:'../stores_warehouses/create_warehouse'},
  {id:5, name:'Tìm kho', link:'../stores_warehouses/find_warehouses'},
  {id:6, name:'Thêm cửa hàng mới', link:'../stores_warehouses/create_store'},
  {id:7, name:'Tìm cửa hàng', link:'../stores_warehouses/find_stores'}
]

export default function AdminLayout({
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