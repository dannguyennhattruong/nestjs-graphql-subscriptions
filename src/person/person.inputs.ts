import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';


@InputType()
export class CreatePersonInput {
  @Field(() => String)
  name: string;

x
}

@InputType()
export class ListPersonInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

}

@InputType()
export class UpdatePersonInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

}