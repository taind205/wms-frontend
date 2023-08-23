import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./products/find_products')
}