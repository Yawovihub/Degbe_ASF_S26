// 1. Menu Data Array
const MENU_ITEMS = [
  { id: 1, name: "Espresso/Americano", price: 5.50, calories: "30Cal", description: "Hot Espresso/Americano", category: "Breakfast", image: "../images/img4.jpg" },
  { id: 2, name: "Latte/Cappuccino", price: 6.00, calories: "100Cal", description: "Hot Latte", category: "Breakfast", image: "../images/img6.jpg" },
  { id: 3, name: "Cloud Macchiato (Signature)", price: 7.50, calories: "50Cal", description: "Hot Espresso with creamer", category: "Breakfast", image: "../images/img7.jpg" },
  { id: 4, name: "Iced Golden Latte", price: 7.00, calories: "60Cal", description: "Chilled Espresso coffee customizable", category: "Lunch", image: "../images/img8.jpg" },
  { id: 5, name: "Cold Brew", price: 5.50, calories: "70Cal", description: "Cold Espresso", category: "Lunch", image: "../images/img9.jpg" },
  { id: 6, name: "Spain Croissant", price: 3.99, calories: "250Cal", description: "Flaky buttery croissant", category: "Lunch", image: "../images/img10.jpg" },
  { id: 7, name: "Café Chaud", price: 13.99, calories: "160Cal", description: "Morning dew taste with vanilla", category: "Dinner", image: "../images/img11.jpg" },
  { id: 8, name: "Cake Fondu", price: 7.99, calories: "310Cal", description: "Spicy cake, customizable", category: "Dinner", image: "../images/img12.jpg" },
  { id: 9, name: "Bonnet Bleu Coffee", price: 15.99, calories: "130Cal", description: "Delicious Blend of natural concentrated milk", category: "Dinner", image: "../images/img13.jpg" },
  { id: 10, name: "Tarte Fondu Chaud", price: 7.99, calories: "360Cal", description: "Spicy cake melted, with caramel", category: "Dinner", image: "../images/img14.jpg" },
  { id: 11, name: "Iced Latte Croissant", price: 15.99, calories: "390Cal", description: "Spicy croissant melted, with Latte", category: "Dinner", image: "../images/img15.jpg" }
];

// 2. Currency Formatter
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// 3. Populate Table Function
function populateTableWithMethods(data) {
  const tableBody = document.getElementById("tableBody");
  if (!tableBody) return;

  tableBody.innerHTML = ""; // Clear table first

  data.forEach(element => {
    let row = tableBody.insertRow(-1);

    // Insert cells
    let cellId = row.insertCell(0);
    let cellName = row.insertCell(1);
    let cellPrice = row.insertCell(2);
    let cellCal = row.insertCell(3);
    let cellDesc = row.insertCell(4);
    let cellCat = row.insertCell(5);
    let cellQty = row.insertCell(6);
    let cellAdd = row.insertCell(7);

    cellId.innerText = element.id;
    cellName.innerText = element.name;
    cellName.style.cursor = "pointer";
    cellName.className = "text-primary text-decoration-underline";

    // Image display logic on click
    cellName.onclick = function () {
      const imageContainer = document.getElementById("imageContainer");
      const itemImage = document.getElementById("itemImage");
      const imageTitle = document.getElementById("imageTitle");

      if (imageContainer && itemImage) {
        itemImage.src = element.image;
        itemImage.alt = element.name;
        if (imageTitle) imageTitle.innerText = element.name;
        imageContainer.style.display = "block";
        imageContainer.scrollIntoView({behavior: 'smooth'});
      }
    };

    cellPrice.innerText = money.format(element.price);
    cellCal.innerText = element.calories;
    cellDesc.innerText = element.description;
    cellCat.innerText = element.category;

    // Quantity Selector
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.value = 1;
    qtyInput.min = 1;
    qtyInput.max = 10;
    qtyInput.className = "form-control form-control-sm mx-auto";
    qtyInput.style.width = "60px";
    cellQty.appendChild(qtyInput);

    // Add to Cart Button
    const addBtn = document.createElement("button");
    addBtn.innerText = "Add";
    addBtn.className = "btn btn-primary btn-sm";
    addBtn.onclick = function() {
      addToCart(element, parseInt(qtyInput.value));
    };
    cellAdd.appendChild(addBtn);
  });
}

// 4. Cart Logic
function addToCart(item, quantity) {
  let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      image: item.image
    });
  }

  localStorage.setItem("coffeeCart", JSON.stringify(cart));
  updateCartBadge();
  showAlert(`${quantity} x ${item.name} added to cart!`, "success");
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
  const badge = document.getElementById("cart-count");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// 5. Utility Functions
function showAlert(message, type) {
  // Look for an alert container or create a temporary one
  let alertContainer = document.getElementById("alertContainer");
  if (!alertContainer) {
    alertContainer = document.createElement("div");
    alertContainer.id = "alertContainer";
    alertContainer.style = "position: fixed; top: 20px; right: 20px; z-index: 9999;";
    document.body.appendChild(alertContainer);
  }

  alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show shadow" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  // Auto-remove alert after 3 seconds
  setTimeout(() => {
    const bsAlert = document.querySelector('.alert');
    if (bsAlert) bsAlert.classList.remove('show');
  }, 3000);
}

// 6. Initialization & Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // Menu Table Initialization
  const tableBody = document.getElementById("tableBody");
  if (tableBody) {
    populateTableWithMethods(MENU_ITEMS);

    // Filter Logic
    const filterMenu = (category) => {
      if (category === "All") {
        populateTableWithMethods(MENU_ITEMS);
      } else {
        const filtered = MENU_ITEMS.filter(item => item.category === category);
        populateTableWithMethods(filtered);
      }
    };

    // Attach filter listeners
    const filters = ["all", "breakfast", "lunch", "dinner"];
    filters.forEach(f => {
      const el = document.getElementById(`dropdown_item_${f}`);
      if (el) el.addEventListener("click", () => filterMenu(f.charAt(0).toUpperCase() + f.slice(1)));
    });
  }

  // Reservation Form Logic
  const resForm = document.getElementById("reservationForm");
  if (resForm) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(resForm);

      // Basic Validation
      if (!formData.get("name") || !formData.get("Email")) {
        showAlert("Please fill in required fields", "danger");
        return;
      }

      showAlert("Reservation submitted successfully!", "success");
      resForm.reset();
    });
  }
});
