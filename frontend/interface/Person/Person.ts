// Interfaz para el empleado
export interface Employee {
    start_date: string ;   // Fecha de inicio en formato ISO
    department: string;   // Departamento donde trabaja
    team?: string[];  // Equipo al que pertenece (puede ser null)
    role: string;         // Rol del empleado (se puede mejorar si hay más detalles sobre los roles)
    salary: number ;       // Salario del empleado
    working_day: string;
    vacation_days: string;
    active_employee: boolean;
    // Descripción del horario laboral
  }
  
  // Interfaz principal
  export interface Person {
    pk: number;                         // Identificador único (primary key)
    dni: string;                        // Número de documento de identidad (DNI)
    phone_number: string;               // Número de teléfono
    birth: string;                      // Fecha de nacimiento en formato ISO (YYYY-MM-DD)
    profile_picture: File | null;     // URL de la foto de perfil o null
    country: string;                    // País de residencia
    province: string;                   // Provincia
    city: string;                       // Ciudad
    address: string;                    // Dirección
    bank: string;                       // Nombre del banco
    bank_account_type: string;          // Tipo de cuenta bancaria (por ejemplo, Caja de Ahorro)
    bank_account_number: string | null | undefined;        // Número de la cuenta bancaria
    email: string;                      // Correo electrónico
    first_name: string;                 // Primer nombre
    last_name: string;                  // Apellido
    employee?: Employee;
    status?: string;                    // Información adicional del empleado
  }
  