import ComplaintType from "./ComplaintType";
import Complaint from "./Complaint";
import ComplaintStatus from "./ComplaintStatus";
import Department from "./Department";
import User from "./User";
import Attachment from "./Attahcment";
import UserType from "./UserType";
import Comment from "./Comments";

User.belongsTo(UserType, {foreignKey: "user_type_id", as: "user_type"})

UserType.hasMany(User, { foreignKey: 'user_type_id' });

Department.hasMany(Complaint, { foreignKey: 'department_id' }); 

Complaint.belongsTo(Department, { foreignKey: 'department_id' });


Complaint.belongsTo(User, { foreignKey: 'user_id' });

Complaint.hasOne(ComplaintStatus, {foreignKey: "complaint_status_id"})

ComplaintStatus.hasMany(Complaint, { foreignKey: 'complaint_status_id' });

Complaint.hasOne(ComplaintType, { foreignKey: 'complaint_type_id' });

ComplaintType.hasMany(Complaint, { foreignKey: 'complaint_type_id' });

Comment.belongsTo(Complaint, {foreignKey: "complaint_id"})

Complaint.hasMany(Comment, {foreignKey: "complaint_id"})

Attachment.belongsTo(Complaint, {foreignKey: "complaint_id"})

Complaint.hasMany(Attachment, {foreignKey: "complaint_id"})






