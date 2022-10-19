import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/inputs/intdex';


import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(()=> Todo)
export class TodoResolver {


    constructor(
        private readonly todoService: TodoService
    ) { }

    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int }) id: number
    ): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation(()=> Boolean)
    removeTodo(
        @Args('id', {type: ()=> Int}) id: number
    ){
        return this.todoService.delete(id);
    }

    @Query(() => Int, {name: 'TotalTodos'})
    totalTodos(){
        return this.todoService.totalTodos;
    }

    @Query(() => Int, {name: 'PendingTodos'})
    pendingTodos(){
        return this.todoService.pendingTodos;
    }

    @Query(() => Int, {name: 'CompletedTodos'})
    completedTodos(){
        return this.todoService.completedTodos;
    }

    @Query(()=> AggregationsType)
    aggregations(): AggregationsType{
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos
        }
    }

}
