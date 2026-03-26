// items table array holding items
const MENU_ITEMS = [
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
    { id: 1, name: "Expresso/Americano", price: 5.50, calories: "30Cal", description: "Hot Espresso/Americano", category: "Breakfast", image: "../images/img4.jpg" },
    { id: 2, name: "Latte/Capuccino", price: 6.00, calories: "100Cal", description: "Hot Latte", category: "Breakfast", image: "../images/img6.jpg" },
    { id: 3, name: "Cloud Macchiato(Signature)", price: 7.50, calories: "50Cal", description: "Hot Espresso with creamer", category: "Breakfast", image: "../images/img7.jpg" },
    { id: 4, name: "Iced Golden Latte", price: 7.00, calories: "60Cal", description: "Chilled Espresso coffee customizable", category: "Lunch", image: "../images/img8.jpg" },
    { id: 5, name: "Cold Brew", price: 5.50, calories: "70Cal", description: "Cold Espresso", category: "Lunch", image: "../images/img9.jpg" },
    { id: 6, name: "Spain Croissant", price: 3.99, calories: "250Cal", description: "Hot Espresso", category: "Lunch", image: "../images/img10.jpg" },
    { id: 7, name: "Cafe chaud", price: 13.99, calories: "160Cal", description: "Morning dew taste with vanilla", category: "Dinner", image: "../images/img11.jpg" },
    { id: 8, name: "Cake fondu", price: 7.99, calories: "310Cal", description: "Spicy cake, customizable", category: "Dinner", image: "../images/img12.jpg" },
    { id: 9, name: "Bonnet Bleu Coffee", price: 15.99, calories: "130Cal", description: "Delicious Blend of natural concentrated milk", category: "Dinner", image: "../images/img13.jpg" },
    { id: 10, name: "Tarte fondu chau", price: 7.99, calories: "360Cal", description: "Spicy cake melted, with caramel", category: "Dinner", image: "../images/img14.jpg" },
    { id: 11, name: "Iced Latte Croissant", price: 15.99, calories: "390Cal", description: "Spicy croissant melted, with Latte", category: "Dinner", image: "../images/img15.jpg" }
<<<<<<< HEAD
=======
    { id: 1, name: "Expresso/Americano", price: 4.50, calories: "30Cal", description: "Hot Espresso/Americano", category: "Breakfast" },
    { id: 2, name: "Latte/Capuccino", price: 6.00, calories: "100Cal", description: "Hot Latte", category: "Breakfast" },
    { id: 3, name: "Cloud Macchiato(Signature)", price: 7.50, calories: "50Cal", description: "Hot Espresso with creamer", category: "Breakfast" },
    { id: 4, name: "Iced Golden Latte", price: 7.00, calories: "60Cal", description: "Chilled Espresso coffee customizable", category: "Lunch" },
    { id: 5, name: "Cold Brew", price: 5.50, calories: "70Cal", description: "Cold Espresso", category: "Lunch" },
    { id: 6, name: "Spain Croissant", price: 3.99, calories: "250Cal", description: "Hot Espresso", category: "Lunch" },
    { id: 7, name: "Cafe Sho", price: 13.99, calories: "160Cal", description: "Morning dew taste with vanilla", category: "Dinner" },
    { id: 8, name: "Cafe fondu", price: 7.99, calories: "310Cal", description: "Spicy cake, customizable", category: "Dinner" },
    { id: 9, name: "Bonnet Bleu Coffee", price: 15.99, calories: "130Cal", description: "Delicious Blend of natural concentrated milk", category: "Dinner" },
    { id: 10, name: "Tarte fondu Sho", price: 7.99, calories: "360Cal", description: "Spicy cake melted, with caramel", category: "Dinner" }
>>>>>>> ae626e9 (updated script.js file and updated html files)
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
];
//money format function
const money = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD" });
money.format(12.5);

//jS function to populate popup table
function populateTableWithMethods(data) {
    const tableBody = document.getElementById("tableBody");
    data.forEach(element => {
// creation of row -1 appends a row at the bottom
        let row = tableBody.insertRow(-1);
// insert cells at the end of the row
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerText = element.id;
        cell2.innerText = element.name;
        cell2.style.cursor = "pointer";
        cell2.onclick = function () {
            const imageContainer = document.getElementById("imageContainer");
            const itemImage = document.getElementById("itemImage");
            const imageTitle = document.getElementById("imageTitle");

            if (imageContainer && itemImage && imageTitle) {
                itemImage.src = element.image;
                itemImage.alt = element.name;
                imageTitle.innerText = element.name;
                imageContainer.style.display = "block";
                imageContainer.scrollIntoView({behavior: 'smooth'});
            }
        };
<<<<<<< HEAD
=======

        cell1.innerText = element.id;
        cell2.innerText = element.name;
>>>>>>> ae626e9 (updated script.js file and updated html files)
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
        cell3.innerText = money.format(element.price);
        cell4.innerText = element.calories;
        cell5.innerText = element.description;
        cell6.innerText = element.category;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)

        // ADDING QUANTITY SELECTOR
        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.value = 1;
        qtyInput.min = 1;
        qtyInput.max = 10;
        qtyInput.className = "form-control form-control-sm";
        qtyInput.style.width = "60px";
        cell7.appendChild(qtyInput);

        // ADDING ADD TO CART BUTTON
        const addBtn = document.createElement("button");
        addBtn.innerText = "Add to Cart";
        addBtn.className = "btn btn-primary btn-sm";
        addBtn.onclick = function() {
            addToCart(element, parseInt(qtyInput.value));
        };
        cell8.appendChild(addBtn);
<<<<<<< HEAD
=======
>>>>>>> ae626e9 (updated script.js file and updated html files)
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
    });
}
function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}
<<<<<<< HEAD
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");

    // Helper function to refresh the table
    const filterMenu = (category) => {
        // Clearing the current table content
        tableBody.innerHTML = "";

        if (category === "All") {
            populateTableWithMethods(MENU_ITEMS);
        } else {
            const filtered = MENU_ITEMS.filter(item => item.category === category);
            populateTableWithMethods(filtered);
        }
    };
    document.getElementById("dropdown_item_all").addEventListener("click", () => filterMenu("All"));
    document.getElementById("dropdown_item_breakfast").addEventListener("click", () => filterMenu("Breakfast"));
    document.getElementById("dropdown_item_lunch").addEventListener("click", () => filterMenu("Lunch"));
    document.getElementById("dropdown_item_dinner").addEventListener("click", () => filterMenu("Dinner"));

    if (tableBody) {
=======

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tableBody")) {
>>>>>>> ae626e9 (updated script.js file and updated html files)
=======
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");

    // Helper function to refresh the table
    const filterMenu = (category) => {
        // Clearing the current table content
        tableBody.innerHTML = "";

        if (category === "All") {
            populateTableWithMethods(MENU_ITEMS);
        } else {
            const filtered = MENU_ITEMS.filter(item => item.category === category);
            populateTableWithMethods(filtered);
        }
    };
    document.getElementById("dropdown_item_all").addEventListener("click", () => filterMenu("All"));
    document.getElementById("dropdown_item_breakfast").addEventListener("click", () => filterMenu("Breakfast"));
    document.getElementById("dropdown_item_lunch").addEventListener("click", () => filterMenu("Lunch"));
    document.getElementById("dropdown_item_dinner").addEventListener("click", () => filterMenu("Dinner"));

    if (tableBody) {
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
        populateTableWithMethods(MENU_ITEMS);
    }

    const reservationForm = document.getElementById("reservationForm");
    if (reservationForm) {
        reservationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(reservationForm);
            const name = formData.get("name");
            const email = formData.get("Email");
            const partySize = formData.get("Party_Size");
            const date = formData.get("Date");
            const time = formData.get("Time");
            const seatingPreference = formData.get("seating_preference");
            const newsletter = formData.get("Newsletter") ? "Yes" : "No";
            const dietaryNotes = formData.get("DietaryNotes") || "None";

            if (!name || !email || !date || !time || !seatingPreference) {
                showAlert("Please fill in all required fields.", "danger");
                return;
            }


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert("Please enter a valid email address.", "danger");
                return;
            }

            showAlert("Reservation submitted successfully!", "success");

            const reservationData = {
                name: name,
                email: email,
                partySize: partySize,
                date: date,
                time: time,
                seatingPreference: seatingPreference,
                newsletter: newsletter,
                dietaryNotes: dietaryNotes
            };

            console.log("Reservation Data Submitted:", reservationData);

            const resultDiv = document.getElementById("reservationResult");
            const resultContent = document.getElementById("resultContent");

            if (resultDiv && resultContent) {
                resultContent.innerHTML = `
                    <strong>Name:</strong> ${name}<br>
                    <strong>Email:</strong> ${email}<br>
                    <strong>Party Size:</strong> ${partySize}<br>
                    <strong>Date:</strong> ${date}<br>
                    <strong>Time:</strong> ${time}<br>
                    <strong>Seating:</strong> ${seatingPreference}<br>
                    <strong>Newsletter:</strong> ${newsletter}<br>
                    <strong>Dietary Notes:</strong> ${dietaryNotes}
                `;
                resultDiv.style.display = "block";
                resultDiv.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
});
function addToCart(item, quantity) {

    // Get existing cart from localStorage or start empty array
    let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex > -1) {
        // Update quantity if it exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item with specific properties
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity,
            image: item.image
        });
    }
    //Save back to localStorage
    localStorage.setItem("coffeeCart", JSON.stringify(cart));
    showAlert(`${quantity} x ${item.name} added to cart!`, "success");

    localStorage.setItem("coffeeCart", JSON.stringify(cart));
    updateCartBadge();
    showAlert(`${quantity} x ${item.name} added to cart!`, "success");

}
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
    const badge = document.getElementById("cart-count");

    if (badge) {
        // Calculate total quantity of all items
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;

        // Hides badge if cart is empty
        badge.style.display = totalItems > 0 ? "inline-block" : "none";
    }
}

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", updateCartBadge);
=======
});
>>>>>>> ae626e9 (updated script.js file and updated html files)
=======
document.addEventListener("DOMContentLoaded", updateCartBadge);
>>>>>>> 70bb4f6 (exam 3 updates and creation of cart.js and cart.html and 11 mores images to display on menu.html)
