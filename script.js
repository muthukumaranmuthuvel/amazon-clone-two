import {db} from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

async function  getItems(){
    const querySnapshot = await getDocs(collection(db, "items"));
    let items=[];
    querySnapshot.forEach((doc) => {
        items.push({
            id:doc.id,
            image:doc.data().image,
            name:doc.data().name,
            make:doc.data().make,
            rating:doc.data().rating,
            price:doc.data().price
        })
        
        generateItems(items);
    });
}

function generateItems(items){
    let itemsHTML ="";
    items.forEach((item)=>{
        itemsHTML +=`
        <div class="main-product ml-4 ">
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain" src="${item.image}" >
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
            ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
            ${item.make}
            </div>
            <div class="product-rating text-yellow-300 my-1">
            ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700">
            $${item.price}
            </div>
            <div class="add-to-cart h-8 w-28 bg-yellow-500 flex items-center justify-center text-white rounded text-md cursor-pointer hover:bg-yellow-600">
            Add to cart
            </div>
        </div>

        `

    })
    document.querySelector(".main-section-deals").innerHTML = itemsHTML;
}
getItems();