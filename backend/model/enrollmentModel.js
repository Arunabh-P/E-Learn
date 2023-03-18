import mongoose from 'mongoose';
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrolledAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'inactive', 'dropped'],
    default: 'active',
  },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Enrollment', enrollmentSchema);
