var operacion=null;
var inputValueMemo=0;
function getContentClick(event){
    const value= event.target.innerHTML;
    filterAction(value);
}
const filterAction = value => {
    value==="0" ? addNumberInput(0): null;
    value==="1" ? addNumberInput(1): null; 
    value==="2" ? addNumberInput(2): null; 
    value==="3" ? addNumberInput(3): null; 
    value==="4" ? addNumberInput(4): null;  
    value==="5" ? addNumberInput(5): null; 
    value==="6" ? addNumberInput(6): null; 
    value==="7" ? addNumberInput(7): null; 
    value==="8" ? addNumberInput(8): null; 
    value==="9" ? addNumberInput(9): null; 
    value==="," ? addNumberInput(','): null; 
    
    value==="+" ? setOperation('+'): null; 
    value==="-" ? setOperation('-'): null; 
    value==="X" ? setOperation('*'): null; 
    value==="/" ? setOperation('/'): null; 
    value==="%" ? setOperation('%'): null; 
    value==="+/-" ? setOperation('+/-'): null; 
    value==="AC" ? resetCalculator(): null;
    value==="=" ? calculation(): null;  
    /*es equivalente a
    if(value === "0"){ addNumberInput(value)}else { addNumberInput(null);}
    console.log(value);
    */
}

function addNumberInput(value){
    /*puede ser asi: document.getElementsByClassName('calculator_Screen')[0].value=value;*/
    /*o asi*/
    const inputScreen = document.getElementsByClassName('calculator_screen')[0];
    const inputValue = inputScreen.value;
    if(inputValue==="0" && inputValue.length === 1 && value !== ","){
        inputScreen.value =value;
        return; //para que actualice antes que el inputScreen de abajo
    }
    if(inputScreen.value==="" && value===","){ inputScreen.value= 0 + value; return }
    inputScreen.value = inputValue + value; 
}
/*operacion es el operator de el */
function setOperation(operacion){
    const inputScreenValue = document.getElementsByClassName('calculator_screen')[0].value;
    this.operacion=operacion;
    if(inputScreenValue!= 0){
        calculation();
    }
}
function calculation(){
    const inputScreen = document.getElementsByClassName('calculator_screen')[0];
    let valueOne= transformComaToPoint(this.inputValueMemo);
    let valuetwo = transformComaToPoint(inputScreen.value);
    let total=0;
    if(this.operacion === "+" && inputScreen.value !== "")
    {
        total= valueOne + valuetwo; 
    }
    if(this.operacion === "-" && inputScreen.value !== "")
    {
        if(valueOne !== 0 )
        {
            total= valueOne - valuetwo; 
        } else { total = valuetwo;}
    }
    if(this.operacion === "*" && inputScreen.value !== "")
    {
        if(valueOne !== 0 )
        {
            total= valueOne * valuetwo; 
        } else { total = 0;}
    }
    if(this.operacion === "/" && inputScreen.value !== "")
    {   /*If hice yo error infinito y 0 dividido en algo es 0 */
        if(valueOne !== 0 )
        {   
            total= valueOne / valuetwo; 
        } else { if(valuetwo === 0){ total = "error";} else { total = 0;}}
    }
    if(this.operacion === "%" && inputScreen.value !== "")
    {   total = valuetwo / 100;
    }
    if(this.operacion === "+/-" && inputScreen.value !== "")
    {   if(valuetwo >0){ total = -valuetwo; }
    }
    total=transformPointToComa(total);
    this.inputValueMemo=total; inputScreen.value="";
    inputScreen.placeholder=total;
}
function transformComaToPoint(value){
    if(typeof value !== "number"){
        let resultTransform= value.replace(',','.');
        return parseFloat(resultTransform)
    }
    return value;
}
function transformPointToComa(value){
    let resultTransform= value.toString();
        resultTransform= resultTransform.replace('.',',');
        return resultTransform;
}
/*Boton AC */
const resetCalculator = () => {
    const inputScreen= document.getElementsByClassName('calculator_screen')[0];
    inputScreen.value=0;
    this.inputValueMemo=0;
    this.operacion=null;
}
