import { NextResponse, type NextRequest } from 'next/server'
 
export async function POST(request: NextRequest) {
    const input = await request.json();
    input.password='123';
    console.log(input);
    const reqbody = {account_info:input}

    // const formData = await request.formData()
    // console.log(formData)
    // const reqbody= {
    //             "account_info":{
    //                 "fullName": formData.get('username'),
    //                 "gender": formData.get('gender'),
    //                 "email": formData.get('email'),
    //                 "accountID":formData.get('accountID'),
    //                 "role":formData.get('role'),
    //                 "password":'123' }
    //             }
    // console.log(reqbody);
    // console.log(JSON.stringify(reqbody));

    const res = await fetch('http://localhost:8080/admin/account/create', 
    { method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json'} });
                
    const data = await res.json();
    console.log("createAccount:");
    console.log(data);
    return NextResponse.json(data, { status: 200 })
}