# webpack-example

This project aims to show how frontend code can be build and loaded Liferay using Webpack.
It contains a complete Liferay workspace and it should be possible to build the project using either blade or executing gradlew deploy.

Please take care to update the node version and npm version constants to your locally installed version. Otherwise you might face build problems.

node.nodeVersion = "12.8.0"
node.npmVersion = "6.10.3"

When the project is deployed, it registers itself to the footer of a Liferay page and adds the following lines of tags to it:
```javascript
<link href='<PATH>/app.css?<HASH>' rel='stylesheet'/>
<script src='<PATH>/runtime.js?<HASH>'></script>
<script src='<PATH>/vendor.js?<HASH>'></script>
<script src='<PATH>/app.js?<HASH>'></script>
```

To test the project, deploy it and add one of the following tags to a page "<hello-world/>", "<app-today />", "<app-shuffle />

The code will pick the tags up and insert some html code into the tags.

