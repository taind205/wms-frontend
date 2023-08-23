import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('./exports/create_export')
}