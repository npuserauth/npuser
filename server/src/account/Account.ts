import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IAccount extends Document {
  /** Name of the account */
  name: string;
  /** client key of the account */
  apiKey: string;
}

interface IAccountModel extends Model<IAccount> { }

const schema = new Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true }
});

const Account: IAccountModel = model<IAccount, IAccountModel>('Account', schema);

export default Account;
