import { getProfile, getFeaturedProjects } from "@/lib/data"
import HomeClient from "@/components/HomeClient"

export const revalidate = 60

export default async function HomePage() {
  const profile = await getProfile()
  const projects = await getFeaturedProjects()
  
  return <HomeClient profile={profile} projects={projects} />
}
