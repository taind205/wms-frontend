import Image from 'next/image'
import { Input_Text } from './components/input_field'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginForm } from './components/input_form'
import { API } from './api/const'


export default async function Home() {

  const cookieStore = cookies()
  // // const account = cookieStore.get('AccountId');
  // const role = cookieStore.get('Role')?.value;
  const jwt = cookieStore.get('jwt')?.value;

  if(jwt)
  {
  const role = await fetch(API.role, 
  { method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': jwt } });
  const data = await role.json();

  if(data.role==1)
    {redirect('./admin');
    return;}
  else if(data.role==2)
    {redirect('/warehouse_keeper');
    return;}
  else if(data.role==3)
    {redirect('/business');
    return;}
  }
  else
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 space-x-16 bg-slate-800">
      <div>
        <Image className='mx-8 self-center' src='/icon/warehouse.png' width={480} height={160} alt="App icon"/>
        <div className='text-2xl text-center'>Hệ thống quản lý kho hàng</div>
      </div>
      <div className='flex flex-col items-center justify-center bg-slate-900 px-4 py-16 space-y-12 rounded-3xl w-1/3'>
        <Image className='mx-8 self-center' src='/icon/login.png' width={128} height={128} alt="Login icon"/>
        <LoginForm/>
      </div>
    </main>
  )
}
