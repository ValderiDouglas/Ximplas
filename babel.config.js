module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    pluginds:[
      '@babel/transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata',
    ]
  };
};
