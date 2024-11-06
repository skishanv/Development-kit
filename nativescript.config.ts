import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.lifebalance',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    suppressCallJSMethodExceptions: false
  },
  cssParser: 'rework',
  webpackConfigPath: 'webpack.config.js'
} as NativeScriptConfig;