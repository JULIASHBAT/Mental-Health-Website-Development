const pages={
    "home":"white",
    "projects":"lightblue",
    "about":"lightgreen"
}

const showPage=(page=>{
    document.querySelector("h1").innerText=page
    document.querySelector('#content').style.backgroundColor=pages[page]
})

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("btnThemeMode").addEventListener("click",function(){
        document.documentElement.classList.toggle("dark")
        document.getElementById("btnThemeMode").innerText=document.documentElement.classList.contains("dark")?"Light":"Dark"
    })
    document.querySelectorAll("a").forEach(function(el){
        el.addEventListener("click",function(){
            showPage(el.innerText.toLocaleLowerCase())
        })
    })
})