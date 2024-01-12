const mobileMenuBar = document.querySelector(".mobileMenu")
const menuSubMenu = document.querySelectorAll(".dropdown")

menuSubMenu.forEach(function(node) {
node.querySelector("a").innerHTML+='<i class="fas fa-chevron-down"></i>'
    node.addEventListener("click", function() {

       
        this.querySelector(".submenu").classList.toggle("ShowSubmenu");
    
})

})
mobileMenuBar.addEventListener("click", () => {

    
    document.querySelector(".menu").classList.toggle("ShowMenu")
    
})
