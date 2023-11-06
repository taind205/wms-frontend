import { cookies } from "next/headers"
import TopBar from "../components/topbar"
import { redirect } from "next/navigation"
import { API } from "../api/const"

const pages=[
  // {id:1, name:'Quản lý tài khoản', link:'../accounts'},
  // {id:2, name:'Danh mục kho, cửa hàng', link:'../stores_warehouses'},
  // {id:3, name:'Hàng hóa', link:'../products'},
  {id:1, name:'Quản lý kho', link:'../warehouse'},
  {id:2, name:'Phiếu nhập', link:'../imports'},
  {id:3, name:'Phiếu xuất', link:'../exports'},
  // {id:7, name:'Trang #5', link:''},
]

const childpages=[
  {id:1, name:'Phiếu xuất', link:'warehouse_keeper/exports/list_exports'},
  {id:2, name:'Phiếu nhập', link:'warehouse_keeper/imports/list_imports'},
  {id:3, name:'Thêm vị trí lưu trữ', link:'warehouse_keeper/warehouse/add_storage_location'},
  {id:4, name:'Tìm vị trí lưu trữ', link:'warehouse_keeper/warehouse/find_storage_locations'},
  {id:5, name:'Thông tin kho', link:'warehouse_keeper/warehouse/warehouse_info'},
]

export default async function WarehouseKeeper_Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const cookieStore = cookies()
  // // const account = cookieStore.get('AccountId');
  // const role = cookieStore.get('Role')?.value;
  const jwt = cookieStore.get('jwt2')?.value;

  if(!jwt)
    { redirect('/'); return;}
    else
    {
    const role = await fetch(API.role, 
    { method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': jwt } });
    const data = await role.json();

    console.log("@@@check role")
  
    if(data.role==1)
      {redirect('/admin');
      return;}
    else 
    // if(data.role==2)
    //   {redirect('/warehouse_keeper');
    //   return;}
    // else 
    if(data.role==3)
      {redirect('/business');
      return;}
    else

    return <>
      <div className="sticky top-0 z-10">
      <TopBar pages={pages} childpages={childpages}/>
      </div>
      <div className="bg-slate-700 text-slate-300">
      {children}
      </div>
      </>
      }
  }