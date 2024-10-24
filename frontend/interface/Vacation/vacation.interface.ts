export interface vacation {
  pk: number;
  employee: number;
  start: Date;
  end: Date;
  status: string;
  message?: string | null;
}

//only post petitions
export interface vacationresponse {
  vacation: number;
  status: boolean;
  message?: string | null;
}
