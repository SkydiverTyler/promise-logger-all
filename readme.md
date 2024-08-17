# promise-logger-all

This library exports only one method, `promiseLoggerAll(..., ...)`.
It takes two parameters. Both are required.

## Args

1. `label`: A label that shows alongside the completion progress.
2. `proms`: An array of `Promise` objects.

## Returns

An array of Promise results, with the REJECTED PROMISES AND NULL RESULTS FILTERED OUT.
