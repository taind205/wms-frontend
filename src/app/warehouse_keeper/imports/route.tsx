import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./imports/list_imports')
}