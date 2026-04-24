let inputslider=document.querySelector("#inputslider");
let slidevalue=document.querySelector("#slidevalue");
let symbols=document.querySelector("#symbols")
let number=document.querySelector("#number")
let upercase=document.querySelector("#upercase")
let lowercase=document.querySelector("#lowercase")
let passbox=document.querySelector("#passbox")
let getbtn=document.querySelector(".getbtn")

// slidevalue.textContent=inputslider.value

inputslider.addEventListener("input",()=>{
    slidevalue.textContent=inputslider.value
}); 

getbtn.addEventListener("click",()=>{
    passbox.value=generatepassword();
})

function generatepassword(){
    let passwordstor;

    passwordstor=Math.floor(Math.random() * 10);
    return passwordstor;
}