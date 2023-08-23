import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

 
export async function POST(request: NextRequest) {
    const cookieStore = cookies()
    const jwt = cookieStore.get('jwt')?.value||'';
    console.log('get jwt', jwt);
    console.log('get a post request...')
    const input = await request.json();
    console.log(input);
    const q1 = input.n || 0;
    const q2 = input.accountID ? '&accountID='+input.accountID : '';
    const q3 = input.fullName ? '&fullName='+input.fullName : '';
    const q4 = input.role ? '&role='+input.role : '';
    const q5 = input.status ? '&status='+input.status : '';
    console.log("start fetch"+'/account/load/'+q1+'?'+q2+q3+q4+q5);
    const res = await fetch('http://localhost:8080/admin/account/load/'+q1+'?'+q2+q3+q4+q5, {
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

export async function getFirstPage() {

    const res = await fetch('http://localhost:8080/admin/account/load/0', {  cache: 'no-store',
            headers: {'Content-Type': 'application/json',}, });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    else{
    const data = await res.json();
    console.log("Fetch complete ! ... ",data);
    return data
    }
}
    
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
