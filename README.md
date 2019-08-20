# webpack-example

This project aims to show how frontend code can be build and loaded Liferay using Webpack.
It contains a complete Liferay workspace and it should be possible to build the project using either blade or executing gradlew deploy.

## Installing Liferay
After cloning the workspace you can install a development version of Liferay using the following command. Please note that you will need at least a Java JDK 1.8 to run Liferay.

Linux:
 ```bash
 ./gradlew initBundle
```

Windows:
 ```cmd
  gradlew.bat initBundle
```

Gradle will download a Liferay server and install it into the bundles directory. To start the server, go to the tomcat/bin folder and start startup.sh or startup.bat.

## Building the project

Please take care to update the node version and npm version constants to match your locally installed version. Otherwise you might face build problems. I also had problems with the default version installed in Ubuntu 19.04 (some 10.x). It always crashed with a segmentation fault.

node.nodeVersion = "12.8.0"
node.npmVersion = "6.10.3"

Use gradlew to deploy it.
 ```bash
 ./gradlew deploy
```

When the project is deployed, it registers itself to the footer of a Liferay page and adds the following tags to it:
```javascript
<link href='<PATH>/app.css?<HASH>' rel='stylesheet'/>
<script src='<PATH>/runtime.js?<HASH>'></script>
<script src='<PATH>/vendor.js?<HASH>'></script>
<script src='<PATH>/app.js?<HASH>'></script>
```

To test the project, add three pages in the control panel. Then add three Web contents containing one of the following tags to the pages:
```html
<hello-world/>
<app-today />
<app-shuffle />
```

The code will pick the tags up and insert some example html code into the tags.

