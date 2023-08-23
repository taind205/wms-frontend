import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./accounts/find_accounts')
}