import {db} from "./firebase.js";
import { collection,query,doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

async function updateCartCount(){
    await onSnapshot(collection(db, "cart-items"), (doc) => {
        let count = 0;
        doc.forEach(element => {
            count += element.data().quantity ;
           
        });
        console.log("Total : ", count);
        displayNotification(count);
    });
}

function displayNotification(count){

console.log(count);
let doc =document.createElement("div");
doc.classList.add("cart-item-number", "absolute", "-top-1", "-right-1", "h-4", "w-4", "bg-white", "rounded-full", "flex", "justify-center", "items-center", "text-gray-800", "text-xs");
doc.innerHTML = `
${count}
`
document.querySelector(".cart-icon").appendChild(doc);
}
updateCartCount();