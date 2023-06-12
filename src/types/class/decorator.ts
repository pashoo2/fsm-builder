/**
 * Wraps a class constructor that has a single parameter.
 * 
 * @type {ClassConstructorSingleParameterDecorator}
 * @template T - the type of the instantiated class. 
 * @template P - the type the parameters.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClassConstructorSingleParameterDecorator = (constructor: Function, context?: {
    kind: "class"
    name: string | undefined
    addInitializer(initializer: () => void): void
  }) => typeof constructor
