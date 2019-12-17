const presets = [
    [
      "@babel/env",
      {
        targets: "defaults",
        useBuiltIns: "usage",
        corejs: "3.0.0",
      },
    ],
  ];
  
  module.exports = { presets };