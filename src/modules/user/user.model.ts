import { Component } from '@nestjs/common';
import { Document, Model, model, Schema } from "mongoose";
import { DatabaseService } from './../shared/database.service';

export interface IUser extends Document {
    name: string;
}

export interface IUserModel extends Model<IUser> { }

@Component()
export class UserModel {
    private _model: IUserModel;
    private _schema: Schema;
    private readonly collectionName = 'usuarios';

    constructor(private databaseService: DatabaseService) {
        this.generateSchema();
        this.repository();
    }

    public repository() {
        const models = this.databaseService.connection.modelNames();
        if (this._model || models.includes(this.collectionName)) {
            return this._model;
        } else {
            this._model =
                this.databaseService.connection.model<IUser>(this.collectionName, this._schema) as IUserModel;
            return this._model;
        }
    }

    private generateSchema() {
        this._schema = new Schema({
            name: { type: String, required: 'Field {PATH} is required' }
        });
    }

}