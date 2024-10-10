import { Card, CardContent, CardTitle } from '@/components/ui';
import { ReactNode } from 'react';

interface Props {
  title: string;
  icon: ReactNode;
	// types...
}
export const DashboardCard = ({ title, icon }: Props) => {
  return(
    <Card className="h-40 rounded-lg">
      <CardContent className="flex items-center justify-center p-4 h-full">
        <div className="justify-center flex-shrink-0 m-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardContent>
    </Card>
  )
}
