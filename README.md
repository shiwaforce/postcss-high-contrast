# PostCSS High Contrast
PostCSS High Contrast is PostCSS plugin that helps automaticaly convert all colors to high contrast. This Plugin gives you ability to create high contrast version of your project with ease.

## Why?
Accessible websites are getting more popular. Some countries even pass laws obliging IT companies create high contrast versions of their projects. Creating high contrast version of your project due some reasons can be painfull.


## Example	
<img title="High Contras Example" src="img/high-contrast-example.png">


## Basic Usage
```
var postcss = require('postcss');
var highContrast = require('postcss-high-contrast');

gulp.task('css', function(){
	var processors = [
		highContrast({
			aggressiveHC: true,
			aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
			aggressiveHCCustomSelectorList: ['div', 'span'],
			
			backgroundColor: '#000',
			altBgColor: '#fff',
			
			textColor: '#fff',
			
			linkColor: '#fcff3c',
			linkHoverBgColor: '#fff',
			linkHoverColor: '#000',
			
			borderColor: '#fff',
			disableShadow: true
		})
	];
	gulp.src(src + './*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest(root + './'))
});
```

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
