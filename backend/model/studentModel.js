import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassTeacher' },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Student', studentSchema);
