const { defineConfig } = require("orval");

// const isDev = process.env.NODE_ENV === "development";

module.exports = defineConfig({
  main: {
    input: "http://localhost:4000/api-yaml",
    // input: "./api.yaml",
    output: {
      target: "./src/generated/api",
      schemas: "./src/generated/schemas",
      prettier: true,
      client: "fetch",
      mode: "tags",
    },
  },
});
