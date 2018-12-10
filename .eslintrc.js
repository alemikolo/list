module.exports = {
  "env": {
    "jest": true,
    "browser": true,
    "node": true,
  },
  "extends": "airbnb",
  "rules": {
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/*.test.js", "**/*.spec.js", "**/tests/*.js"],
    },
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 2,
      },
      "ObjectPattern": "never",
    }],
    "no-plusplus": "off",
    "no-mixed-operators": ["error", {
      "allowSamePrecedence": true,
    }
    ],
    "max-len": ["error", {
      "ignoreComments": true,
    },
    ],
  },
  "globals": {
  },
};