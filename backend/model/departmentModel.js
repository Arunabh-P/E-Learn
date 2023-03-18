import mongoose from 'mongoose';
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Department', departmentSchema);
