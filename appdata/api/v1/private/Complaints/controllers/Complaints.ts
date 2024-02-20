import complaintService from "../../../../../../services/complaints/Complaints";
import responses from "../../../../../../constants/Responses";
import { RequestHandler } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../../../../../services/Response/Response";
import Attachment from "../../../../../../models/Attahcment";
import fs from "fs";
import path from "path";

export const createComplaint: RequestHandler = async (req, res, next) => {
  try {
    console.log("req...", req.body);
    const {
      customer_number,
      complaint_number,
      description,
      staff_id,
      department_id,
      complaint_status_id,
      complaint_type_id,
      fromWhatsapp,
      customer_name,
      attachments,
      created_by,
    } = req.body;
    console.log(
      "customer_number ",
      customer_number,
      "complaint_number ",
      complaint_number,
      "description ",
      description,
      staff_id,
      "department_id ",
      department_id,
      "complaint_status_id",
      complaint_status_id,
      "attachments",
      attachments
    );
    const complaint = await complaintService.createComplaint({
      customer_number,
      complaint_number,
      description,
      staff_id,
      department_id,
      complaint_status_id,
      complaint_type_id,
      fromWhatsapp,
      customer_name,
      created_by,
    });
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_CREATED);
    }

    if (req.files) {
      let files: any = req.files;
      await Promise.all(
        files.map(async (file: any) => {
          console.log("file ====> ", file);
          await Attachment.create({
            fileName: file.originalname,
            complaintId: complaint.id,
          });
        })
      );
    }

    return successResponse(res, { complaint });
  } catch (error) {
    next(error);
  }
};

export const updateComplaint: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("body => ", req.body);
    const complaint = await complaintService.updateComplaint(Number(id), {
      ...req.body,
    });
    console.log("complaint updated => ", complaint[1][0]);
    if (!complaint || complaint[0] == 0) {
      return serverErrorResponse(res, responses.NOT_UPDATED);
    }
    const oldAttachments = await Attachment.findAll({
      where: {
        complaint_id: id,
      },
    });
    console.log("oldAttachments => ", oldAttachments);

    let removeOldAttachments: any[] = [];
    let unremovedOldAttachments: any[] = [];
    if (JSON.parse(req.body?.unremovedOldAttachments).length != 0) {
      unremovedOldAttachments = JSON.parse(req.body?.unremovedOldAttachments);
      console.log("unremovedOldAttachments => ", unremovedOldAttachments);
      removeOldAttachments = oldAttachments.filter(item => !unremovedOldAttachments.includes(item.dataValues.fileName));
      console.log("removeOldAttachments => ", removeOldAttachments);
      if (removeOldAttachments.length != 0) {
        await Promise.all(
          removeOldAttachments.map(async (attachment) => {
            await Attachment.destroy({
              where: {
                id: attachment.dataValues.id,
              },
            });
            fs.unlink(`uploads/attachments/${attachment.fileName}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("File deleted successfully");
            });
          })
        );
      } else {
        console.log("no files changed");
      }
    } else {
      await Promise.all(
        oldAttachments.map(async (attachment) => {
          await Attachment.destroy({
            where: {
              id: attachment.dataValues.id,
            },
          });
          fs.unlink(
            `uploads/attachments/${attachment.dataValues.fileName}`,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("File deleted successfully");
            }
          );
        })
      );
    }

    // if (oldAttachments.length > files.length)
    // {
    //   for (let i = 0; i < files.length; i++) {
    //     let removeAttachments = oldAttachments.filter((attachment) => attachment.dataValues.file_name != files[i].originalname)
    //     await Promise.all(removeAttachments.map(async (attachment) => {
    //       await Attachment.destroy({
    //         where: {
    //           id: attachment.dataValues.id
    //         }
    //       })
    //     }))
    //   }
    // }
    // else if (files.length > oldAttachments.length)
    // {
    //   for (let i = 0; i < oldAttachments.length; i++) {
    //     let addAttachments = files.filter((file : any) => file.originalname != oldAttachments[i].dataValues.file_name)
    //     await Promise.all(addAttachments.map(async (attachment: any) => {
    //       await Attachment.create({
    //         fileName: attachment.originalname,
    //         complaintId: complaint[1][0].dataValues.id
    //       })
    //     }))
    //   }
    // }
    if (req.files) {
      let files: any = req.files;
      await Promise.all(
        files.map(async (file: any) => {
          console.log("file ====> ", file);
          await Attachment.create({
            fileName: file.originalname,
            complaintId: Number(id),
          });
        })
      );
    }
    return successResponse(res, { complaint });
  } catch (error) {
    next(error);
  }
};

export const getAllComplaints: RequestHandler = async (req, res, next) => {
  try {
    const { department_id, complaint_type_id, complaint_status_id } = req.query;
    console.log(
      "department_id ==> ",
      department_id,
      " complaint_type_id ===> ",
      complaint_type_id,
      " complaint_status_id ===> ",
      complaint_status_id
    );
    const user = req.user;
    const complaints = await complaintService.getAllComplaints(
      Number(department_id),
      Number(complaint_type_id),
      Number(complaint_status_id),
      user
    );
    if (!complaints) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    } else if (complaints.count == 0) {
      return successResponse(res, { complaints });
    }
    return successResponse(res, { complaints });
  } catch (error) {
    next(error);
  }
};

export const getAllSearchByKeyword: RequestHandler = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const complaints = await complaintService.getAllSearchByKeyword(
      String(keyword)
    );
    const responseData = complaints;
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllComplaintStatus: RequestHandler = async (req, res, next) => {
  try {
    const statuses = await complaintService.getAllComplaintStatus();
    if (!statuses) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, { statuses: statuses });
  } catch (error) {
    next(error);
  }
};

export const getComplaintById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.getComplaintById(Number(id));
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
    }
    // const output = fs.createWriteStream('files.zip');
    // let matchingFiles: any[] = []
    // complaint?.dataValues.attachments.map((attachment: any) => {
    //   fs.readdir("uploads\\attachments\\", async (err, files) => {
    //     if (err) {
    //       console.error(err);
    //       return
    //     }

    //     // Get information about each file
    //     const filePromises = files.map(file => {
    //       const filePath = path.join("uploads\\attachments\\", attachment.fileName);
    //       return new Promise((resolve, reject) => {
    //         fs.stat(filePath, (err, stats) => {
    //           if (err) {
    //             console.error(err);
    //             resolve(null);
    //           } else {
    //             resolve({
    //               name: file,
    //               type: f,
    //               size: stats.size,
    //               // Add more properties as needed
    //             });
    //           }
    //         });
    //       });
    //     });
    //     // const output = fs.createWriteStream('files.zip');
    //     // const archive = archiver('zip', {
    //     //   zlib: { level: 9 } // compression level
    //     // });
    //     // archive.pipe(output);
    //     await Promise.all(filePromises).then((fileObjects: any) => {
    //       // Filter files based on the provided filename
    //       matchingFiles = fileObjects.filter((fileObj: any) => fileObj?.name.includes(attachment.fileName));
    //       // matchingFiles.map((file: any) => {
    //         //     archive.file(file, { name: file });
    //         //   });

    //         //   archive.finalize();
    //       })
    //     })
    //   })
    //   console.log("matchingFiles ====> ", matchingFiles)
    return successResponse(res, { complaint });
  } catch (error) {
    next(error);
  }
};

const getComplaintsByMonth: RequestHandler = async (req, res, next) => {
  try {
    const { status_id, complaint_type_id } = req.query;
    const id = req.user?.id;
    const complaints = await complaintService.getComplaintsByMonths(
      Number(id),
      Number(status_id),
      Number(complaint_type_id)
    );
    const responseData = { ...complaints };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

export const getComments: RequestHandler = async (req, res, next) => {
  try {
    const { complaint_id } = req.query;
    const comments = await complaintService.getComments(Number(complaint_id));
    if (!comments) {
      return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
    }

    return successResponse(res, { comments });
  } catch (error) {
    next(error);
  }
};

export const addCommentToComplaint: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const { complaint_id, comment } = req.body;
    const complaint = await complaintService.addCommentToComplaint(
      Number(complaint_id),
      Number(id),
      comment
    );
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
    }

    return successResponse(res, { complaint });
  } catch (error) {
    next(error);
  }
};

const complaintController = {
  createComplaint,
  updateComplaint,
  getAllComplaints,
  getComplaintById,
  getComments,
  getAllComplaintStatus,
  getComplaintsByMonth,
  addCommentToComplaint,
  getAllSearchByKeyword,
};

export default complaintController;
