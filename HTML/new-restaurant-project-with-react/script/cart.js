const TAX_RATE = 0.0825;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
  const tableBody = document.getElementById("cartTableBody");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  let subtotalValue = 0;

  if (cart.length === 0) {

    tableBody.innerHTML = "<tr><td colspan='5' class='text-center p-4'>Your cart is empty.</td></tr>";
  } else {
    cart.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      subtotalValue += lineTotal;
      let row = tableBody.insertRow();
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${money.format(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${money.format(lineTotal)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
    });
  }
  const taxValue = subtotalValue * TAX_RATE;
  const finalTotalValue = subtotalValue + taxValue;

  // Setting values with safety checks
  const setElementText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = money.format(val);
  };

  setElementText("subtotal", subtotalValue);
  setElementText("tax", taxValue);
  setElementText("finalTotal", finalTotalValue);

  updateCartBadge(cart);
}

//  remove just ONE item, at the time
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("coffeeCart", JSON.stringify(cart));
  renderCart();
}

function updateCartBadge(cart) {
  const badge = document.getElementById("cart-count");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}
function confirmCancel() {
  //Hide the "Are you sure?" modal
  const cancelModalEl = document.getElementById('cancelModal');
  const cancelModal = bootstrap.Modal.getInstance(cancelModalEl);
  if (cancelModal) {
    cancelModal.hide();
  }

  // Clear the data
  localStorage.removeItem("coffeeCart");
  renderCart(); // This refreshes the table to show it's empty

  // Show the success message using your helper function
  showThankYou("Order Cancelled", "Your order has been cancelled and your cart is cleared.");
}

function showThankYou(title, message) {
  const modalTitle = document.querySelector('#thankYouModal .modal-title');
  const modalBody = document.querySelector('#thankYouModal .modal-body p');

  if (modalTitle) modalTitle.innerText = title;
  if (modalBody) modalBody.innerText = message;

  const thanksModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
  thanksModal.show();
}
function redirectToMenu() {
  localStorage.removeItem("coffeeCart");
  // Redirect to the menu page
  window.location.href = "menu.html";
}
function submitOrder() {
  // Get the current cart from localStorage
  const cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];

  //Check if the cart is empty before submitting
  if (cart.length === 0) {
    showAlert("Your cart is empty! Add some coffee before checking out.", "danger");
    return;
  }
  // Clear the cart data now that the order is "placed"
  localStorage.removeItem("coffeeCart");

  //Refresh the table and totals on the page so they show $0.00
  renderCart();

  //Show the Thank-You Modal with the success message
  showThankYou("Order Submitted!", "Thank you for your purchase! Your order is being prepared and will be ready shortly.");
}
