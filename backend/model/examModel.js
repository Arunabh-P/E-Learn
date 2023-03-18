import mongoose from 'mongoose';
const { Schema } = mongoose;

const examSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Exam', examSchema);
