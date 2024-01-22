import { Model, Op } from "sequelize";
import sequelize from "../../config/db.config"
import Attachment from "../../models/Attahcment";
import Comment from "../../models/Comments";
import Complaint from "../../models/Complaint"
import ComplaintStatus from "../../models/ComplaintStatus";
import Department from "../../models/Department";
import User from '../../models/User'
import UserRoleType from "../../models/UserType";
import ComplaintType from "../../models/ComplaintType";
import WhatsappResponse from "../../models/WhatsappResponse";
import WhatsappMessage from "../../models/WhatsappMessage";
import archiver from "archiver";
import fs from 'fs'
import path from "path";


export const createComplaint = async (complaintDetails: any) => {
  try {
    let complaint: any
    const { customer_number, description, staff_id, department_id, complaint_status_id, complaint_type_id, fromWhatsapp, customer_name, created_by } = complaintDetails
        complaint = await Complaint.create({
          customerNumber: customer_number,
          description,
          departmentId: department_id == "" ? null : department_id,
          userId: staff_id == "" ? null : staff_id,
          complaintStatusId: complaint_status_id,
          complaintTypeId: complaint_type_id,
          fromWhatsapp: fromWhatsapp == "true" ? true : false,
          customerName: customer_name,
          createdBy: created_by
        })

    return complaint
  } catch (error) {
    throw error
  }
};

export const updateComplaint = async (id: number, complaintDetails: any) => {
  try {
    console.log("complaintDetails ===? ", complaintDetails)
    const complaintUpdated = await Complaint.update(
      {
        customerNumber: complaintDetails.customer_number,
        description: complaintDetails.description,
        departmentId: complaintDetails.department_id == "" ? null : complaintDetails.department_id,
        userId: complaintDetails.staff_id == "" ? null : complaintDetails.staff_id,
        complaintStatusId: complaintDetails.complaint_status_id,
        complaintTypeId: complaintDetails.complaint_type_id,
        customerName: complaintDetails.customer_name
      },
      {
        where: {
          id: id,
        },
        returning: true
      }
    );

    return complaintUpdated;
  } catch (error) {
    throw error;
  }
};

export const getAllComplaints = async (department_id: number | null, complaint_type_id: number, complaint_status_id: number, user?: any) => {
  try {
    let complaints:  {rows: Model<any, any>[]; count: number; } = {rows: [], count: 0}
    const user_role_id = user?.user_type_id
    const user_id = user?.id
    console.log("user_role_id ==> ", user_role_id)
    switch (user_role_id) {
      case 3:
        console.log("Helllooooooooo // 3")
        if (complaint_status_id == 1)
        {
          complaints = await Complaint.findAndCountAll({
            where: {
              complaintTypeId: complaint_type_id,
              departmentId: department_id,
              userId: user_id,
            },
            include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
            order: [["id", "desc"]],
          })   
        }
        else
        {
          complaints = await Complaint.findAndCountAll({
            where: {
              departmentId: department_id,
              userId: user_id,
              complaintTypeId: complaint_type_id,
              complaintStatusId: complaint_status_id
            },
            include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
            order: [["id", "desc"]],
          })
        }
        break;
      case 2:
        console.log("Helllooooooooo // 2")
        console.log("department_id ===>", typeof department_id)
        if (department_id == 4)
        {
          if (complaint_status_id == 1)
          {
            complaints = await Complaint.findAndCountAll({
              where: {
                complaintTypeId: complaint_type_id,
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })   
          }
          else {
            complaints = await Complaint.findAndCountAll({
              where: {
                // complaintTypeId: complaint_type_id == null ? {[Op.in]: [1,2]} : complaint_type_id,
                complaintTypeId: complaint_type_id,
                complaintStatusId: complaint_status_id
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })
          }
        }
        else if (department_id == 0)
        {
          if (complaint_status_id == 1)
          {
            complaints = await Complaint.findAndCountAll({
              where: {
                departmentId: null,
                // complaintTypeId: complaint_type_id == null ? {[Op.in]: [1,2]} : complaint_type_id,
                complaintTypeId: complaint_type_id,
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })
          }
          else {
            complaints = await Complaint.findAndCountAll({
              where: {
                departmentId: null,
                // complaintTypeId: complaint_type_id == null ? {[Op.in]: [1,2]} : complaint_type_id,
                complaintTypeId: complaint_type_id,
                complaintStatusId: complaint_status_id
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })
          }
        }
        else 
        {
          if (complaint_status_id == 1)
          {
            complaints = await Complaint.findAndCountAll({
              where: {
                departmentId: department_id,
                complaintTypeId: complaint_type_id,
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })
          }
          else {
            complaints = await Complaint.findAndCountAll({
              where: {
                departmentId: department_id,
                // complaintTypeId: complaint_type_id == null ? {[Op.in]: [1,2]} : complaint_type_id,
                complaintTypeId: complaint_type_id,
                complaintStatusId: complaint_status_id
              },
              include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
              order: [["id", "desc"]],
            })
          }
        }
        break;
      case 1:
        console.log("Helllooooooooo // 1")
        if (complaint_status_id == 1)
        {
          complaints = await Complaint.findAndCountAll({
            where: {
              departmentId: department_id,
              complaintTypeId: complaint_type_id,
            },
            include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
            order: [["id", "desc"]],
          })
        }
        else {
          complaints = await Complaint.findAndCountAll({
            where: {
              departmentId: department_id,
              complaintTypeId: complaint_type_id,
              complaintStatusId: complaint_status_id
            },
            include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: ComplaintStatus, as: 'complaint_status'}, {model: Department, as: "department"}],
            order: [["id", "desc"]],
          })
        }
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
    // await sequelize.transaction(async (t) => {
    const complaint = await Complaint.findOne({
      include: [{ model: User, as: 'user', include: [{ model: UserRoleType, as: 'user_type' }] }, {model: Department, as: "department"}, {model: ComplaintStatus, as: "complaint_status"}, {model: Attachment, as: "attachments"}, {model: ComplaintType, as: "complaint_type"}],
      where: {
        id
        },
    });
    // const attachments = await Attachment.findAll({
    //   where: {
    //     complaintId: complaint.complaint.id
    //   }
    // })
    // // const directoryPath = path.join(__dirname, 'uploads/');
    // const files = fs.readdir("D:\\Personal Projects\\complaint-backend\\uploads", (err, files) => {
    //   if (err) {
    //     return console.log('Unable to scan directory: ' + err);
    // } 
    //listing all files using forEach
    // const attachmentMatched = attachments.map((attachment) => {
    //   for (const file in files)
    //   {
    //     if (file == attachment.dataValues.fileName)
    //     {
    //      return file
    //     }
    //   }
    //   });
    //   complaint.attachment = attachmentMatched
    // })
    // })
    return complaint;
  } catch (error) {
    throw error;
  }
};

const getComplaintsByMonths = async (userId: number, status_id: number, complaint_type_id: number) => {
  try {
    console.log('Getting Complaints By Month')
    const complaints = await Complaint.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('created_at')), 'created_at'],
        [
          sequelize.literal(`SUM(CASE WHEN complaint_status_id = ${status_id} THEN 1 ELSE 0 END)`),
          'statusCount'
        ],
        // Add more dynamic columns for other order types if needed
        [
          sequelize.fn('count', sequelize.col('complaint_status_id')),
          'count'
        ],
      ],
      where: {
        complaintTypeId: complaint_type_id
      },
      // order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'DESC']],
      //order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'ASC']],

      group: [sequelize.fn('DATE', sequelize.col('created_at'))],
      raw: true
    })
    
    console.log(complaints);
    return {
      complaints: complaints,
    }
  } catch (error) {
    console.error(error);
  }
}

// const getComplaintsByMonths = async (userId: number, status_id: number) => {
//   try {
//     console.log('Getting Complaints By Month')
//     const complaints = await Complaint.findAll({
//       where: {
//         user_id: userId,
//         complaint_status_id: status_id
//       },
//       include: [{
//         model: ComplaintStatus,
//         as: 'complaint_status'
//       }],
//       attributes: [
//         [sequelize.fn('DATE', sequelize.col('complaint.created_at')), 'abc'],
//         // [
//         //   sequelize.literal(`SUM(CASE WHEN complaint_status_id = 1 THEN 1 ELSE 0 END)`),
//         //   'open'
//         // ],
//         // [
//         //   sequelize.literal(`SUM(CASE WHEN complaint_status_id = 2 THEN 1 ELSE 0 END)`),
//         //   'resolved'
//         // ],
//         // [
//         //   sequelize.literal(`SUM(CASE WHEN complaint_status_id = 3 THEN 1 ELSE 0 END)`),
//         //   'in_progress'
//         // ],
//         // [
//         //   sequelize.literal(`SUM(CASE WHEN complaint_status_id = 4 THEN 1 ELSE 0 END)`),
//         //   'cancelled'
//         // ],
//         // Add more dynamic columns for other order types if needed
//         [
//           sequelize.fn('count', sequelize.col('complaint.complaint_status_id')),
//           'count'
//         ],
//       ],
//       // attributes: [
//       //   [sequelize.fn("MONTH", sequelize.col("created_at")), "month"],
//       //   [sequelize.fn("COUNT", sequelize.col("id")), "count"],
//       // ],
//       // attributes: [
//         // [sequelize.fn('DATE', sequelize.col('created_at')), 'created_at'],
//         // [
//         //   sequelize.literal("(SELECT COUNT(*) FROM complaints WHERE complaints.complaint_status_id = complaint_status.id)"), 'complaintCount'
//         // ]
//       // ],
//       order: [[sequelize.fn('DATE', sequelize.col('complaint.created_at')), 'ASC']],
//       group: [sequelize.fn('DATE', sequelize.col('complaint.created_at'))],
//       raw: true
//     })
//     return {
//       complaints: complaints,
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

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
      await Comment.create({
        comment,
        complaintId: complaint_id,
        userId: user_id
      });

    return comment;
  } catch (error) {
    throw error;
  }
};

export const YesOrNo = async (whatsapp_response: number, customerNumber: string, complaint_type_id: any) => {
  try {
      let response
      if (whatsapp_response == 1)
      {
        response = "Yes"
      }
      else {
        response = "No"
      }

      const saved_response = await WhatsappResponse.create({
        response,
        customerNumber,
        complaintTypeId: complaint_type_id
      });

    return saved_response;
  } catch (error) {
    throw error;
  }
};

const YesOrNoCount = async (complaint_type_id: any) => {
  try {
    const responses = await WhatsappResponse.findAll({
      attributes: [
        [
          sequelize.literal(`SUM(CASE WHEN response = 'Yes' THEN 1 ELSE 0 END)`),
          'positive'
        ],
        [
          sequelize.literal(`SUM(CASE WHEN response = 'No' THEN 1 ELSE 0 END)`),
          'negetive'
        ],
      ],
      where: {
        complaintTypeId: complaint_type_id
      }
    });

    return {responses};
  } catch (error) {
    throw error;
  }
}

const SetWhatsappMessageFormat = async (message: string) => {
  try {
    const format = await WhatsappMessage.update({message: message}, {
      where: {
        id: 1
      }
    });

  return format;
} catch (error) {
  throw error;
}
}

const WhatsappMessageFormat = async () => {
  try {
    const format = await WhatsappMessage.findAll();

  return format;
} catch (error) {
  throw error;
}
}

const complaintService = {
    createComplaint,
    updateComplaint,
    getAllComplaints,
    getComplaintById,
    getComments,
    addCommentToComplaint,
    getAllComplaintStatus,
    getComplaintsByMonths,
    getAllSearchByKeyword,
    YesOrNo,
    YesOrNoCount,
    WhatsappMessageFormat,
    SetWhatsappMessageFormat
}

export default complaintService