# Contributing to common-angular-utilities
✨ Thanks for contributing to common-angular-utilities! ✨

## Commit Message Format
We have very precise rules over how our Git commit messages must be formatted. 
For this purpose, we use [semantic-release](https://github.com/semantic-release/semantic-release) library, which takes care of versioning and changelog generation based on the commit messages.
This format leads to **easier to read commit history**.

The table below shows which commit message gets you which release type when `semantic-release` runs (using the default configuration):

| Commit message                                                                                                                                                                                   | Release type                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | ~~Patch~~ Fix Release                                                                                           |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release                                                                                       |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release <br /> (Note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

## Coding Rules

We follow [Google's TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
