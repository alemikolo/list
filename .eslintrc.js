module.exports = {
  "extends": "airbnb",
  "env": {
    "jest": true,
    "browser": true,
    "node": true,
  },
  "parser": "babel-eslint",
  "rules": {
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/*.test.js", "**/*.spec.js", "**/tests/*.js"],
    },
    ],
    "jsx-quotes": "off",
    "react/destructuring-assignment": "off",
    "react/button-has-type": "off",
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
    "max-len": ["warn", {
      "ignoreComments": true,
    },
    ],
  },
  "globals": {
  },
};