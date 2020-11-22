/* ----------------------------------------------------------------------------------- */
/* Animação ao selecionar a abertura/fechamento do menu lateral de opções do website   */
/* ----------------------------------------------------------------------------------- */


var bool = 1;
var trigger = document.getElementById('menuShow').addEventListener("click",function(){
var menu = document.getElementById('menuHide');
var dark = document.getElementById('escurecer');
if (bool == 1) {
menu.style.left = "0px";
dark.style.top = "75px";
bool = 0;
}else{
menu.style.left = "-100%";
dark.style.top = "-100%";
bool = 1;
}
})

var trigger2 = document.getElementById('escurecer').addEventListener("click",function(){
var dark = document.getElementById('escurecer');
var menu = document.getElementById('menuHide');
if (bool == 0) {
    dark.style.top = "-100%";
    menu.style.left = "-100%";
    bool = 1;
    
}
})


/* ------------------------------------------------------------------------- */
/* Animação do botão para voltar ao topo da página ao rolar abaixo do menu   */
/* ------------------------------------------------------------------------- */

mybutton = document.getElementById("btnTopo");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0; 
}


/* --------------------------------------------------------------- */
/* Cálculos da aba PORCENTAGEM: Aumento e diminuição percentual    */
/* --------------------------------------------------------------- */

// LUCRO

function aumentoValor() {
    
    var percentual = document.getElementById('inputPercentualAumentar').value;
    var valor = document.getElementById('inputPrecoAumentar').value;
    
    var acresimo = 1 + (percentual / 100);
    document.getElementById('resultAumentar').value = valor * acresimo;
    
    
}
    

// PREJUÍZO

function diminuicaoValor() {
    
    var percentual = document.getElementById('inputPercentualDiminuir').value;
    var valor = document.getElementById('inputPrecoDiminuir').value;
    var decresimo = 1 - (percentual / 100);

    document.getElementById('resultDiminuir').value = valor * decresimo;
    
    
}
 
// VARIAÇÃO PERCENTUAL

function variacaoPercentual() {
    
    var valor1 = document.getElementById('inputValor1').value;
    var valor2 = document.getElementById('inputValor2').value;
    var aumento = valor2 - valor1;
    
    document.getElementById('resultVariaPercentual').value = (aumento / valor1) * 100 ;
    
    
}
/* ----------------------------------------------------------------------------------- */
/* Cálculos da aba CALCPRECO: Fórmula da distribuição normal padrão cumulativa         */
/* ----------------------------------------------------------------------------------- */

// Distribuição normal padrão N(1) utilizada na fórmula de Black-Scholes
function N(x) {
  return 0.5 * (1 + erf((x - 0) / (Math.sqrt(2 * 1))));
}

function erf(x) {

  var sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // constantes
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;
  var p  =  0.3275911;

  var t = 1.0/(1.0 + p*x);
  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y; // erf(-x) = -erf(x);
}



/* --------------------------------------------------------------- */
/* Cálculos da aba CALCPRECO: Calculadora de Black-Scholes         */
/* --------------------------------------------------------------- */
    

function blackScholes() {
    
    var S = document.getElementById('inputAcao').value;         // Ação
    var K = document.getElementById('inputStrike').value;       // Strike
    var r = document.getElementById('inputJuros').value;        // Taxa de juros
    var d = document.getElementById('inputDividendos').value;   // Taxa de dividendos
    var T = document.getElementById('inputVencimento').value;   // Dias úteis para vencimento
    var vol = document.getElementById('inputVol').value;        // Volatilidade implícita
    
    // CONVERTER CASAS DECIMAIS
    
    // 1<T<0
    T = T / 256;
    
    // Retirar o %
    if (r != 0)
        r = r / 100; 
    else r = 0;
    
    if (d != 0)
        d = d / 100;  
    else d = 0;
    
    vol = vol / 100;    
    
    // Calcula-se o COST-OF-CARRY da determinada opção
    
    var q = r - d;
    
    // Cálculos matemáticos básicos
    
    var sqr_vol = vol * vol;
    var raiz_T = Math.sqrt(T);
    
    // Cálculos matemáticos da fórmula de Black-Scholes
    
    var d1 = (Math.log(S / K) + (q + sqr_vol / 2) * T) /(vol * raiz_T);
    var d2 = d1 - (vol * raiz_T);
    
    // Cria-se a variável para retorno conforme a condição call/put
    var retorno = 0;
    
    // Verifica o tipo de opção (call/put)
    
    var tipo = "call";
    
    if (document.getElementById('tipoOpcao').value == tipo) {
        
        var call = (S * Math.exp((q - r) * T) * N(d1)) - (K * Math.exp(-r * T) * N(d2));
        retorno = call;
    } else {
        
        var put = (K * Math.exp(-r * T) * N(-d2)) - (S * Math.exp((q - r) * T) * N(-d1));
        retorno = put;
    }
    
    retorno = parseFloat(retorno.toFixed(2));
    
    document.getElementById('inputResultadoOpt').value = retorno;
    
    
    
    
    
    
}
