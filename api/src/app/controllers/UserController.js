import * as Yup from 'yup';

import User from '../schemas/User';
import Curriculi from '../schemas/Curriculi';

class UserController {
  async list(request, response) {
    const users = await User.find({}, { __v: false });

    if (!users) {
      return response.status(400).json({
        error: 'No users found',
      });
    }

    return response.json(users);
  }
}

export default new UserController();
