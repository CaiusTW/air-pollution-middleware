import { GenericClassDecorator, Type } from '../utils';

export const Service = (): GenericClassDecorator<Type<object>> => {
    return (target: Type<object>) => {
    };
};