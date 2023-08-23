import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./warehouse/warehouse_info')
}