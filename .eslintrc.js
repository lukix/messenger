module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true,
		},
		"ecmaVersion": 2017,
		"sourceType": "module"
	},
	"plugins": [
		"react",
	],
	"globals": { "CONFIG": false },
	"rules": {
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"indent": [
			"error",
			"tab",
			{"SwitchCase": 1}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"comma-dangle": ["error", "always-multiline"],
		"no-new-object": ["error"],
		"no-array-constructor": ["error"],
		"array-callback-return": ["error"],
		"no-new-func": ["error"],
		"prefer-destructuring": ["error"],
		"no-const-assign": ["error"],
		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "always"
		}],
		"space-before-blocks": ["error", "always"],
		"no-param-reassign": ["error"],
		"no-undef": ["error"],
		"brace-style": ["error", "1tbs", { "allowSingleLine": true }],
		"object-curly-spacing": ["error", "always"],
		"max-len": ["error", {
			"code": 100,
			"tabWidth": 4,
			"ignoreUrls": true,
			"ignoreStrings": true,
			"ignoreRegExpLiterals": true
		}],
		"no-trailing-spaces": ["error"],
		"prefer-const": ["warn"],
		"no-var": ["error"],
		"no-unused-vars": ["warn"],
		"no-console": ["warn"],
		"no-alert": ["error"],
		"no-eval": ["error"],
		"yoda": ["error", "never"],
		"no-var": "error",
		"eqeqeq": ["error", "always"],
		"dot-notation": "error",
		"max-lines": ["error", {
			"max": 250,
			"skipComments": true,
			"skipBlankLines": true
		}]
	}
};