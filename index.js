var postcss = require('postcss');
var color = require("color");
var extend = require('util')._extend;

module.exports = postcss.plugin('postcss-high-contrast', function (opts) {
	opts = extend({
		mainBgColor: '#000',
		altBgColor: '#fff',
		textHeadingColor: '#fff',
		textColor: '#fff',
		linkColor: '#fcff3c',
		linkHoverBgColor: '#fff',
		linkHoverColor: '#000'
	}, opts);
	
	var pattern = /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|(rgb|rgba)\((?:\s*\d{1,3}\s*%?\s*,?\s*){3,4}\))/;
	
	function propInArray(array, prop){
		var SELECTOR_SPLIT_PATTERN = /[. #]/;
		var retValue = false;
		var selectors = prop.split(SELECTOR_SPLIT_PATTERN);
	
		for(var i=0; i < selectors.length; i++){
			if(array.indexOf(selectors[i]) != -1){
				retValue = true;
				break;
			}
		}
	
		return retValue;
	};

	return function(css, result){
		
		css.walkRules(function(rule){
			if (rule.selector === 'body') {
				// Check if body has background or background-color
				var hasBg = rule.nodes.filter(function (node) {
					var props = ['background', 'background-color'];
					return props.indexOf(node.prop) != -1;
				}).length;
				
				// Set background color of body
				if (!hasBg){
					rule.append({prop: 'background-color', value: opts.mainBgColor});
				}
				
				// Set background color for existing background properies
				css.walkDecls(function(decl){
					if(decl.prop === 'background'){
						decl.value = opts.mainBgColor;
					} else if (decl.prop === 'background-color'){
						decl.value = opts.mainBgColor;
					}
				});
			}
			
			// Seting color for text elements
			var textSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'];

			if (propInArray(textSelectors, rule.selector)){
				var hasColor = rule.nodes.filter(function(node){
					var props = ['color'];
					return props.indexOf(node.prop) != -1;
				}).length;
				
				if(!hasColor){
					rule.append({prop: 'color', value: opts.textColor});
				} else {
					css.walkDecls(function(decl){
						if (decl.prop === 'color'){
							decl.value = opts.textColor;
						}
					});
				}
			}
		});
		
		css.walkDecls('color', function(decl){
			if (decl.parent && propInArray(['a'], decl.parent.selector)) {
				decl.value = opts.linkColor;
			}
		});
		
			// if (propInArray(['a'], rule.selector)){
			// 	var hasColor = rule.nodes.filter(function (node) {
			// 		var props = ['color'];
			// 		return props.indexOf(node.prop) != -1;
			// 	}).length;
			// 	
			// 	if(!hasColor){
			// 		rule.append({prop: 'color', value: opts.linkColor});
			// 	} else {
			// 		css.walkDecls(function(decl){
			// 			if (decl.prop === 'color'){
			// 				decl.value = opts.linkColor;
			// 			}
			// 		});
			// 	}
			// }
			
			// 	if (decl.parent && propInArray(['a'], decl.parent.selector)) {
			// 		decl.value = "#fcff3c";
			// 	}
			// 	if (decl.parent && propInArray(['a:hover'], decl.parent.selector)) {
			// 		decl.value = "#000";
			// 		decl.parent.append({prop: 'background', value: '#fff'});
			// 	}
		
		// if (decl.parent && propInArray(allSelectors, decl.parent.selector)) {
		// 		decl.value = "#fff";
		// 	}
		
		
		// css.walkDecls('background', function(decl){
		// 	if (rule.selector === 'body') {
		// 		var hasBg = rule.nodes.filter(function (node) {
		// 			var props = ['background', 'background-color'];
		// 			return props.indexOf(node.prop) != -1;
		// 		}).length;
		// 
		// 		if (!hasBg){
		// 			rule.append({prop: 'background', value: '#000'});
		// 		} else if (true) {
		// 			
		// 		}
		// 	}
		// 	// decl.value = opts.mainBgColor;
		// });
		
		// css.walkDecls('background', function(decl){
		// 	if (decl.parent && decl.parent.selector === 'body') {
		// 		decl.value = "#000";
		// 	}
		// });
		// 
		// css.walkDecls('background-color', function(decl){
		// 	if (decl.parent && decl.parent.selector === 'body') {
		// 		decl.value = "#000";
		// 	}
		// });
// 		
// 		css.walkDecls('background', decl => {
//   if (decl.parent && decl.parent.selector === 'body') {
//     // do something with decl
//   }
// });
		
		// let hasBg = rule.nodes.filter(node => node.prop === 'background').length;
		
		// css.walkRules(function (rule) {
		// 	var allSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
		// 	
		// 	// if (allSelectors.indexOf(rule.selector) != -1) {
		// 	
		// 	if (propInArray(allSelectors, rule.selector)) {
		// 		var hasColor = rule.nodes.filter(function (node) {
		// 			return node.prop === 'color';
		// 		}).length;
		// 		// console.log(hasColor);
		// 		if (!hasColor){
		// 			rule.append({prop: 'color', value: '#fff'});
		// 		}
		// 	}
		// 	
		// 	if (rule.selector === 'body') {
		// 		var hasBG = rule.nodes.filter(function (node) {
		// 			var props = ['background', 'background-color'];
		// 			return props.indexOf(node.prop) != -1;
		// 		}).length;
		// 
		// 		if (!hasBG){
		// 			rule.append({prop: 'background', value: '#000'});
		// 		}
		// 	}
		// });
		
		
		// function propInArray(array, prop){
		// 	var retValue = false;
		// 	
		// 	for(var i=0; i < array.length; i++){
		// 		if(prop.indexOf(array[i]) != -1){
		// 			retValue = true;
		// 			break;
		// 		}
		// 	}
		// 	
		// 	return retValue;
		// };
		
		// function propInArray(array, prop){
		// 	var SELECTOR_SPLIT_PATTERN = /[. #]/;
		// 	var retValue = false;
		// 	var selectors = prop.split(SELECTOR_SPLIT_PATTERN);
		// 
		// 	for(var i=0; i < selectors.length; i++){
		// 		if(array.indexOf(selectors[i]) != -1){
		// 			retValue = true;
		// 			break;
		// 		}
		// 	}
		// 
		// 	return retValue;
		// };
		
		
		// css.walkDecls('background', function(decl){
		// 	
		// 	if (decl.value === '#fff' ){
		// 		decl.value = "#000";
		// 	}
		// 	// decl.value = '#000';
		// 	if (decl.parent && decl.parent.selector === 'section') {
		// 		decl.value = "#000";
		// 	}
		// 	if(pattern.test(decl.value)){
		// 		var declColor = color(decl.value.match(pattern)[0]).hsl();
		// 		// console.log(declColor);
		// 		
		// 		if(declColor.l > 50 && declColor.l > 50){
		// 			decl.value = '#000';
		// 		}
		// 		
		// 	}
		// 	// var declColor = color(decl.value).hsl();
		// 	
		// 	// if(declColor.l > 50 && declColor.l > 50){
		// 		// decl.value = '#000';
		// 	// }
		// 	
		// 	// console.log(decl.value);
		// });
		// css.walkDecls('background-color', function(decl){
		// 	var declColor = color(decl.value).hsl();
		// 	
		// 	if(declColor.l > 50 && declColor.l > 50){
		// 		decl.value = '#000';
		// 	}
		// 	
		// 	// console.log(decl.value);
		// });
		
		
		
		// css.walkDecls('color', function(decl){
		// });
		
		
		
		
		// css.walkRules(function (rule){
		// 	if(rule.selector === 'body'){
		// 		
		// 		// var background = false;
		// 		// 
		// 		// for(var i = 0; i < rule.nodes.length; i++){
		// 		// 	if(rule.nodes[i].prop == 'background'){
		// 		// 		background = true;
		// 		// 		rule.nodes[i].value = '#000';
		// 		// 	} else if (rule.nodes[i].prop == 'background-color'){
		// 		// 		background = true;
		// 		// 		rule.nodes[i].value = '#000';
		// 		// 	} 
		// 		// 	
		// 		// }
		// 		// if(decl.prop === 'background'){
		// 		// }
		// 	}
		// });
		
// 		css.walkRules(rule => {
//   if (rule.selector === 'body') {
//     rule.walkDecls('background', decl => {
//       console.log(decl.value);
//     });
//   }
// });

		css.walkDecls(function (decl){
			// if(decl.prop === 'background'){
			// 	if(decl.value != 'inherit' or decl.value != ''){
			// 		var declColor = color(decl.value).hsl();
			// 		if(declColor.b < 50){
			// 			decl.value = '#000';
			// 		}
			// 	}
			// }
			if(decl.prop === 'background'){
				// console.log(pattern.test(decl.value), decl.value);
				
				// if(pattern.test(decl.value)){
				// 	var declColor = color(decl.value).hsl()
				// 	if(declColor.l > 50 && declColor.l > ){
				// 	// 	decl.value = '#000';
				// 	// 	
				// 	// }
				// 	console.log(declColor);
				// 	// console.log(declColor.s);
				// }
				
			
				
				// converter.rgb( hexToRgb(decl.value) ).hsl();
				// console.log(hexToRgb(decl.value), decl.value);
			}
		});

	};
});