import mongoose from 'mongoose';

const jobsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }
},
{versionKey: false });

const jobSchema = mongoose.model('job', jobsSchema);

export default jobSchema;