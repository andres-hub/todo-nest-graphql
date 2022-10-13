import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: 'Say hi', name: 'SayHi' })
    helloWorld(): string {
        return 'Hello world';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'From zero to argument to (default 6)' })
    getRandomFromZeroTo(
        @Args('to', { nullable: true, type: () => Int }) to: number = 6
    ): number {
        return Math.floor(Math.random() * to) + 1;
    }

}
