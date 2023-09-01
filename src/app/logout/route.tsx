import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
 
import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
    console.log('get a logout request...')
    // {cookies().delete('Role');
    // cookies().delete('fullName');}
    cookies().delete('jwt')
    redirect('/');
    // return NextResponse.json(data) 
    // }
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