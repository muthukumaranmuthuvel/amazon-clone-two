import {db} from "./firebase.js";
import { collection, getDocs,getDoc, doc, setDoc,deleteDoc ,updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
async function getCartItems(){
    await onSnapshot(collection(db, "cart-items"), (doc) => {
        let cartItems=[];
        doc.forEach(element => {
            cartItems.push({
                id:element.id,
                ...element.data()
            })
          generateCartItems(cartItems);
          getTotalCost(cartItems);
        });
       
    });
}
function getTotalCost(items){
    let totalcost = 0;
    items.forEach((item)=>{
        totalcost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerHTML = numeral(totalcost).format("$0,0.00");
}

async function decreaseCount(itemId){
    const cartItem = doc(db, "cart-items",itemId);
    const docSnap = await getDoc(cartItem);
    if(docSnap.exists()){
        if(docSnap.data().quantity>1){
            updateDoc(cartItem,{
                quantity:docSnap.data().quantity-1
            })
        }
    }

}

async function increaseCount(itemId){
    const cartItem = doc(db, "cart-items",itemId);
    const docSnap = await getDoc(cartItem);
    if(docSnap.exists()){
        if(docSnap.data().quantity>0){
            updateDoc(cartItem,{
                quantity:docSnap.data().quantity+1
            })
        }
    }

}

async function deleteItem(itemId){
    console.log("delete")
    await deleteDoc(doc(db,"cart-items",itemId));

}

function generateCartItems(cartItems){
    let itemsHTML ="";
    cartItems.forEach((item)=>{
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-100">
                    <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
                        <img class ="w-full h-full object-contain" src="${item.image}"> 
                    </div>
                
                    <div class="cart-item-details flex-grow ">
                        <div class="cart-item-title font-bold text-sm text-gray-600">
                            ${item.name}
                        </div>
                        <div class="cart-item-brand text-sm text-gray-400">
                            ${item.make}
                        </div>
                    </div>
                    <div class="cart-item-counter w-48 flex items-center">
                        <div data-id="${item.id}" class="cart-item-decrease cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200">
                            <i class="fas fa-chevron-left fa-xs"></i>
                        </div>
                        <h4 class="text-gray-400 mx-2">x${item.quantity}</h4>
                        <div data-id="${item.id}"class="cart-item-increase cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200">
                            <i class="fas fa-chevron-right fa-xs"></i>
                        </div>
                    </div>
                    <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                    ${numeral(item.price * item.quantity).format("$0,0.00")}
                        
                    </div>
                    <div data-id="${item.id}" class="cart-item-delete cursor-pointer text-gray-400 bg-gray-200 rounded h-6 w-10 flex justify-center items-center hover:bg-gray-300">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
            decreaseCount(button.dataset.id);
        })
    })
    increaseButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
            increaseCount(button.dataset.id);
        })
    })
    deleteButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();