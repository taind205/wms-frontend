import { API } from '@/app/api/const';
import { NextResponse, type NextRequest } from 'next/server'
 
export async function POST(request: NextRequest) {
    const input = await request.json();
    console.log(input);
    const reqbody = {update_info:input}

    const res = await fetch(API.acc.update, 
    { method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json'} });
                
    const data = await res.json();
    console.log("UpdateAccount:");
    console.log(data);
    return NextResponse.json(data, { status: 200 })
}