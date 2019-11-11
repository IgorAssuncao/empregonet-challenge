import * as Yup from 'yup';

import User from '../schemas/User';
import Curriculi from '../schemas/Curriculi';

import DbUtils from '../../database/utils';

class UserController {
  async list(request, response) {
    const users = await User.find({}, { __v: false }).populate('curriculi', {
      __v: false,
    });

    if (!users) {
      return response.status(400).json({
        error: 'No users found',
      });
    }

    return response.json(users);
  }

  async create(request, response) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      professionalExperiences: Yup.array()
        .of(Yup.string())
        .required(),
      qualifications: Yup.array()
        .of(Yup.string())
        .required(),
      languages: Yup.array()
        .of(Yup.string())
        .required(),
      name: Yup.string().required(),
      address: Yup.string().required(),
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({
        error: 'Some data is missing. Please try again.',
      });
    }

    const session = await DbUtils.createSession();
    await DbUtils.startTransaction(session);

    let user;

    try {
      const {
        type,
        professionalExperiences,
        qualifications,
        languages,
      } = request.body;

      const curriculi = await Curriculi.create(
        [
          {
            type,
            professionalExperiences,
            qualifications,
            languages,
          },
        ],
        { session }
      );

      const { name, address, username } = request.body;

      user = await User.create(
        [
          {
            name,
            address,
            username,
            curriculi: curriculi[0]._id,
          },
        ],
        { session }
      );

      await DbUtils.commitTransaction(session);
    } catch (e) {
      await DbUtils.abortTransaction(session);
      return response.status(400).json({ error: 'Not created' });
    } finally {
      await DbUtils.endSession(session);
    }

    return response.json(user);
  }
}

export default new UserController();
