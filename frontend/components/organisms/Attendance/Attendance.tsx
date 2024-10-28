import { HeaderContainer } from "@/components/molecules"
import { PersonnelAttendanceCardList } from "@/components/molecules/AtthendanceControlCardList/AttendanceControlCardList"


function Attendance() {
  return (
    <div>
       <HeaderContainer titlePage="Control de asistencias" />
      <PersonnelAttendanceCardList   />  
      
    </div>
  )
}

export default Attendance
