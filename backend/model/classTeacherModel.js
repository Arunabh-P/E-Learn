import mongoose from 'mongoose';
const { Schema } = mongoose;

const classTeacherSchema = new Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  gradeLevel: { type: Number, required: true },
  classSection: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ClassTeacher', classTeacherSchema);
