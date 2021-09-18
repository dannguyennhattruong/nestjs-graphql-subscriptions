import { Person } from './person.model';
import { PersonService } from './person.service';
import {
  CreatePersonInput,
  ListPersonInput,
  UpdatePersonInput,
} from './person.inputs';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';


export const pubSub = new PubSub();

@Resolver()
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => Person)
  async person(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.getById(_id);
  }

  @Subscription(() => Person, {
    name: 'personAdded',
  })
  addPersonHandler() {
    return pubSub.asyncIterator('personAdded');
  }

  @Query(() => [Person])
  async persons(
    @Args('filters', { nullable: true }) filters?: ListPersonInput,
  ) {
    return this.personService.list(filters);
  }

  @Mutation(() => Person)
  async createPerson(@Args('payload') payload: CreatePersonInput) {
    const result = await this.personService.create(payload);
    pubSub.publish('personAdded', { personAdded: result });
    return result;
  }

  @Mutation(() => Person)
  async updatePerson(@Args('payload') payload: UpdatePersonInput) {
    return this.personService.update(payload);
  }

  @Mutation(() => Person)
  async deletePerson(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.delete(_id);
  }
}