import mongoose from 'mongoose';
const { Schema } = mongoose;

const gradeSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  grade: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Grade', gradeSchema);
