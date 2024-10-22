import { Person } from "@/interface/Person/Person";

export const formatDataForBackend = (data: Partial<Person>): Person => {
    const formatDate = (date?: string | null) =>
      date ? new Date(date).toISOString().split('T')[0] : null;
  
    return {
      pk: data.pk ?? 0,
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      dni: data.dni ?? "",
      phone_number: data.phone_number ?? "",
      email: data.email ?? "",
      birth: formatDate(data.birth) ?? "", // Convertir fecha de nacimiento a 'YYYY-MM-DD'
      address: data.address ?? "",
      country: data.country ?? "",
      province: data.province ?? "",
      city: data.city ?? "",
      bank: data.bank ?? "",
      bank_account_type: data.bank_account_type ?? "",
      bank_account_number: data.bank_account_number ?? "",
      profile_picture: data.profile_picture || null,
      ...(data.employee && {
        employee: {
          start_date: formatDate(data.employee.start_date) ?? '',
          department: data.employee.department ?? '',
          role: data.employee.role ?? '',
          salary: data.employee.salary ?? '',
          working_day: data.employee.working_day ?? '',
          team: data.employee.team ?? [],
        },
      }),
    };
  };
  