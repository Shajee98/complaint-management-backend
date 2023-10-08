import sequelize from "../../config/db.config"
import responses from "../../constants/Responses"
import Attachment from "../../models/Attahcment";
import Comment from "../../models/Comments";
import Complaint from "../../models/Complaint"
import ComplaintStatus from "../../models/ComplaintStatus";
import User from '../../models/User'
import UserRoleType from "../../models/UserType";


export const createComplaint = async (complaintDetails: any) => {
  try {
    let complaint
    const { customer_number, complaint_number, description, staff_id, department_id, status_id, attachments } = complaintDetails
    await sequelize.transaction(async (t) => {
        complaint = await Complaint.create({
          customer_number,
          complaint_number,
          description,
          department_id,
          staff_id,
          status_id
        })
        await Attachment.create({
            
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

export const getAllComplaints = async (userId: number | undefined, offset: number, limit = 10, ord = "desc") => {
  try {
    const complaints = await Complaint.findAndCountAll({
      where: {
        userId,
      },
      include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }],
      offset,
      limit,
      order: [["id", ord]],
    });
    
    return complaints;
  } catch (error) {
    console.error(error);
  }
};

export const getAllComplaintStatus = async () => {
  try {
    const complaints = await ComplaintStatus.findAll();
    
    return complaints;
  } catch (error) {
    console.error(error);
  }
};


export const getComplaintById = async (id: number) => {
  try {
    console.log({ id });
    const orders = await Complaint.findOne({
      include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }],
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
    const nfts = await Complaint.findAll({
      where: {
        user_id: userId,
        complaint_status_id: status_id
      },
      include: [{
        model: ComplaintStatus,
        as: 'complaint_status'
      }],
      attributes: [
        [sequelize.fn('DATE', sequelize.col('updated_at')), 'updated_at'],
        [
          sequelize.literal("(SELECT COUNT(*) FROM complaint WHERE complaint.complaint_status_id = complaint_status.id)"), 'complaintCount'
        ]
      ],
      order: [[sequelize.fn('DATE', sequelize.col('updated_at')), 'ASC']],
      group: [sequelize.fn('DATE', sequelize.col('updated_at'))],
      raw: true
    })
    return {
      nfts: nfts,
    }
  } catch (error) {
    console.error(error);
  }
}

export const addCommentToComplaint = async (complaint_id: number, user_id: number, comment: string) => {
  try {
    let comments
    await sequelize.transaction(async (t) => {

      await Comment.create({
        comment,
        complaint_id,
        user_id
      });
      comments = await Comment.findAll({
        where: {complaint_id: complaint_id}
      })
    })

    return comments;
  } catch (error) {
    throw error;
  }
};

const complaintService = {
    createComplaint,
    updateComplaint,
    getAllComplaints,
    getComplaintById,
    addCommentToComplaint,
    getAllComplaintStatus,
    getComplaintsByMonths
}

export default complaintService