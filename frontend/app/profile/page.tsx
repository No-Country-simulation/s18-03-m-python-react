import { Toaster } from "@/components/ui";
import ProfileCard from "@/components/views/ProfileCard/ProfileCard";

export default function profile() {
  return (
    <div className='relative container'>
      <ProfileCard />
      <Toaster />
    </div>
  )
}
