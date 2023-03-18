import mongoose from 'mongoose';
const { Schema } = mongoose;

const examResultSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  score: { type: Number, required: true },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ExamResult', examResultSchema);
