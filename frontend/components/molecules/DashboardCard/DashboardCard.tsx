import { Card, CardContent, CardTitle } from "@/components/atoms";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  // types...
}
export const DashboardCard = ({ title, icon }: Props) => {
  return (
    <Card className="h-40 rounded-lg hover:scale-110 active:scale-100 transition-transform duration-200">
      <CardContent className="flex items-center justify-center p-4 h-full">
        <div className="justify-center flex-shrink-0 m-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardContent>
    </Card>
  );
};
