### uvCharts Developer Guide
We're glad that you have an interest to contribute to this growing library. Let us guide you through setting up the work environment, understanding the code base, coding standards and steps to raise pull requests.

#### Setting Up the Development Environment
Before you begin development you'll need to setup the following requirements:

- node.js
- gulp
- a JavaScript IDE (any text editor should do)
- bower

------
+ Ensure that you have node.js, gulp and bower installed.
+ Fork the repository at http://www.github.com/imaginea/uvCharts to your github account
+ Download the codebase of uvCharts onto your local system by using the following command
	```git clone your_fork local_path```
+ Once the codebase is downloaded, on your terminal at local_path_to_code execute the following commands 
	``` npm install ``` to install all dev dependencies.
+ Execute `gulp deps:get` to fetch required dependencies like **d3** and place them in appropriate folders inside the project.
+ Execute ```gulp watch:gfx``` to see uvCharts.js and uvCharts.min.js being built from raw sources present in the ```src``` folder as and when you make changes. Execute `gulp build:gfx` if you just want to create build artifacts.

#### Understanding the code base
We have quite a few first level folders inside the code base each serving a specific purpose.

- **src** : all src files are present within this folder
- **test** : all test related stuff goes in this folder
- **readme** : any intra code documentation are committed here

##### git-ignored folders
- **dist** : distribution ready artifacts are created here when `gulp release:gfx` is executed
- **build** : interim library files are built and placed here to be tested by the developer, these files are referenced in the test files
- **lib** : any dependencies for the library are committed here

#### Going knee deep in ```src```

#### Coding Standards
We try to follow the coding conventions mentioned by Douglas Crockford [here](http://javascript.crockford.com/code.html)

#### Pull Requests
Feel free to raise a pull request when you think your changes/commits are good enough to be merged with the main library at Imaginea repo. The code will be reviewed by at least 2 of us here before being merged and we'll get back to you if your pull request needs any further changes.

Once merged we'll list you in the list of contributors to our library.
 
