import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  curriculi: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Curriculi',
  },
});

const User = mongoose.model('User', UserSchema);
(async () => await User.createCollection())();

export default User;
