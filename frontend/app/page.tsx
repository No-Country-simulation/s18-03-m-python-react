import { DashboardContainer, PersonnelManagementContainer } from "@/components/pages";
import { Toaster } from "@/components/ui";



export default function Home() {
  return (
    <section className='relative'>
      <PersonnelManagementContainer />
      <DashboardContainer />
      <Toaster />
    </section>
  );
}
