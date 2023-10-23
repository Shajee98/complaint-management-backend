import { Op } from "sequelize";
import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import Attachment from "../../models/Attahcment";
import Comment from "../../models/Comments";
import Complaint from "../../models/Complaint"
import ComplaintStatus from "../../models/ComplaintStatus";
import Department from "../../models/Department";
import User from '../../models/User'
import UserRoleType from "../../models/UserType";


export const createComplaint = async (complaintDetails: any) => {
  try {
    let complaint: any
    const { customer_number, complaint_number, description, staff_id, department_id, complaint_status_id } = complaintDetails
    await sequelize.transaction(async (t) => {
        complaint = await Complaint.create({
          customerNumber: customer_number,
          complaintNumber: complaint_number,
          description,
          departmentId: department_id,
          userId: staff_id,
          complaintStatusId: complaint_status_id,
          complaintTypeId: 1
        })
    })
    
    return complaint
  } catch (error) {
    throw error
  }
};

export const updateComplaint = async (id: number, complaintDetails: any) => {
  try {
    const complaintUpdated = await Complaint.update(
      { ...complaintDetails },
      {
        where: {
          complaintNumber: id,
        },
      }
    );

    return complaintUpdated;
  } catch (error) {
    throw error;
  }
};

export const getAllComplaints = async (department_id: number, complaint_type_id: number,  user?: any) => {
  try {
    let complaints
    const user_role_id = user?.user_type_id
    const user_id = user?.id
    console.log("user_role_id ==> ", user_role_id)
    switch (user_role_id) {
      case 3:
        console.log("Helllooooooooo // 3")
        complaints = await Complaint.findAndCountAll({
          where: {
            // departmentId: department_id,
            userId: user_id,
            complaintTypeId: complaint_type_id
          },
          include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
          order: [["id", "desc"]],
        })
        break;
      case 2:
        console.log("Helllooooooooo // 2")
        complaints = await Complaint.findAndCountAll({
          where: {
            departmentId: department_id,
            complaintTypeId: complaint_type_id
          },
          include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
          order: [["id", "desc"]],
        })
        break;
      case 1:
        console.log("Helllooooooooo // 1")
        complaints = await Complaint.findAndCountAll({
          where: {
            departmentId: department_id,
            complaintTypeId: complaint_type_id
          },
          include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
          order: [["id", "desc"]],
        })
        break;
      default:
        console.log("Default case");
        break;
    }
    
    return complaints;
  } catch (error) {
    console.error(error);
  }
};

export const getAllComplaintStatus = async () => {
  try {
    const statuses = await ComplaintStatus.findAll();
    
    return statuses;
  } catch (error) {
    console.error(error);
  }
};


export const getComplaintById = async (id: number) => {
  try {
    console.log({ id });
    const orders = await Complaint.findOne({
      include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: Department, as: "department"}, {model: ComplaintStatus, as: "complaint_status"}, {model: Attachment, as: "attachments"}],
      where: {
        id
        },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getComplaintsByMonths = async (userId: number, status_id: number) => {
  try {
    console.log('Getting Complaints By Month')
    const complaints = await Complaint.findAll({
      where: {
        user_id: userId,
        complaint_status_id: status_id
      },
      include: [{
        model: ComplaintStatus,
        as: 'complaint_status'
      }],
      attributes: [
        // [sequelize.fn('DATE', sequelize.col('created_at')), 'createdAt'],
        [
          sequelize.literal("(SELECT COUNT(*) FROM complaints WHERE complaints.complaint_status_id = complaint_status.id)"), 'complaintCount'
        ]
      ],
      // order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']],
      // group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      raw: true
    })
    return {
      complaints: complaints,
    }
  } catch (error) {
    console.error(error);
  }
}

export const getComments = async (complaint_id: number) => {
  try {
    const comments = await Comment.findAll({
      where: {
        complaintId: complaint_id,
        // userId: user_id
      },
      include: [{
        model: User,
        as: "user"
      }]
    })
    return comments
  } catch (error) {
    console.error(error)
  }
}

export const getAllSearchByKeyword = async (keyword: string) => {
      try {
        const complaints = await Complaint.findAll({
          include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
          where: {
            customerNumber: {
              [Op.iLike]: "%" + keyword + "%"
            }
          },
          order: [['updated_at', 'DESC']]
        });
        return {
          complaints: complaints,
        };
      } catch (error) {
        console.error(error);
      }
};

export const addCommentToComplaint = async (complaint_id: number, user_id: number, comment: string) => {
  try {
    let new_comment
    await sequelize.transaction(async (t) => {

      new_comment = await Comment.create({
        comment,
        complaintId: complaint_id,
        userId: user_id
      });
    })

    return comment;
  } catch (error) {
    throw error;
  }
};

const complaintService = {
    createComplaint,
    updateComplaint,
    getAllComplaints,
    getComplaintById,
    getComments,
    addCommentToComplaint,
    getAllComplaintStatus,
    getComplaintsByMonths,
    getAllSearchByKeyword
}

export default complaintService