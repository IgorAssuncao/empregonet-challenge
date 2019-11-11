import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(
      'mongodb://mongo2/empregonet?replicaSet=mongo-set',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
