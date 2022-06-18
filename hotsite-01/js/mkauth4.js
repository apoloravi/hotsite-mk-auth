/** MODIFICADO POR PEDRO FILHO - MIT LICENCE
* SISTEMA MK-AUTH - www.mk-auth.com.br
* biblioteca padrao do sistema mk-auth
*/

 
// FUNCAO PARA INICIARMOS O AJAX NO BROWSER DO CLIENTE ----------------------------------------
function openAjax() {

	var ajax;

	try {
		ajax = new XMLHttpRequest(); // XMLHttpRequest para browsers decentes, como: Firefox, Safari, dentre outros.
	} catch (ee) {
		try {
			ajax = new ActiveXObject("Msxml2.XMLHTTP"); // Para o IE da MS
		} catch (e) {
			try {
				ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Para o IE da MS
			} catch (E) {
				ajax = false;
			}
		}
	}
	return ajax;
}


// FUNCOES PARA FORMATCAO DOS CAMPOS ----------------------------------------------------------------
function Mascara(objeto, evt, mask) {

	var LetrasU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var LetrasL = 'abcdefghijklmnopqrstuvwxyz';
	var Letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var LetrasNumeros = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
	var Numeros = '0123456789';
	var Fixos = '().-:/ ';
	var Charset = " !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_/`abcdefghijklmnopqrstuvwxyz{|}~";

	evt = (evt) ? evt : (window.event) ? window.event : "";
	var value = objeto.value;
	if (evt) {
		var ntecla = (evt.which) ? evt.which : evt.keyCode;
		tecla = Charset.substr(ntecla - 32, 1);
		if (ntecla < 32) return true;

		var tamanho = value.length;
		if (tamanho >= mask.length) return false;

		var pos = mask.substr(tamanho, 1);
		while (Fixos.indexOf(pos) != -1) {
			value += pos;
			tamanho = value.length;
			if (tamanho >= mask.length) return false;
			pos = mask.substr(tamanho, 1);
		}

		switch (pos) {
		case '#':
			if (Numeros.indexOf(tecla) == -1) return false;
			break;
		case 'N':
			if (LetrasNumeros.indexOf(tecla) == -1) return false;
			break;
		case 'A':
			if (LetrasU.indexOf(tecla) == -1) return false;
			break;
		case 'a':
			if (LetrasL.indexOf(tecla) == -1) return false;
			break;
		case 'Z':
			if (Letras.indexOf(tecla) == -1) return false;
			break;
		case '*':
			objeto.value = value;
			return true;
			break;
		default:
			return false;
			break;
		}
	}
	objeto.value = value;
	return true;
}

function MaskHORA(objeto, evt) {
	return Mascara(objeto, evt, '##:##');
}

function MaskCEP(objeto, evt) {
	return Mascara(objeto, evt, '#####-###');
}

function MaskTelefone(objeto, evt) {
	return Mascara(objeto, evt, '(##)####-####');
}

function MaskCelular(objeto, evt) {
	return Mascara(objeto, evt, '(##)#########');
}

function MaskCPF(objeto, evt) {
	return Mascara(objeto, evt, '###.###.###-##');
}

function MaskCNPJ(objeto, evt) {
	return Mascara(objeto, evt, '##.###.###/####-##');
}

function MaskData(objeto, evt) {
	return Mascara(objeto, evt, '##/##/####');
}

function MaskIP(objeto, evt) {
	return Mascara(objeto, evt, '###.###.###.###');
}

function MaskMAC(objeto, evt) {
	return Mascara(objeto, evt, 'NN:NN:NN:NN:NN:NN');
}

function MaskDataHora(objeto, evt) {
	return Mascara(objeto, evt, '##/##/#### ##:##:##');
}

function MaskCartao(objeto, evt) {
	return Mascara(objeto, evt, '#### #### #### ####');
}

function MaskLinhaDig(objeto, evt) {
	return Mascara(objeto, evt, '#####.##### #####.###### #####.###### # ##############');
}


// FUNCAO EXIBE A CAIXA DE AJUDA -----------------------------------------------------
var Help = {
	show: function (message, helpLink) {
		var helpDiv = document.createElement('div');
		helpDiv.className = 'help_box';
		helpDiv.style.left = xPageX(helpLink) + 16 + 'px';
		helpDiv.style.top = xPageY(helpLink) + 16 + 'px';
		helpDiv.appendChild(document.createTextNode(message));
		helpLink.parentNode.insertBefore(helpDiv, helpLink.nextSibling);
	},

	hide: function (helpLink) {
		helpLink.parentNode.removeChild(helpLink.nextSibling);
	}
}


function xPageY(e) {
	var y = 0;
	while (e) {
		if (xDef(e.offsetTop)) y += e.offsetTop;
		e = xDef(e.offsetParent) ? e.offsetParent : null;
	}
	return y;
}

function xPageX(e) {
	var x = 0;
	while (e) {
		if (xDef(e.offsetLeft)) x += e.offsetLeft;
		e = xDef(e.offsetParent) ? e.offsetParent : null;
	}
	return x;
}

function xDef() {
	for (var i = 0; i < arguments.length; ++i) {
		if (typeof (arguments[i]) == 'undefined') return false;
	}
	return true;
}




// FUNCAO QUE EXIBE A IMAGEM LOANDING NO CANTO -------------------------------------------
function OnLoad() {
	if (document.getElementById) // IE5 NN6
	document.getElementById("loading").style.visibility = "hidden";
	else if (document.layers) // NN4
	document.loading.visibility = "hidden";
	else if (document.all) // IE4
	document.all.loading.style.visibility = "hidden";
}




// FUNCAO PARA REDIMENCIONAR PARA FULL SCREEM ------------------------------------------------
function winSizer() {
	windowWidth = window.screen.availWidth;
	windowHeight = window.screen.availHeight;
	window.moveTo(0, 0);
	window.resizeTo(windowWidth, windowHeight);
}




// FUNCAO PARA REDIMENCIONAR JANELA --------------------------------------------------
function redWin(redw, redh) {
	windowWidth = redw;
	windowHeight = redh;
	window.moveTo(0, 0);
	window.resizeTo(windowWidth, windowHeight);
}




// FUNCAO QUE VERIFICA SE DADO UM STRING EH STRING NUMERICO --------------
function numero(string) {
	if (!string) return false;
	var Chars = "0123456789";

	for (var i = 0; i < string.length; i++) {
		if (Chars.indexOf(string.charAt(i)) == -1) return false;
	}
	return true;
}




// FUNCAO DE CONTROLE DO TECLADO ------------------------------------------------------------
shortcut = {
	'all_shortcuts': {},
	// Todos os atalhos sao armazenados nesta disposicao
	'add': function (shortcut_combination, callback, opt) {
		var default_options = {
			'type': 'keydown',
			'propagate': false,
			'disable_in_input': false,
			'target': document,
			'keycode': false
		}
		if (!opt) opt = default_options;
		else {
			for (var dfo in default_options) {
				if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target
		if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		var func = function (e) {
				e = e || window.event;

				if (opt['disable_in_input']) { // nao permite chaves de atalho na entrada, campos de Textarea
					var element;
					if (e.target) element = e.target;
					else if (e.srcElement) element = e.srcElement;
					if (element.nodeType == 3) element = element.parentNode;

					if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
				}

				if (e.keyCode) code = e.keyCode;
				else if (e.which) code = e.which;
				var character = String.fromCharCode(code).toLowerCase();

				if (code == 188) character = ","; // Se o usuario pressiona, quando o tipo for onkeydown
				if (code == 190) character = "."; // Se o usuário pressiona, quando o tipo for onkeydown
				var keys = shortcut_combination.split("+");
				var kp = 0;

				var shift_nums = {
					"`": "~",
					"1": "!",
					"2": "@",
					"3": "#",
					"4": "$",
					"5": "%",
					"6": "^",
					"7": "&",
					"8": "*",
					"9": "(",
					"0": ")",
					"-": "_",
					"=": "+",
					";": ":",
					"'": "\"",
					",": "<",
					".": ">",
					"/": "?",
					"\\": "|"
				}

				var special_keys = {
					'esc': 27,
					'escape': 27,
					'tab': 9,
					'space': 32,
					'return': 13,
					'enter': 13,
					'backspace': 8,

					'scrolllock': 145,
					'scroll_lock': 145,
					'scroll': 145,
					'capslock': 20,
					'caps_lock': 20,
					'caps': 20,
					'numlock': 144,
					'num_lock': 144,
					'num': 144,

					'pause': 19,
					'break': 19,

					'insert': 45,
					'home': 36,
					'delete': 46,
					'end': 35,

					'pageup': 33,
					'page_up': 33,
					'pu': 33,

					'pagedown': 34,
					'page_down': 34,
					'pd': 34,

					'left': 37,
					'up': 38,
					'right': 39,
					'down': 40,

					'f1': 112,
					'f2': 113,
					'f3': 114,
					'f4': 115,
					'f5': 116,
					'f6': 117,
					'f7': 118,
					'f8': 119,
					'f9': 120,
					'f10': 121,
					'f11': 122,
					'f12': 123
				}

				var modifiers = {
					shift: {
						wanted: false,
						pressed: false
					},
					ctrl: {
						wanted: false,
						pressed: false
					},
					alt: {
						wanted: false,
						pressed: false
					},
					meta: {
						wanted: false,
						pressed: false
					} // Especificacao do Meta
				};

				if (e.ctrlKey) modifiers.ctrl.pressed = true;
				if (e.shiftKey) modifiers.shift.pressed = true;
				if (e.altKey) modifiers.alt.pressed = true;
				if (e.metaKey) modifiers.meta.pressed = true;

				for (var i = 0; k = keys[i], i < keys.length; i++) {
					// Modificadores
					if (k == 'ctrl' || k == 'control') {
						kp++;
						modifiers.ctrl.wanted = true;

					} else if (k == 'shift') {
						kp++;
						modifiers.shift.wanted = true;

					} else if (k == 'alt') {
						kp++;
						modifiers.alt.wanted = true;
					} else if (k == 'meta') {
						kp++;
						modifiers.meta.wanted = true;
					} else if (k.length > 1) { // para chave especial
						if (special_keys[k] == code) kp++;

					} else if (opt['keycode']) {
						if (opt['keycode'] == code) kp++;

					} else { // As chaves especiais nao combinaram
						if (character == k) kp++;
						else {
							if (shift_nums[character] && e.shiftKey) { // Erro estupido da chave de deslocamento criado usando o lowercase
								character = shift_nums[character];
								if (character == k) kp++;
							}
						}
					}
				}

				if (kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted) {
					callback(e);

					if (!opt['propagate']) { // Para do evento
						e.cancelBubble = true;
						e.returnValue = false;

						if (e.stopPropagation) {
							e.stopPropagation();
							e.preventDefault();
						}
						return false;
					}
				}
			}
		this.all_shortcuts[shortcut_combination] = {
			'callback': func,
			'target': ele,
			'event': opt['type']
		};
		if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
		else ele['on' + opt['type']] = func;
	},

	'remove': function (shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if (!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if (ele.detachEvent) ele.detachEvent('on' + type, callback);
		else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on' + type] = false;
	}
}




// VALIDA OS DADOS DO FORMULARIO -------------------------------------------------------
function verifica_form(form) {
	var passed = false;
	var ok = false
	var campo
	for (var i = 0; i < form.length; i++) {
		campo = form[i].getAttribute("name");
		if (form[i].getAttribute("df_verificar") == "sim") {
			if (form[i].getAttribute("type") == "text" | form[i].getAttribute("type") == "textarea" | form[i].type == "password") {
				if (form[i].value == "" | form[i].value == "http://") {
					form[campo].focus();
					$.jGrowl('Preencha todos os campos requeridos corretamente');
					// alert("Preencha todos os campos requeridos corretamente");
					return passed;
					stop;
				}
			}

			var msg = ""
			if (form[campo].getAttribute("df_validar") == "cpf") msg = checa_cpf(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "senha") msg = valida_senha(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "letras") msg = chega_letras(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "mac") msg = valida_mac(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "cnpj") msg = checa_cnpj(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "cpf_cnpj") {
				msg = checa_cpf(form[campo].value);
				if (msg != "") msg = checa_cnpj(form[campo].value);
			}
			if (form[campo].getAttribute("df_validar") == "email") msg = checa_email(form[campo].value);
			if (form[campo].getAttribute("df_validar") == "numerico") msg = checa_numerico(form[campo].value);
			if (msg != "") {
				if (form[campo].getAttribute("df_validar") == "cpf_cnpj") msg = "informe corretamente o numero do CPF ou CNPJ";
				form[campo].focus();
				form[campo].select();
				$.jGrowl(msg);
				// alert(msg);
				return passed;
				stop;
			}
		}
	}
	passed = true;
	return passed;
}




// CHEGA SE DADO E NUMERICO ------------------------------------------------------------------
function checa_numerico(String) {
	var mensagem = "Este campo aceita somente números"
	var msg = "";
	if (isNaN(String)) msg = mensagem;
	return msg;
}




// CHEGA SE DADO E UM TEXTO ------------------------------------------------------------------
function chega_letras(String) {
	var regexTexto = /^[a-z' 'A-ZãÃáÁàÀêÊéÉèÈíÍìÌôÔõÕóÓòÒúÚùÙûÛçÇ.;:,ºª]+$/;
	var mensagem = "Este campo aceita somente letras"
	var msg = "";

	if (!regexTexto.test(String)) msg = mensagem;
	return msg;
}




// CHEGA SE AS SENHAS CONFEREM ------------------------------------------------------------------
function valida_senha(String) {
	var mensagem = "As senhas nao conferem!"
	var msg = "";
	if ((String) != document.getElementById('senha2').value) msg = mensagem;
	return msg;
}




// CHEGA SE DADO E UM E-MAIL ------------------------------------------------------------------
function checa_email(campo) {
	var mensagem = "Informe corretamente endereco e-mail"
	var msg = "";
	var email = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i

	var returnval = email.test(campo)
	if (returnval == false) {
		msg = mensagem;
	}

	return msg;
}




// CHEGA SE E UM CPF VALIDO ------------------------------------------------------------------------
function checa_cpf(CPF) {
	var mensagem = "informe corretamente o número do CPF"
	var msg = "";
	if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" || CPF == "22222222222" || CPF == "33333333333" || CPF == "44444444444" || CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" || CPF == "88888888888" || CPF == "99999999999") msg = mensagem;
	soma = 0;
	for (y = 0; y < 9; y++)
	soma += parseInt(CPF.charAt(y)) * (10 - y);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11) resto = 0;
	if (resto != parseInt(CPF.charAt(9))) msg = mensagem;
	soma = 0;
	for (y = 0; y < 10; y++)
	soma += parseInt(CPF.charAt(y)) * (11 - y);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11) resto = 0;
	if (resto != parseInt(CPF.charAt(10))) msg = mensagem;
	return msg;
}




// CHEGA SE E UM CNPJ VALIDO -------------------------------------------------------
function checa_cnpj(s) {
	var mensagem = "informe corretamente o número do CNPJ"
	var msg = "";
	var y;
	var c = s.substr(0, 12);
	var dv = s.substr(12, 2);
	var d1 = 0;
	for (y = 0; y < 12; y++) {
		d1 += c.charAt(11 - y) * (2 + (y % 8));
	}
	if (d1 == 0) msg = mensagem;
	d1 = 11 - (d1 % 11);
	if (d1 > 9) d1 = 0;
	if (dv.charAt(0) != d1) msg = mensagem;
	d1 *= 2;
	for (y = 0; y < 12; y++) {
		d1 += c.charAt(11 - y) * (2 + ((y + 1) % 8));
	}
	d1 = 11 - (d1 % 11);
	if (d1 > 9) d1 = 0;
	if (dv.charAt(1) != d1) msg = mensagem;
	return msg;
}




// VALIDA ENDERECO MAC --------------------------------------------------------------------
function valida_mac(String) {
	var mensagem = "Informe corretamente o endereco MAC"
	var msg = "";
	var regex = /^([0-9A-F]{2}[:-]){5}[0-9A-F]{2}$/i;
	if (!regex.test(String)) msg = mensagem;
	return msg;
}





// FUNCOES PARA CONTROLE DE AVANCO EM CAMPOS DE TEXTO --------------
function semTab() {
	checatab = false;
}

function comTab() {
	checatab = true;
}

checatab = true;

function pula(origem, tamanho, destino) {
	if ((origem.value.length == tamanho) && checatab) destino.focus();
}






// MENU HORIZONTAL ----------------------------------------------------------------------------------
function menuHorizontal() {
	var navItems = document.getElementById("menu_dropdown").getElementsByTagName("li");
	for (var i = 0; i < navItems.length; i++) {
		if (navItems[i].className == "submenu") {
			if (navItems[i].getElementsByTagName('ul')[0] != null) {
				navItems[i].onmouseover = function () {
					this.getElementsByTagName('ul')[0].style.display = "block";
					this.style.backgroundColor = "#f9f9f9";
				}
				navItems[i].onmouseout = function () {
					this.getElementsByTagName('ul')[0].style.display = "none";
					this.style.backgroundColor = "#ffffff";
				}
			}
		}

		if (navItems[i].className == "submais") {
			if (navItems[i].getElementsByTagName('ul')[0] != null) {
				navItems[i].onmouseover = function () {
					this.getElementsByTagName('ul')[0].style.display = "block";
				}
				navItems[i].onmouseout = function () {
					this.getElementsByTagName('ul')[0].style.display = "none";
				}
			}
		}

	}
}





// SSL POR AJAX ----------------------------------------------------------------------------------
function aSSL() {
	if (document.getElementById) // IE5 NN6
	document.getElementById("connecting").style.display = "none";
	document.getElementById("connected").style.display = "block";
}





// FORMATA CAMPOS DE VALOR ----------------------------------------------------------------------------
function FormataValor(campo, tammax, teclapres) {
	var tecla = teclapres.keyCode;
	vr = campo.value;
	vr = vr.replace(/[^\d]*/gi, "");
	tam = vr.length;

	if (tam < tammax && tecla != 8) {
		tam = vr.length + 1;
	}

	if (tecla == 8) {
		tam = tam - 1;
	}

	if (tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105) {
		campo.value = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
	}

	if (tam <= 2) {
		campo.value = vr;
	}

	if ((tam > 2) && (tam <= 5)) {

		if ((tam >= 6) && (tam <= 8)) {
			campo.value = vr.substr(0, tam - 5) + '' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
		}
		if ((tam >= 9) && (tam <= 11)) {
			campo.value = vr.substr(0, tam - 8) + '' + vr.substr(tam - 8, 3) + '' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
		}
		if ((tam >= 12) && (tam <= 14)) {
			campo.value = vr.substr(0, tam - 11) + '' + vr.substr(tam - 11, 3) + '' + vr.substr(tam - 8, 3) + '' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
		}
		if ((tam >= 15) && (tam <= 17)) {
			campo.value = vr.substr(0, tam - 14) + '' + vr.substr(tam - 14, 3) + '' + vr.substr(tam - 11, 3) + '' + vr.substr(tam - 8, 3) + '' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
		}

		//limpa zeros a esquerda
		if (campo.value.substr(0, 1) == '0' && campo.value.substr(0, 2) != '0.') campo.value = campo.value.substr(1, tam);
	}

}




// CRIA UM LINK ----------------------------------------------------------------------------
function link(vlink) {
	window.location.href = vlink;
}




// DESATIVA O BACKSPACE -----------------------------------------------------------------
function preventBackspace(e) {
	var evt = e || window.event;
		if (evt) {
			var keyCode = evt.charCode || evt.keyCode;
			if (keyCode === 8) {
			if (evt.preventDefault) {
				evt.preventDefault();
				} else {
				evt.returnValue = false;
				}
			}
		}
}



// RELOAD DEPOIS DE ALGUNS SEGUNDOS ------------------------------------------------------
function reloadAqui() {
setTimeout("location.reload(true);",3000);
}
