Package.describe({
  name: 'fchandonnet:picker',
  summary: 'Server Side Router for Meteor',
  version: '1.1.6',
  git: 'https://github.com/chandonnet/picker',
  documentation: 'README.md'
});

Npm.depends({
  'path-to-regexp': '6.2.0'
});

function configurePackage(api) {
  api.versionsFrom('2.3');
  api.use(['webapp', 'ecmascript', 'url'], 'server');
}

Package.onUse(function(api) {
  configurePackage(api);
  api.mainModule('lib/instance.js', 'server');
});
