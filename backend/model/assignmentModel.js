import mongoose from 'mongoose';
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Assignment', assignmentSchema);
