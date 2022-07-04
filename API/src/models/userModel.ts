import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser, IUserStatics } from "../interfaces/user/IUser";
import { TOKEN_SECRET } from "../constants/user/token";
import { passwordRegExp } from "../constants/user/userRegExp";
import { createErrorMessage } from "../utils/messages/createErrorMessage";
import { createInfoMessage } from "../utils/messages/createInfoMessage";

const userSchema = new Schema<IUser, IUserStatics>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Wrong email format (email@email.com)');
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value: string) {
      if (!passwordRegExp.test(value)) {
        throw new Error('Weak password');
      }
    }
  },

  isActive: {
    type: Boolean,
    default: true
  },

  adminNote: {
    type: String,
    trim: true,
    default: ''
  },

  adminKey: {
    type: String,
    trim: true,
    default: ''
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  avatarUrl: {
    type: String,
    trim: true,
    default: ''
  },

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]

}, {
  timestamps: true
});

//Not expose data
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;
  delete userObject.tokens;
  delete userObject.adminKey;

  return userObject;
}

//VIRTUAL
//Admin
userSchema.virtual('adminRef', {
  ref: 'Admin',
  localField: '_id',
  foreignField: 'userId'
});

//VIRTUAL
//Address
userSchema.virtual('addressRef', {
  ref: 'Address',
  localField: '_id',
  foreignField: 'userId'
});

//VIRTUAL
//Order
userSchema.virtual('orderRef', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'userId'
})

//STATICS
//findByCredentials
userSchema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid Password');
  }

  return user;
}

//METHODS
//generateAuthToken
userSchema.methods.generateAuthToken = async function (this: IUser) {
  const user = this;
  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
  
  user.tokens = user.tokens.concat({ token });
  
  await user.save();

  return token;
}

//METHODS
//clearTokens
userSchema.methods.clearTokens = async function (this: IUser) {
  const user = this;
  user.tokens = [];

  await user.save();
}

//METHODS
//createInactiveMessage
userSchema.methods.createInactiveMessage = function (this: IUser, message: string) {
  const user = this;

  return {
    ...createErrorMessage(401, message),
    email: user.email,
    isActive: user.isActive,
    adminNote: user.adminNote
  }
}

//METHODS
//editUserData
userSchema.methods.editUserData = async function (
  this: IUser,
  reqBody: any,
  allowedUpdates: Array<string>,
  currentPassword?: string
) {

  const user = this;
  let updates = Object.keys(reqBody);

  if (currentPassword) {
    const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      const errorMessage = createErrorMessage(400, 'Invalid current password');
      return errorMessage;
    }

    updates = updates.filter(update => {
      return update !== 'currentPassword'
    });
  }

  const isValidOperator = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperator) {
    const errorMessage = createErrorMessage(400, 'Invalid operators');
    return errorMessage;
  }

  updates.forEach(update => {
    user[update] = reqBody[update];
  });

  await user.save();
  const infoMessage = createInfoMessage(200, 'Data updated');
  
  return infoMessage;
}

//METHODS
//setInactive
userSchema.methods.setInactive = async function (this: IUser) {
  const user = this;
  user.isActive = false;
  await user.clearTokens();
  await user.save();
}

//METHODS
//setActive
userSchema.methods.setActive = async function (this: IUser) {
  const user = this;
  user.isActive = true;
  user.adminNote = '';
  await user.save();
}

//PRE
//Hash password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  
  next();
});


const User = mongoose.model<IUser, IUserStatics>('User', userSchema);
export default User;