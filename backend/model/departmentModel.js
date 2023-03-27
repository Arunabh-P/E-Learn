import mongoose from 'mongoose';
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Department', departmentSchema);
