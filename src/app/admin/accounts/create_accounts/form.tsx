'use client'

import { Input_Option, Input_Text } from "@/app/components/input_field"
import { postFormData } from "@/app/func/form_action"

export default function Form() {
    // const handleSubmit = async () => {
    //     const reqbody= {
    //         account_info:{
    //             fullName: document.getElementById('username')?.innerHTML.valueOf,
    //             gender: document.getElementById('gender')?.innerHTML.valueOf,
    //             email:document.getElementById('email')?.innerHTML.valueOf,
    //             accountID:document.getElementById('accountID')?.innerHTML.valueOf,
    //             role:document.getElementById('role')?.innerHTML.valueOf,
    //             password:'123' }
    //         }
    //     console.log('bodyreq:::::::;')
    //     console.log(reqbody);
    //     const msg =  await fetch('./api', {
    //         method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json',}, });
    //     alert(msg);
    //   }    
      
    // const formSubmit = async (event:any) => {
    //     console.log("submit")
    //     event.preventDefault();
    //     var data = new FormData(event.target);
    //     let formObject = Object.fromEntries(data.entries());
    //     const res = await fetch('./api/create', 
    //     { method: 'POST', body: JSON.stringify(formObject), headers: {'Content-Type': 'application/json'} });
    //     const d = await res.json();
    //     console.log(d);
    //     alert(d.msg);
    //   }
      
    return (
        <div className="ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Tạo tài khoản mới</h1>
            <form method="post" id="create_account_form" onSubmit={(e) => 
                        postFormData(e,'./api/create')}>
                <div className="my-4 flex flex-row justify-center space-x-8">
                  <div className="">
                    <Input_Text label="Tên tài khoản:" placeholder="..." name='accountID'/>
                    <Input_Text label="Họ tên người dùng:" placeholder="..." name='fullName'/>
                    <Input_Option label="Giới tính:" name="gender" form="create_account_form" options={[
                            {value:"0",name:"Nam"}, {value:"1",name:"Nữ"}
                          ]} />
                  </div>
                  <div className="">
                    <Input_Text label="Email tài khoản:" placeholder="..." name='email'/>
                    <Input_Option label="Loại tài khoản:" name="role" form="create_account_form" options={[
                            {value:"1",name:"Admin"}, {value:"2",name:"Thủ kho"},
                            {value:"3",name:"Nhân viên kinh doanh"},
                          ]} />
                  </div>
                </div>
                <div className="flex justify-center	">
                  <button type="submit" className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tạo tài khoản</button>
                </div>
            </form>

          
        </div>
    )
}