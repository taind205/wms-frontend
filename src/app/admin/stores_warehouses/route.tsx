import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./stores_warehouses/create_warehouse')
}