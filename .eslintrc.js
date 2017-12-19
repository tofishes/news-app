module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true,
        "react-native/react-native": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "globals": {
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-param-reassign": ["error", { "props": false }],
        "quote-props": ["error", "consistent"],
        "comma-dangle": 0,
        "import/no-unresolved": 0,
        "arrow-parens": ["error", "as-needed"],
        "no-bitwise": ["error", { "allow": ["~"] }],
        "react/jsx-no-bind": [1, {
            "allowBind": true
        }],
        "react/forbid-prop-types": 0,
        "jsx-a11y/anchor-is-valid": 0
    }
};