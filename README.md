# PostCSS High Contrast
<img align="right" width="57" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-logo.png">

<img align="right" width="108" height="108" title="Philosopher’s stone, logo of PostCSS" src="http://postcss.github.io/postcss/logo.svg" hspace="20">
PostCSS High Contrast is PostCSS plugin that helps automatically convert all colors to high contrast. This Plugin gives you ability to create high contrast version of your project with ease.

## Why?
Accessible websites are getting more popular. Some countries even pass laws obliging IT companies create high contrast versions of their projects. Creating high contrast version of your project due some reasons can be painful.


## Live Example 	
<img title="High Contras Example" src="img/high-contrast-example.png">


## Basic Usage
```js
postcss([
	require('postcss-high-contrast')({
		aggressiveHC: true,
		aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
		aggressiveHCCustomSelectorList: ['div', 'span'],
		
		backgroundColor: '#000',
		altBgColor: '#fff',
		
		textColor: '#fff',
		
		linkColor: '#fcff3c',
		linkHoverColor: '#fcff3c',
		
		borderColor: '#fff',
		disableShadow: true
	})
]);

```
## How It works?
#### None Aggressive Mode
PostCSS High Contrast plugin will find all colors and replace them to high contrast ones.  
input.css:
```css
body {
	background: #fff;
	color: #000;
}

a {
	color: #0b39e1;
}
```
output.css:
```css
body {
	background: #000;
	color: #fff;
}

a {
	color: #fcff3c;
}
```
#### Aggressive Mode
In addition to replacing colors to high contrast colors, there is "Aggressive Mode". "Aggressive Mode" (```aggressiveHC```) is enabled by default. If selector doesn't have ```color``` property it will automatically append it for increasing specificity and providing more accurate results.  
input.css:
```css
h1 {
	font-size: 48px;
	margin: 0;
	padding: 0 24px;
	width: 100%;
}

p {
	font-size: 48px;
	margin: 0 0 24px;
}
```
output.css:
```css
h1 {
	color: #fff;
	font-size: 48px;
	margin: 0;
	padding: 0 24px;
	width: 100%;
}

p {
	color: #fff;
	font-size: 48px;
	margin: 0 0 24px;
}
```
Use ```aggressiveHCDefaultSelectorList``` and ```aggressiveHCCustomSelectorList``` to define own lists of properties.


#### Appending to wepbage
Using this plugin it's better to generate new high contrast version of css file. Than it is very easy to add/append high contrast version css to a webpage using JavaScript.  
JQuery example: 
```js
function appendHighContrastCss(){
	var hc = '<link rel="stylesheet" href="/assets/css/high-contrast.css" id="hccss"/>';

	if(!$('#highContrastCss').length ){
		$('head').append(hc);
	} else {
		$('#hccss').remove();
	}
}

$('a.high-contrast').click(loadHighContrastCSS);
	appendHighContrastCss();
}
```
Tip: use cookies to remember turned on high contrast css on different sessions and pages.

 

## Options
| Name                              | Default Value                                                 | Description    |
|:----------------------------------|:--------------------------------------------------------------|:---------------|
| `aggressiveHC`                    | `true`                                                        | Will append properties even if they do not exist |
| `aggressiveHCDefaultSelectorList` | `['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td']` | Default list of selectors for aggressive property append |
| `aggressiveHCCustomSelectorList`  | `['span']`                                                    | Custom list of selectors for aggressive property append |
| `backgroundColor`                 | `#000`                                                        | Backgound color |
| `altBgColor`                      | `#fff`                                                        | Alternative background color |
| `textColor`                       | `#fff`                                                        | Text color |
| `linkColor`                       | `#fcff3c`                                                     | Link color |
| `linkHoverBgColor`                | `#fff`                                                        | Link hover bacground color |
| `linkHoverColor`                  | `#000`                                                        | Link hover color |
| `borderColor`                     | `#fff`                                                        | Border color |
| `disableShadow`                   | `true`                                                        | Disable shadow |


## Used by
[Magyar Posta](https://www.posta.hu)