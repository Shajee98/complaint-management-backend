import Department from "../../models/Department";
import User from '../../models/User'


export const getAllDepartments = async () => {
    try {
      const departments = await Department.findAll();
      
      return departments;
    } catch (error) {
      console.error(error);
    }
  };

export const getAllStaffs = async (department_id: number) => {
    try {
        const staffs = await User.findAll(
            {
                where: {department_id: department_id}
            }
        );
        
        return staffs;
      } catch (error) {
        console.error(error);
      }
}

const departmentService = {
    getAllDepartments,
    getAllStaffs
}

export default departmentService