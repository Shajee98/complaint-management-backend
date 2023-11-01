import ComplaintType from "./ComplaintType";
import Complaint from "./Complaint";
import ComplaintStatus from "./ComplaintStatus";
import Department from "./Department";
import User from "./User";
import Attachment from "./Attahcment";
import UserType from "./UserType";
import Comment from "./Comments";

User.belongsTo(UserType, {foreignKey: "user_type_id", as: "user_type"})

User.belongsTo(Department, {foreignKey: "department_id", as: "department"})

UserType.hasMany(User, { foreignKey: 'user_type_id' });

Department.hasMany(Complaint, { foreignKey: 'department_id' });

Department.hasMany(User, { foreignKey: 'department_id' }); 

Complaint.belongsTo(Department, { foreignKey: 'department_id', as: "department" });


Complaint.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Complaint.belongsTo(ComplaintStatus, { foreignKey: 'complaint_status_id', as: 'complaint_status' })

// ComplaintStatus.hasMany(Complaint, { foreignKey: 'complaint_status_id' });

Complaint.belongsTo(ComplaintType, { foreignKey: 'complaint_type_id', as: "complaint_type" });

// ComplaintType.hasMany(Complaint, { foreignKey: 'complaint_type_id' });

Comment.belongsTo(Complaint, {foreignKey: "complaint_id"})

Comment.belongsTo(User, {foreignKey: "user_id", as: "user"})

Complaint.hasMany(Comment, {foreignKey: "complaint_id"})

Attachment.belongsTo(Complaint, {foreignKey: "complaint_id"})

Complaint.hasMany(Attachment, {foreignKey: "complaint_id", as: "attachments"})






