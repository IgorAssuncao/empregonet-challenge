/* eslint-disable no-unused-vars */
import UserController from './UserController';
import UserModel from '../schemas/User';
import CurriculiModel from '../schemas/Curriculi';

const response = {
  output: null,
  json: function(obj) {
    this.output = obj;
    return this.output;
  },
  statusCode: 0,
  status: function(statusCode) {
    this.statusCode = statusCode;
    return this;
  },
};

describe('UserController', () => {
  describe('list method', () => {
    it('should return no users', async () => {
      UserModel.find = jest.fn().mockImplementation(function() {
        return this;
      });

      UserModel.populate = jest.fn().mockImplementation(function() {
        this.data;
        return this.data;
      });

      const request = {};

      await UserController.list(request, response);

      expect(response.output).toHaveProperty('error');
      expect(response.output).toMatchObject({
        error: 'No users found',
      });
    });

    it('should return all users', async () => {
      UserModel.find = jest.fn().mockImplementation(function() {
        this.data = [
          {
            _id: '5db835d8605b9a005dacd255',
            name: 'Igor',
            address: 'example 123',
            username: 'igor',
            curriculi: '5db835d8605b9a005dacd254',
          },
          {
            _id: '5db835d8605b9a005dacd255',
            name: 'Test',
            address: 'test123',
            username: 'test',
            curriculi: '5db835d8605b9a005dacd254',
          },
        ];
        return this;
      });

      UserModel.populate = jest.fn().mockImplementation(function() {
        this.data = this.data.map(obj => {
          Object.assign(obj, {
            curriculi: {
              professionalExperiences: ['exp1', 'exp2'],
              qualifications: ['js', 'py'],
              languages: ['br', 'en'],
              _id: '5db835d8605b9a005dacd254',
              type: 'tipo1',
            },
          });
          return obj;
        });
        return this.data;
      });

      const request = {};

      await UserController.list(request, response);

      expect(response.output.length).toBeGreaterThan(0);
      for (let data of response.output) {
        expect(data).toHaveProperty('_id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('address');
        expect(data).toHaveProperty('curriculi');
      }
    });
  });

  describe('create method', () => {
    it('should not create a user when type is missing', async () => {
      const request = {
        body: {
          professionalExperiences: ['exp1', 'exp2'],
          qualifications: ['js', 'py'],
          languages: ['br', 'en'],
          name: 'Igor',
          address: 'example 123',
          username: 'igor',
        },
      };

      CurriculiModel.create = jest
        .fn()
        .mockImplementation(
          () => throw new Error('Requred field "Type" is missing')
        );

      UserModel.create = jest.fn().mockImplementation(() => {
        return {
          _id: 'id',
          name: 'Igor',
          address: 'address',
          username: 'igor',
          curriculi: 'id_Curriculi',
          __v: 0,
        };
      });

      await UserController.create(request, response);

      expect(response.output).toHaveProperty('error');
      expect(response.output).toMatchObject({
        error: 'Some data is missing. Please try again.',
      });
    });

    it('should create a user', async () => {
      const request = {
        body: {
          type: 'tipo1',
          professionalExperiences: ['exp1', 'exp2'],
          qualifications: ['js', 'py'],
          languages: ['br', 'en'],
          name: 'Igor',
          address: 'example 123',
          username: 'igor',
        },
      };

      CurriculiModel.create = jest.fn().mockImplementation(() => {
        return {
          _id: 'id_Curriculi',
          type: 'type1',
          professionalExperiences: ['exp1', 'exp2'],
          qualifications: ['js', 'py'],
          languages: ['br', 'en'],
          __v: 0,
        };
      });

      UserModel.create = jest.fn().mockImplementation(() => {
        return {
          _id: 'id',
          name: 'Igor',
          address: 'address',
          username: 'igor',
          curriculi: 'id_Curriculi',
          __v: 0,
        };
      });

      await UserController.create(request, response);

      expect(response.output).toHaveProperty('_id');
      expect(response.output).toHaveProperty('name');
      expect(response.output).toHaveProperty('address');
      expect(response.output).toHaveProperty('username');
      expect(response.output).toHaveProperty('curriculi');
      expect(response.output).toHaveProperty('__v');
      expect(response.output).toMatchObject({
        _id: 'id',
        name: 'Igor',
        address: 'address',
        username: 'igor',
        curriculi: 'id_Curriculi',
        __v: 0,
      });
    });
  });
});
