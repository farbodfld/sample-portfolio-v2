import { getProfile, getSkills, getExperiences } from "@/lib/data"
import AboutClient from "@/components/AboutClient"

export const revalidate = 60

export default async function AboutPage() {
  const [profile, skills, experiences] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences()
  ])
  
  return <AboutClient profile={profile} skills={skills} experiences={experiences} />
}
