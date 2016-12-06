/*插件初始化,动态生成元素*/
	function initNumber (target, number) {
		var numStr = new String(number);
		var formatStrs = formatStr(numStr);
		var oldFormatStrs = localStorage.getItem('old_number');
		localStorage.setItem('old_number',formatStrs.join(''));
		// console.log(oldFormatStrs);
		createTml(target, oldFormatStrs.split(''), formatStrs);
	}
	/*创建模版*/
	function createTml (target, oldArrs, arrs) {
		// console.log(oldArrs);
		if (oldArrs && oldArrs.length !== arrs.length) {
			target.innerHTML = '';
		}
		var spanWrapper = document.createElement('div');
		if (target.childNodes.length) {
			spanWrapper.style.display = 'none';
			spanWrapper.className = 'spanWrapper front';
			target.childNodes[target.childNodes.length - 1].className = 'spanWrapper back';
		} else {
			spanWrapper.className = 'spanWrapper front';
		}
		spanWrapper.style.position = 'absolute';
		var span = null;
		var flag = false;
		for (var i = 0; i < arrs.length; i++) {
			span = document.createElement('span');
			/*标记不一样的元素*/
			
			if (oldArrs && oldArrs.length && oldArrs[i] !== arrs[i]) {
				span.className += ' changed ';
			}
			if (arrs[i] === ',') {
				spanWrapper.childNodes[i - 1].className += ' leftSiblingDot ';
				flag = true;
				span.className = 'dot';
			} else {
				if (flag) {
					span.className += ' rightSiblingDot ';
					flag = false;
				} else {
					span.className += ' number ';
				}
			}
			span.innerText = arrs[i];
			spanWrapper.appendChild(span);
		}
		target.appendChild(spanWrapper);
		// if (span.className ) {}
		var spanWrappers = document.getElementsByClassName('spanWrapper');
		if (spanWrappers.length === 3) {
			target.removeChild(target.firstChild);
		}
		var changedNodes = document.getElementsByClassName('changed');
		for (var j = 0; j < changedNodes.length; j++) {
			changedNodes[j].className += ' hover ';
		}
		spanWrapper.style.display = 'block';
		setTimeout(function () {
			for (var k = 0; k < changedNodes.length; k++) {
				removeClass(changedNodes[k], 'hover');
			}
		},500);
	}
	/*格式化字符串为数组*/
	function formatStr (str) {
		var res = [];
		var strArrs = str.split('');
		var j = 1;
		for (var i = strArrs.length - 1; i >= 0 ; i--) {
			if (j % 3 !== 0) {
				res.push(strArrs[i]);
			} else {
				res.push(strArrs[i]);
				if (i !== 0) {
					res.push(',');
				}
			}
			j++;
		}
		return reverseArrs(res);
	}
	/*反转数组*/
	function reverseArrs (arrs) {
		var newArrs = [];
		for (var i = arrs.length - 1; i >= 0 ; i--) {
			newArrs.push(arrs[i]);
		}
		return newArrs;
	}
	/*移除指定的类名*/
	function removeClass (target, classNameStr) {
		if (target.className.indexOf(classNameStr) === -1) {
			return;
		}
		var classArr = target.className.split(' ');
		var newClassArr = [];
		for (var i = 0; i < classArr.length; i++) {
			if (classArr[i] !== classNameStr) {
				newClassArr.push(classArr[i]);
			}
		}
		var resClass = newClassArr.length === 1 ? newClassArr.join('') : newClassArr.join(' ');
		target.className = resClass;
	}