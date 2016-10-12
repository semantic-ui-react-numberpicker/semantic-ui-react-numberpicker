var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        [__dirname, 'src',  'index.js'].join(path.sep)
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.es6']
    },
    output:{
        path: [__dirname, 'build'].join(path.sep),
        filename: 'index.js'
    },
    //watch: true,
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    }
};