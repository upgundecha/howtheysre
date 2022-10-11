let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
var screenvalue='';
for(item of buttons){
    item.addEventListener('click',(e)=>{
        buttonText=e.target.innerText;
        console.log('Button text is',buttonText);
    if(buttonText=='X'){
        buttonText='*';
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    else if(buttonText=='/')
    {
        buttonText='/';
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    else if(buttonText=='-')
    {
        buttonText='-';
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    else if(buttonText=='+')
    {
        buttonText='+';
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    else if(buttonText=='CE')
    {
        buttonText='CE';
        screenvalue='';
        screen.value='';
    }
    else if(buttonText=='%')
    {
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    else if(buttonText=='=')
    {
        buttonText='=';
        screen.value +=buttonText;
        screen.value +=eval(screenvalue);
    }
    else{
        screenvalue+=buttonText;
        screen.value+=buttonText;
    }
    })
    
}