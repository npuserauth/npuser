

## to create this subproject

```
npm init -y
npm install webpack webpack-cli --save-dev

npm install nodemon-webpack-plugin --save-dev

touch webpack.config.js
mkdir dist

npm install dotenv --save
npm install npuser-client --save
npm install readline --save

```

Add to package
```
  "scripts": {
    "start": "webpack --watch",
```


add a webpage.config.js file
```
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js',
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  target: 'node'
};
```
