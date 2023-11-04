import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
 
import { NextResponse, type NextRequest } from 'next/server'
import { API } from '../api/const';
 
export async function POST(request: NextRequest) {
    console.log('get a post request...')
    const input = await request.json();
    console.log(input);
    // const q1 = input.n || 0;
    // const q2 = input.accountID ? '&accountID='+input.accountID : '';
    // const q3 = input.fullName ? '&fullName='+input.fullName : '';
    // const q4 = input.role ? '&role='+input.role : '';
    // const q5 = input.status ? '&status='+input.status : '';
    console.log("start fetch"+'/login/');//+q1+'?'+q2+q3+q4+q5);
    const res = await fetch(API.login//+q1+'?'+q2+q3+q4+q5, 
    ,{ method:'POST', body: JSON.stringify(input), headers: {'Content-Type': 'application/json',}, });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
        }
    else{
    
    const data = await res.json();
    console.log("Fetch complete ! ... ",data);
    if(!data.stt) 
    {
    cookies().set({
        name: 'jwt',
        value: data.jwt,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      })
    }
    
    return NextResponse.json(data);
    }
}

// export async function getFirstPage() {

//     const res = await fetch('http://localhost:8080/admin/account/load/0', {
//             headers: {'Content-Type': 'application/json',}, });
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//     else{
//     const data = await res.json();
//     console.log("Fetch complete ! ... "+data);
//     return data
//     }
// }