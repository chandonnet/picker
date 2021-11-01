Package.describe({
  name: 'fchandonnet:picker',
  summary: 'Server Side Router for Meteor',
  version: '1.1.1',
  git: 'https://github.com/chandonnet/picker',
  documentation: 'README.md'
});

Npm.depends({
  'path-to-regexp': '6.2.0'
});

function configurePackage(api) {
  api.versionsFrom('2.3');
  api.use(['webapp', 'ecmascript', 'url'], 'server');
  api.addFiles(['lib/implementation.js', 'lib/instance.js'], 'server');
}

Package.onUse(function(api) {
  configurePackage(api);
  api.export(['Picker']);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use(['tinytest', 'http', 'random'], 'server');
  api.addFiles('test/instance.js', 'server');
});
