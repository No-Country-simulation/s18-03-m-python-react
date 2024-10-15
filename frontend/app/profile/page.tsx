import { Toaster } from "@/components/atoms";
import ProfileCard from "@/components/molecules/ProfileCard/ProfileCard";

export default function profile() {
  return (
    <div className="relative container">
      <ProfileCard />
      <Toaster />
    </div>
  );
}
