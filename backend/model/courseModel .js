import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  materials: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);
