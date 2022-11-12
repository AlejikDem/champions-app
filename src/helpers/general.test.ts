import { capitalize, snakeCaseToCapitalized } from './general';


it('capitalize', () => {
  expect(capitalize('hero')).toEqual('Hero');
  expect(capitalize('Aggression')).toEqual('Aggression');
  expect(capitalize('')).toEqual('');
});

it('snakeCaseToCapitalized', () => {
  expect(snakeCaseToCapitalized('spider_man')).toEqual('Spider Man');
  expect(snakeCaseToCapitalized('aggression')).toEqual('Aggression');
  expect(snakeCaseToCapitalized('hello_world_again_and_again')).toEqual('Hello World Again And Again')
});