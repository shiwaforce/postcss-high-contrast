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
		highContrast()
	];
	gulp.src(src + './*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest(root + './'))
});
```

## Options

```agressiveColorsOverride```: boolean generates extras css for better color override

Overriding default high contrast colors:   
```mainBgColor: '#000'``` - Replaces background colors   
```altBgColor: '#fff'``` - Alternative background color   
```textHeadingColor: '#fff'``` - Replaces colors for ```h1, h2, h3, h4, h5, h6```    
```textColor: '#fff'``` - Replaces colors for ```p```   
```linkColor: '#fcff3c'``` - Replaces links colors   
```linkHoverBgColor: '#fff'``` - Replaces links hover background colors   
```linkHoverColor: '#000'``` - Replaces links hover colors   