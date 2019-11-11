import mongoose from 'mongoose';

class DbUtils {
  async createSession() {
    return mongoose.startSession();
  }

  async endSession(session) {
    return session.endSession();
  }

  async startTransaction(session) {
    return session.startTransaction();
  }

  async commitTransaction(session) {
    return session.commitTransaction();
  }

  async abortTransaction(session) {
    return session.abortTransaction();
  }
}

export default new DbUtils();
