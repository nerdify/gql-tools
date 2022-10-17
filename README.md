## @nerdify/gql-tools

A simple way to download the graphql schema and files for your react application.
## Installation
---

```
npm install @nerdify/gql-tools --save-dev
```

With yarn

```
yarn add -D @nerdify/gql-tools
```

And with pnpm:

```
pnpm add -D @nerdify/gql-tools
```

## Usage

After install you can add it as a script `package.json`:

```
"scripts": {
...
"start": "react-scripts start",
"build": "react-scripts build",
"relay": "relay-compiler",
"download-schema": "gql-tools schema $GRAPHQL_URL ./schema",

},
```

Where `$GRAPHQL_URL` is the Graphql API URL and `./schema` is the name of the folder where the schema will be downloaded.

Finally you can run the script in your terminal:

```
npm download-schema
```
And this will download the schema in the path specified:


![image](https://user-images.githubusercontent.com/16159494/196270564-86e4614e-80f6-4526-b244-381c7787b55a.png)
