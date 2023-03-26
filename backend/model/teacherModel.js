import mongoose from 'mongoose';
const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  role: {
    type: String,
    default: 'teacher',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Teacher', teacherSchema);
