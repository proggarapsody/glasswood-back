export interface IUseCase<R, S> {
  execute: (command: R) => Promise<S>
}
