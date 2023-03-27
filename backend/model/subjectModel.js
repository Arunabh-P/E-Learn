import mongoose from 'mongoose';
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Subjects', subjectSchema);
