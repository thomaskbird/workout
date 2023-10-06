const Configuration = {
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'wip']],
  },
  extends: ['@commitlint/config-conventional'],
};

module.exports = Configuration;
