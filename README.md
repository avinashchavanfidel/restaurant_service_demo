


<h1 align="center">Restaurant service</h1>

## ❯ Why

This service is use to handle business logic for managing the restaurants and products on your menu.

## ❯ Challenges/problems encountered during project execution.
    - I have not considered image upload and view logic, i have just accepted the image url instead of actual image storage and retrieval to save time.

## ❯ Ways to improve the application, whether in performance, structure or standards.
    - We can improve the application by adding Unit Tests so that any new changes will verify nothing already built and tested breaks.
    - For performance we can try to reduce usage of the for loops and use arrow functions.
    - For performance and large data we can add pagination for restaurants and product get all api.
    - Few lines of code could be removed or code can be shortened.
    - Few loggers is just for understanding or for information for the person using this code base, we can remove unwanted logs at start of the methods.

## ❯ All the necessary instructions for anyone to be able to run the application without major problems.
    - Before running the application you will need the Mongodb database created with the name 'RESTAURANT_DB'.
    - Below is the basic documentation that will help to setup and run the application.

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
yarn global add yarn
```

Install a MySQL database.

> If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: prepare environment variable

convert .**env.template** file to **.env**

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.

## ❯ Scripts and Tasks

All script are defined in the `package-scripts.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Running in dev mode

- Run `yarn start serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://localhost:3000`

### Building the project and run it

- Run `yarn start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `yarn start`.


## ❯ Debugger in VSCode

To debug your code run `yarn start build` or hit <kbd>cmd</kbd> + <kbd>b</kbd> to build your app.
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.


