Package.describe({
  name: 'storyteller:picker',
  summary: 'Server Side Router for Meteor',
  version: '1.1.0',
  git: 'https://github.com/storytellercz/picker.git',
  documentation: 'README.md'
});

Npm.depends({
  'path-to-regexp': '6.1.0'
});

Package.onUse(function(api) {
  configurePackage(api);
  api.mainModule('lib/instance.js', 'server');
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use('storyteller:picker', 'server');
  api.use(['tinytest', 'http', 'random'], 'server');
  api.mainModule('test/instance.js', 'server');
});

function configurePackage(api) {
  api.versionsFrom('1.3');
  api.use(['webapp', 'ecmascript', 'url'], 'server');
}
