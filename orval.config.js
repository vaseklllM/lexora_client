const { defineConfig } = require("orval");

require("dotenv").config();

module.exports = defineConfig({
  main: {
    input: process.env.SYSTEM_NEXT_API_URL + process.env.SYSTEM_NEXT_API_YAML,
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
