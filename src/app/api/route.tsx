import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const domain = 'http://localhost:8080';
const path:any = {warehouse:'/admin/warehouse/load', store:''}

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const jwt = cookieStore.get('jwt')?.value||'';
    console.log('get jwt', jwt);
    console.log('get request...',request.nextUrl.searchParams);
    const fetch_api = path[request.nextUrl.searchParams.get('get')||'']+'?'+request.nextUrl.searchParams.toString();
    console.log("start fetch"+fetch_api);
    const res = await fetch(domain+fetch_api, {
        cache: 'no-store' , headers: {'Content-Type': 'application/json', 'Authorization': jwt}, });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
        }
    else{
    const data = await res.json();
    console.log("Fetch complete ! ... "+data);
    return NextResponse.json(data, { status: 200 }) 
    }
}

// export async function getFirstPage() {

//     const res = await fetch('http://localhost:8080/admin/account/load/0', {  cache: 'no-store',
//             headers: {'Content-Type': 'application/json',}, });
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//     else{
//     const data = await res.json();
//     console.log("Fetch complete ! ... ",data);
//     return data
//     }
// }
    
    // const input = await request.json();
    // input.password='123';
    // console.log(input);
    // const reqbody = {account_info:input}

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

    // return NextResponse.json(data, { status: 200 })
