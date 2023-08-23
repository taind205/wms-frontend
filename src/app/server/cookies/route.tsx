import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const v = cookies().get(name||'')?.value;
  console.log('get cookies from server',v);
  return NextResponse.json(v);
// return v;
}