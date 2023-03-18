import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive', 'dropped'],
    default: 'active',
  },
  enrolledAt: { type: Date, default: Date.now },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassTeacher' },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Student', studentSchema);
