import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://mongo/empregonet', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}

export default new Database();
