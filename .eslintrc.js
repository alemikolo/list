module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 3,
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
    "document": false,
    "window": false,
    "navigator": false,
  },
};