Package.describe({
  name: 'fchandonnet:picker',
  summary: 'Server Side Router for Meteor',
  version: '1.1.2',
  git: 'https://github.com/chandonnet/picker',
  documentation: 'README.md'
});

Npm.depends({
  'path-to-regexp': '6.2.0'
});

Package.onUse(function(api) {
  api.versionsFrom('2.3');
  api.use(['webapp@1.10.1', 'ecmascript', 'url'], 'server');
  api.addFiles('lib/implementation.js', 'server');
  api.export('Picker', 'server');
  api.addFiles('lib/instance.js', 'server');
});
