import mongoose from 'mongoose';

const CurriculiSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  professionalExperiences: {
    type: [String],
    required: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Curriculi', CurriculiSchema);
