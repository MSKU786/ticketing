import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user

interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties a user model has
interface UseerModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: 'string';
  password: 'string';
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UseerModel>('User', userSchema);

export { User };
