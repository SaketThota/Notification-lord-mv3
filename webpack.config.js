const path = require('path');

module.exports = {
    entry: './background.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'production',
    devtool: 'cheap-module-source-map'
};