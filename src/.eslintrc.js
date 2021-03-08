module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:react-hooks/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "jsx": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": ["warn", {
            "additionalHooks": "(useMyCustomHook|useMyOtherCustomHook)"
        }],

        "linebreak-style": "off",
        "camelcase": "off",

        "react/prop-types": "off",
        "no-console": "off",
        "react/jsx-props-no-spreading": "off",
        "no-underscore-dangle": "off",
    }
};
