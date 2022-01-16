var numbers = [];
var comma_set = 0;
var pcl_e = 0;
var p = 0;
var pcount = 0;
var m_pcount = 0;
var m_cordinations = [];
var position_w = 5;
var position_h = 190;
var size = 54;
var space_between = 10;
var radius = 20;
var border_w = 0;
var neg = 0;
var equation = "";
var times_m = 0;
var math = [];

function prod_ex(text) {
	for (var i = 0; i < text.length; i++) {
		if (text[i] == "!") {
			var g = 0;
			var as;


			for (var k = 0; k > -i; k--) {
				if (text[i + k - 1] == ")") {
					g += 1;
				} else if (text[i + k - 1] == "(") {
					g -= 1;
				}
				if (g == 0) {
					as = text.substring(i + k - 1, i);
					text = text.replace(as + "!", factorial(Math.abs(Math.round(Number(culculator(as))))));
					p = p - 1;
					break;
				}

			}
		}

	}
	return text;
}

function factorial(n) {
	if (n < 0) return;
	if (n < 2) return 1;
	return n * factorial(n - 1);
}

function restoreop(op) {
	if (op < 3) {
		if (op == 0) {
			op = "+";
		} else {
			if (op == 1) {
				op = "-";
			} else {
				op = "x";
			}

		}

	} else {
		if (op == 3) {
			op = "/";
		} else {
			op = "^";
		}

	}

	return op;
}

function culculator(text) {
	var op = [];
	for (var i = 0; i < m_pcount; i++) {
		m_pcount = m_pcount - 1;
		var m_expression = getText("result").substring(m_cordinations[m_cordinations.length - 1], getText("result").length);
		switch (math[math.length - 1]) {
			case 1:
				m_expression = Math.round(Math.sin(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 2:
				m_expression = Math.round(Math.cos(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 3:
				m_expression = Math.round(Math.tan(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 4:
				m_expression = Math.round(1 / Math.cos(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 5:
				m_expression = Math.round(1 / Math.sin(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 6:
				m_expression = Math.round(1 / Math.tan(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 7:
				m_expression = Math.round(Math.log(culculator(prod_ex(m_expression))) / Math.log(10)*1000)/1000;
				break;
		}
		text = text.substring(0, m_cordinations[m_cordinations.length - 1] - 4) + m_expression;
		removeItem(math, math.length - 1);
		removeItem(m_cordinations, m_cordinations.length - 1);
	}
	for (var i = 0; i < pcount; i++) {
		text += ")";
	}
	for (var i = 0; i < text.length; i++) {
		if (text[i] == "-" && text[i - 1] != "(" && i != 0) {
			var res = text.substring(0, i);
			res += "+-";
			res += text.substring(i + 1, text.length);
			text = res;
			i = i + 1;

		} else if (text[i] == "-" && text[i + 1] == "(") {
			var res = text.substring(0, i);
			res += "(-1)x";
			p = p + 2;
			res += text.substring(i + 1, text.length);
			text = res;
			i = i + 1;
		} else if (text[i] == ",") {
			text = text.replace(",", ".");
		} else if (text[i] == "%") {
			text = text.replace("%", "x0,01");
		} else if (text[i] == "√") {
			var g = 0;
			var as;
			text = text.replace("√", "");

			for (var k = 0; k < text.length - i; k++) {
				if (text[i + k] == "(") {
					g += 1;
				} else if (text[i + k] == ")") {
					g -= 1;
				}
				if (g == 0) {
					as = text.substring(0, i + k + 1);
					as += "^0.5";
					as += text.substring(i + k + 1, text.length);
					text = as;

					break;
				}


			}

		}

	}
	for (var j = 0; j < p; j++) {
		var temp = text;

		for (var i = 0; i < text.length; i++) {
			if (text[i] == "+") {
				appendItem(op, 0);
			} else if (text[i] == "x") {
				appendItem(op, 2);
			} else if (text[i] == "/") {
				appendItem(op, 3);
			} else if (text[i] == "^") {
				appendItem(op, 4);
			} else if (text[i] == "(") {
				appendItem(op, 5);
			} else if (text[i] == ")") {
				appendItem(op, 6);
			}

		}

		for (var i = 0; i < p; i++) {
			text = text.replace("(", "");
			text = text.replace(")", "");
		}

		numbers = splitMulti(text, ["+", "x", "/", "^"]);
		var oppop = replaceop(op, 5);
		var oppcl = replaceop(op, 6);

		var cordinations = parenthesis([oppop, oppcl]);

		var opnew = op.slice(cordinations[0] + 1, cordinations[1]);
		var numsnew = numbers.slice(cordinations[0] - (p - (1 + j)), cordinations[1] - (p - (1 + j)));

		
		
		var o = culculate(opnew, numsnew);
		var str = "(";
		if (opnew.length == 0) {
			str += numsnew[0];
		} else {
			for (i = 0; i < opnew.length; i++) {
				str += numsnew[i] + restoreop(opnew[i]);
				if (i == opnew.length - 1) {
					str += numsnew[i + 1];
				}

			}
		}
		str += ")";
		text = temp;
		text = text.replace(str, o);
		op = [];
	}
	for (var i = 0; i < text.length; i++) {
		if (text[i] == "+") {
			appendItem(op, 0);
		} else if (text[i] == "x") {
			appendItem(op, 2);
		} else if (text[i] == "/") {
			appendItem(op, 3);
		} else if (text[i] == "^") {
			appendItem(op, 4);
		}

	}
	numbers = splitMulti(text, ["+", "x", "/", "^"]);
	text = culculate(op, numbers);
	text = text.toString();
	text = text.replace(".",",");
	return text;

}

function parenthesis(op) {
	var op1 = op[1];
	var op2 = op[0];
	var start = 0;
	var end = 0;
	for (var i = 0; i < op1.length; i++) {
		if (op1[i]) {
			end = i;
			for (i = end; i > -1; i--) {
				if (op2[i]) {
					start = i;
					break;
				}
			}
			break;
		}
	}
	return [start, end];
}

function culculate(op, numbers) {
	var e_r = 0;
	var oppow = replaceop(op, 4);
	var powerar = [];
	if (numbers.length == 1) {
		return numbers[0];
	} else {
		for (var ioi = 0; ioi < oppow.length; ioi++) {
			if (oppow[ioi]) {
				if (ioi == 0) {
					appendItem(powerar, Math.pow(Number(numbers[ioi]), Number(numbers[ioi + 1])));
				} else {
					powerar[powerar.length - 1] = Math.pow(powerar[powerar.length - 1], Number(numbers[ioi + 1]));
				}

			} else {
				if (ioi == 0) {
					appendItem(powerar, Number(numbers[ioi]));
					appendItem(powerar, Number(numbers[ioi + 1]));
				} else {
					appendItem(powerar, Number(numbers[ioi + 1]));
				}
			}
		}
		var opdiv = replaceop(remainedop(op, oppow), 3);
		var opmul = replaceop(remainedop(op, oppow), 2);
		var secondar = [];
		if (opdiv.length == 0) {
			secondar = powerar;
		} else {
			for (ioi = 0; ioi < opdiv.length; ioi++) {
				if (opdiv[ioi]) {
					if (ioi == 0) {
						appendItem(secondar, powerar[ioi] / powerar[ioi + 1]);
					} else {
						secondar[secondar.length - 1] = secondar[secondar.length - 1] / powerar[ioi + 1];
					}

				} else if (opmul[ioi]) {
					if (ioi == 0) {
						appendItem(secondar, powerar[ioi] * powerar[ioi + 1]);
					} else {
						secondar[secondar.length - 1] = secondar[secondar.length - 1] * powerar[ioi + 1];
					}

				} else {
					if (ioi == 0) {
						appendItem(secondar, powerar[ioi]);
						appendItem(secondar, powerar[ioi + 1]);
					} else {
						appendItem(secondar, powerar[ioi + 1]);
					}
				}
			}
		}
		for (var ab = 0; ab < secondar.length; ab++) {
			e_r = e_r + secondar[ab];
		}
		return e_r;
	}
}

function splitMulti(str, tokens) {
	var tempChar = tokens[0];
	for (var i = 1; i < tokens.length; i++) {
		str = str.split(tokens[i]).join(tempChar);
	}
	str = str.split(tempChar);
	return str;
}

function replaceop(array, op) {
	var ar1 = copy(array);
	for (var i = 0; i < ar1.length; i++) {
		if (ar1[i] == op) {
			ar1[i] = 1;
		} else {
			ar1[i] = 0;
		}

	}
	return ar1;
}

function replaceop_special(array, op) {
	var ar1 = copy(array);
	for (var i = 0; i < ar1.length; i++) {
		if (op[i] == 1) {
			ar1[i] = 1;
		}
	}
	return ar1;
}

function remainedop(array, array2) {
	var ar1 = copy(array);
	var newarr = [];
	for (var i = 0; i < ar1.length; i++) {
		if (array2[i] == 0) {
			appendItem(newarr, ar1[i]);
		}
	}
	return newarr;
}

function copy(array) {
	var ar1 = [];
	for (var i = 0; i < array.length; i++) {
		appendItem(ar1, array[i]);

	}
	return ar1;
}

onEvent("screen1", "click", function() {
	if (pcl_e == 1) {
		pcl_e = 2;
	} else if (pcl_e == 2) {
		if (!(isNaN(Number(getText("result")[getText("result").length - 1])))) {
			var temp = getText("result")[getText("result").length - 1];
			setText("result", getText("result").substring(0, getText("result").length - 1) + "x" + temp);
			pcl_e = 0;
		} else if (getText("result")[getText("result").length-1] == ")") {
			setText("result", getText("result")+ "x");
			pcl_e = 0;
		} else {
			pcl_e = 0;
		}
	}
});
setProperty("screen1", "background-color", "#000000");
textLabel("result", "");
setPosition("result", 0, 0, 320, 100);
setProperty("result", "text-color", "#ffffff");
setProperty("result", "font-size", 36);
setProperty("result", "text-align", "center");
button("precent", "%");
setProperty("precent", "text-color", "#0072C8");
setProperty("precent", "background-color", "#001D32");
setPosition("precent", position_w + size + space_between, position_h - size - space_between, size, size);
setProperty("precent", "border-radius", radius);
setProperty("precent", "border-width", border_w);
onEvent("precent", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "%");
	}
});
button("pi", "π");
setProperty("pi", "text-color", "#0072C8");
setProperty("pi", "background-color", "#001D32");
setPosition("pi", position_w + 2 * size + 2 * space_between, position_h - size - space_between, size, size);
setProperty("pi", "border-radius", radius);
setProperty("pi", "border-width", border_w);
onEvent("pi", "click", function() {
  if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result").length == 0))) {
   setText("result", getText("result") + "3,141");
  }
});
button("sin", "sin");
setProperty("sin", "text-color", "#0072C8");
setProperty("sin", "background-color", "#001D32");
setPosition("sin", position_w + 3 * size + 3 * space_between, position_h, size, size);
setProperty("sin", "border-radius", radius);
setProperty("sin", "border-width", border_w);
onEvent("sin", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "sin(");
		appendItem(math, 1);
		appendItem(m_cordinations, getText("result").length);
		m_pcount += 1;
	}
});
button("cos", "cos");
setProperty("cos", "text-color", "#0072C8");
setProperty("cos", "background-color", "#001D32");
setPosition("cos", position_w + 4 * size + 4 * space_between, position_h, size, size);
setProperty("cos", "border-radius", radius);
setProperty("cos", "border-width", border_w);
onEvent("cos", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "cos(");
		appendItem(m_cordinations, getText("result").length);
		m_pcount += 1;
		appendItem(math, 2);
	}
});
button("tan", "tan");
setProperty("tan", "text-color", "#0072C8");
setProperty("tan", "background-color", "#001D32");
setPosition("tan", position_w + 3 * size + 3 * space_between, position_h + size + space_between, size, size);
setProperty("tan", "border-radius", radius);
setProperty("tan", "border-width", border_w);
onEvent("tan", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "tan(");
		appendItem(m_cordinations, getText("result").length);
		appendItem(math, 3);
		m_pcount += 1;
	}
});
button("sec", "sec");
setProperty("sec", "text-color", "#0072C8");
setProperty("sec", "background-color", "#001D32");
setPosition("sec", position_w + 4 * size + 4 * space_between, position_h + size + space_between, size, size);
setProperty("sec", "border-radius", radius);
setProperty("sec", "border-width", border_w);
onEvent("sec", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "sec(");
		appendItem(m_cordinations, getText("result").length);
		appendItem(math, 4);
		m_pcount += 1;
	}
});
button("csc", "csc");
setProperty("csc", "text-color", "#0072C8");
setProperty("csc", "background-color", "#001D32");
setPosition("csc", position_w + 3 * size + 3 * space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("csc", "border-radius", radius);
setProperty("csc", "border-width", border_w);
onEvent("csc", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "csc(");
		appendItem(math, 5);
		m_pcount += 1;
		appendItem(m_cordinations, getText("result").length);
	}
});
button("cot", "cot");
setProperty("cot", "text-color", "#0072C8");
setProperty("cot", "background-color", "#001D32");
setPosition("cot", position_w + 4 * size + 4 * space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("cot", "border-radius", radius);
setProperty("cot", "border-width", border_w);
onEvent("cot", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "cot(");
		appendItem(math, 6);
		m_pcount += 1;
		appendItem(m_cordinations, getText("result").length);
	}
});
button("log", "log");
setProperty("log", "text-color", "#0072C8");
setProperty("log", "background-color", "#001D32");
setPosition("log", position_w + 3 * size + 3 * space_between, position_h + 3 * size + 3 * space_between, size, size);
setProperty("log", "border-radius", radius);
setProperty("log", "border-width", border_w);
onEvent("log", "click", function() {
	if ((isNaN(Number(getText("result")[getText("result").length - 1]))) || ((getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "log(");
		appendItem(math, 7);
		m_pcount += 1;
		appendItem(m_cordinations, getText("result").length);
	}
});
button("menu", "☰");
setProperty("menu", "text-color", "#0072C8");
setProperty("menu", "background-color", "#001D32");
setPosition("menu", position_w, position_h - size - space_between, size, size);
setProperty("menu", "border-radius", radius);
setProperty("menu", "border-width", border_w);
onEvent("menu", "click", function() {
	times_m += 1;
	if (times_m % 2 == 0) {
		setStyle("precent", "z-index: 0");
		setStyle("sin", "z-index: 0");
		setStyle("cos", "z-index: 0");
		setStyle("tan", "z-index: 0");
		setStyle("sec", "z-index: 0");
		setStyle("csc", "z-index: 0");
		setStyle("cot", "z-index: 0");
		setStyle("log", "z-index: 0");
		setStyle("pi", "z-index: 0");
	} else {
		setStyle("precent", "z-index: 1");
		setStyle("sin", "z-index: 1");
		setStyle("cos", "z-index: 1");
		setStyle("tan", "z-index: 1");
		setStyle("sec", "z-index: 1");
		setStyle("csc", "z-index: 1");
		setStyle("cot", "z-index: 1");
		setStyle("log", "z-index: 1");
		setStyle("pi", "z-index: 1");
	}
});
button("sqrt", "√");
setProperty("sqrt", "text-color", "#0072C8");
setProperty("sqrt", "background-color", "#001D32");
setPosition("sqrt", position_w + size + space_between, position_h - size - space_between, size, size);
setProperty("sqrt", "border-radius", radius);
setProperty("sqrt", "border-width", border_w);
onEvent("sqrt", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "x√(");
		pcount = pcount + 1;
		p += 1;
		comma_set = 0;
	} else if (((isNaN(Number(getText("result")[getText("result").length - 1]))) && (getText("result")[getText("result").length - 1] != ",")) || getText("result").length == 0) {
		setText("result", getText("result") + "√(");
		pcount = pcount + 1;
		comma_set = 0;
		p += 1;
	}
});
button("factorial", "!");
setProperty("factorial", "text-color", "#0072C8");
setProperty("factorial", "background-color", "#001D32");
setPosition("factorial", position_w + 2 * size + 2 * space_between, position_h - size - space_between, size, size);
setProperty("factorial", "border-radius", radius);
setProperty("factorial", "border-width", border_w);
onEvent("factorial", "click", function() {
	if (!isNaN(Number(getText("result")[getText("result").length - 1])) || ((getText("result"))[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		for (var i = getText("result").length - 1; i >= 0; i--) {
			if (i == getText("result").length - 1 && getText("result")[getText("result").length - 1] == ")") {
				setText("result", getText("result") + "!");
				break;
			} else if (isNaN(Number(getText("result")[i - 1])) || i == 0) {
				setText("result", getText("result").substring(0, i) + "(" + getText("result").substring(i, getText("result").length) + ")!");
				p = p + 1;
				break;
			}
		}
	}
});
button("clear", "c");
setProperty("clear", "text-color", "#C64C68");
setProperty("clear", "background-color", "#30181E");
setPosition("clear", position_w + 3 * size + 3 * space_between, position_h - size - space_between, size, size);
setProperty("clear", "border-radius", radius);
setProperty("clear", "border-width", border_w);
onEvent("clear", "click", function() {
	setText("result", "");
	comma_set = 0;
	p = 0;
	pcl_e = 0;
});
button("rub", "x");
setProperty("rub", "text-color", "#DE7F00");
setProperty("rub", "background-color", "#482900");
setPosition("rub", position_w + 4 * size + 4 * space_between, position_h - size - space_between, size, size);
setProperty("rub", "border-radius", radius);
setProperty("rub", "border-width", border_w);
onEvent("rub", "click", function() {
	if (getText("result")[getText("result").length - 1] == ",") {
		comma_set = 0;
	} else if (getText("result")[getText("result").length - 1] == "(") {
		pcount -= 1;
		p -= 1;
	} else if (getText("result")[getText("result").length - 2] == ")") {
		pcl_e = 1;
	}
	setText("result", getText("result").substring(0, getText("result").length - 1));
});
button("number1", "1");
setProperty("number1", "text-color", "#ffffff");
setProperty("number1", "background-color", "#232428");
setPosition("number1", position_w, position_h, size, size);
setProperty("number1", "border-radius", radius);
setProperty("number1", "border-width", border_w);
onEvent("number1", "click", function() {
	setText("result", getText("result") + "1");
});
button("number2", "2");
setProperty("number2", "text-color", "#ffffff");
setProperty("number2", "background-color", "#232428");
setPosition("number2", position_w + size + space_between, position_h, size, size);
setProperty("number2", "border-radius", radius);
setProperty("number2", "border-width", border_w);
onEvent("number2", "click", function() {
	setText("result", getText("result") + "2");
});
button("number3", "3");
setProperty("number3", "text-color", "#ffffff");
setProperty("number3", "background-color", "#232428");
setPosition("number3", position_w + 2 * size + 2 * space_between, position_h, size, size);
setProperty("number3", "border-radius", radius);
setProperty("number3", "border-width", border_w);
onEvent("number3", "click", function() {
	setText("result", getText("result") + "3");
});
button("number4", "4");
setProperty("number4", "text-color", "#ffffff");
setProperty("number4", "background-color", "#232428");
setPosition("number4", position_w, position_h + size + space_between, size, size);
setProperty("number4", "border-radius", radius);
setProperty("number4", "border-width", border_w);
onEvent("number4", "click", function() {
	setText("result", getText("result") + "4");
});
button("number5", "5");
setProperty("number5", "text-color", "#ffffff");
setProperty("number5", "background-color", "#232428");
setPosition("number5", position_w + size + space_between, position_h + size + space_between, size, size);
setProperty("number5", "border-radius", radius);
setProperty("number5", "border-width", border_w);
onEvent("number5", "click", function() {
	setText("result", getText("result") + "5");
});
button("number6", "6");
setProperty("number6", "text-color", "#ffffff");
setProperty("number6", "background-color", "#232428");
setPosition("number6", position_w + 2 * size + 2 * space_between, position_h + size + space_between, size, size);
setProperty("number6", "border-radius", radius);
setProperty("number6", "border-width", border_w);
onEvent("number6", "click", function() {
	setText("result", getText("result") + "6");
});
button("number7", "7");
setProperty("number7", "text-color", "#ffffff");
setProperty("number7", "background-color", "#232428");
setPosition("number7", position_w, position_h + 2 * size + 2 * space_between, size, size);
setProperty("number7", "border-radius", radius);
setProperty("number7", "border-width", border_w);
onEvent("number7", "click", function() {
	setText("result", getText("result") + "7");
});
button("number8", "8");
setProperty("number8", "text-color", "#ffffff");
setProperty("number8", "background-color", "#232428");
setPosition("number8", position_w + size + space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("number8", "border-radius", radius);
setProperty("number8", "border-width", border_w);
onEvent("number8", "click", function() {
	setText("result", getText("result") + "8");
});
button("number9", "9");
setProperty("number9", "text-color", "#ffffff");
setProperty("number9", "background-color", "#232428");
setPosition("number9", position_w + 2 * size + 2 * space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("number9", "border-radius", radius);
setProperty("number9", "border-width", border_w);
onEvent("number9", "click", function() {
	setText("result", getText("result") + "9");
});
button("number0", "0");
setProperty("number0", "text-color", "#ffffff");
setProperty("number0", "background-color", "#232428");
setPosition("number0", position_w + size + space_between, position_h + 3 * size + 3 * space_between, size, size);
setProperty("number0", "border-radius", radius);
setProperty("number0", "border-width", border_w);
onEvent("number0", "click", function() {
	setText("result", getText("result") + "0");
});
button("negate", "±");
setProperty("negate", "text-color", "#ffffff");
setProperty("negate", "background-color", "#232428");
setPosition("negate", position_w, position_h + 3 * size + 3 * space_between, size, size);
setProperty("negate", "border-radius", radius);
setProperty("negate", "border-width", border_w);
onEvent("negate", "click", function() {
	if (neg != 2) {
		setText("result", "-(" + getText("result") + ")");
		p += 1;
		neg += 1;
	} else {
		setText("result", getText("result").substring(2, getText("result").length - 1));
		neg -= 1;
		p -= 1;
	}
});
button("comma", ",");
setProperty("comma", "text-color", "#ffffff");
setProperty("comma", "background-color", "#232428");
setPosition("comma", position_w + 2 * size + 2 * space_between, position_h + 3 * size + 3 * space_between, size, size);
setProperty("comma", "border-radius", radius);
setProperty("comma", "border-width", border_w);
onEvent("comma", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) && comma_set == 0) {
		setText("result", getText("result") + ",");
		comma_set = 1;
	}
});
button("equal", "=");
setProperty("equal", "text-color", "#009A46");
setProperty("equal", "background-color", "#002E15");
setPosition("equal", position_w + 4 * size + 4 * space_between, position_h + 3 * size + 3 * space_between, size, size);
setProperty("equal", "border-radius", radius);
setProperty("equal", "border-width", border_w);
onEvent("equal", "click", function() {
	pcl_e = 0;
	equation = getText("result");
	setText("result", prod_ex(getText("result")));
	var e_r = culculator(getText("result"));
	setText("result", e_r);
	pcount = 0;
	playSpeech("the result of expression " + equation + " is " + getText("result"), "male", "English");
	// playSpeech("Το αποτέλεσμα της παράστασης "+equation+" είναι "+getText("result"), "male", "Ελληνικά");
	neg = 0;
});
button("power", "^");
setProperty("power", "text-color", "#0072C8");
setProperty("power", "background-color", "#001D32");
setPosition("power", position_w + 3 * size + 3 * space_between, position_h + 3 * size + 3 * space_between, size, size);
setProperty("power", "border-radius", radius);
setProperty("power", "border-width", border_w);
onEvent("power", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "^");
		neg = 0;
	}
});
button("pop", "(");
setProperty("pop", "text-color", "#0072C8");
setProperty("pop", "background-color", "#001D32");
setPosition("pop", position_w + 3 * size + 3 * space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("pop", "border-radius", radius);
setProperty("pop", "border-width", border_w);
onEvent("pop", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "x");
	}
	setText("result", getText("result") + "(");
	pcount = pcount + 1;
	p += 1;
	comma_set = 0;
	neg = 0;
});
button("pcl", ")");
setProperty("pcl", "text-color", "#0072C8");
setProperty("pcl", "background-color", "#001D32");
setPosition("pcl", position_w + 4 * size + 4 * space_between, position_h + 2 * size + 2 * space_between, size, size);
setProperty("pcl", "border-radius", radius);
setProperty("pcl", "border-width", border_w);
onEvent("pcl", "click", function() {
	if (pcount > 0) {
		setText("result", getText("result") + ")");
		pcount = pcount - 1;
		comma_set = 0;
		pcl_e = 1;
	}
	if (m_pcount > 0) {
		m_pcount = m_pcount - 1;
		comma_set = 0;
		pcl_e = 1;
		var m_expression = getText("result").substring(m_cordinations[m_cordinations.length - 1], getText("result").length);
		switch ((math[math.length - 1])) {
			case 1:
				m_expression = Math.round(Math.sin(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 2:
				m_expression = Math.round(Math.cos(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 3:
				m_expression = Math.round(Math.tan(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 4:
				m_expression = Math.round(1 / Math.cos(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 5:
				m_expression = Math.round(1 / Math.sin(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 6:
				m_expression = Math.round(1 / Math.tan(culculator(prod_ex(m_expression))*0.01745329251994329576923690768489)*1000)/1000;
				break;
			case 7:
				m_expression = Math.round(Math.log(culculator(prod_ex(m_expression))) / Math.log(10)*1000)/1000;
				break;
		}
		setText("result", getText("result").substring(0, m_cordinations[m_cordinations.length - 1] - 4) + m_expression);
		removeItem(math, math.length - 1);
		removeItem(m_cordinations, m_cordinations.length - 1);
	}
});
button("multiply", "x");
setProperty("multiply", "text-color", "#0072C8");
setProperty("multiply", "background-color", "#001D32");
setPosition("multiply", position_w + 3 * size + 3 * space_between, position_h + size + space_between, size, size);
setProperty("multiply", "border-radius", radius);
setProperty("multiply", "border-width", border_w);
onEvent("multiply", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "x");
		comma_set = 0;
		neg = 0;
	}
});
button("devide", "÷");
setProperty("devide", "text-color", "#0072C8");
setProperty("devide", "background-color", "#001D32");
setPosition("devide", position_w + 4 * size + 4 * space_between, position_h + size + space_between, size, size);
setProperty("devide", "border-radius", radius);
setProperty("devide", "border-width", border_w);
onEvent("devide", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "/");
		comma_set = 0;
		neg = 0;
	}
});
button("plus", "+");
setProperty("plus", "text-color", "#0072C8");
setProperty("plus", "background-color", "#001D32");
setPosition("plus", position_w + 3 * size + 3 * space_between, position_h, size, size);
setProperty("plus", "border-radius", radius);
setProperty("plus", "border-width", border_w);
onEvent("plus", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == ")" || (getText("result")[getText("result").length - 1] == "!"))) {
		setText("result", getText("result") + "+");
		comma_set = 0;
		neg = 0;
	}
});
button("minus", "-");
setProperty("minus", "text-color", "#0072C8");
setProperty("minus", "background-color", "#001D32");
setPosition("minus", position_w + 4 * size + 4 * space_between, position_h, size, size);
setProperty("minus", "border-radius", radius);
setProperty("minus", "border-width", border_w);
onEvent("minus", "click", function() {
	if (!(isNaN(Number(getText("result")[getText("result").length - 1]))) || (getText("result")[getText("result").length - 1] == "(") || (getText("result").length == 0) || (getText("result")[getText("result").length - 1] == ")")) {
		setText("result", getText("result") + "-");
		comma_set = 0;
		neg = 0;
	}
});
