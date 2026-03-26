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
        tableBody.innerHTML = "<tr><td colspan='4' class='text-center p-4'>Your cart is empty.</td></tr>";
    } else {
        cart.forEach(item => {
            const lineTotal = item.price * item.quantity;
            subtotalValue += lineTotal;
            let row = tableBody.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${money.format(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${money.format(lineTotal)}</td>
            `;
        });
    }

    const taxValue = subtotalValue * TAX_RATE;
    const finalTotalValue = subtotalValue + taxValue;

    // Safety checks for elements before setting text
    if(document.getElementById("subtotal")) document.getElementById("subtotal").innerText = money.format(subtotalValue);
    if(document.getElementById("tax")) document.getElementById("tax").innerText = money.format(taxValue);
    if(document.getElementById("finalTotal")) document.getElementById("finalTotal").innerText = money.format(finalTotalValue);

    updateCartBadge(cart);
}

function updateCartBadge(cart) {
    const badge = document.getElementById("cart-count");
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
        badge.style.display = totalItems > 0 ? "inline-block" : "none";
    }
}

function clearCart() {
    if (confirm("Are you sure you want to empty your cart?")) {
        localStorage.removeItem("coffeeCart");
        renderCart();
    }
}

function confirmCancel() {
    // 1. Hide the "Are you sure?" modal
    const cancelModalEl = document.getElementById('cancelModal');
    const cancelModal = bootstrap.Modal.getInstance(cancelModalEl);
    if (cancelModal) cancelModal.hide();

    // 2. Logic
    localStorage.removeItem("coffeeCart");
    renderCart();

    // 3. Show Thank You Modal
    showThankYou("Order Cancelled", "Your order has been cancelled and your cart is cleared.");
}

function submitOrder() {
    const cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.removeItem("coffeeCart");
    renderCart();

    showThankYou("Order Confirmed!", "Thank you for your purchase! Your coffee is being prepared.");
}

// Helper to keep code DRY (Don't Repeat Yourself)
function showThankYou(title, message) {
    const modalTitle = document.querySelector('#thankYouModal .modal-title');
    const modalBody = document.querySelector('#thankYouModal .modal-body p');

    if (modalTitle) modalTitle.innerText = title;
    if (modalBody) modalBody.innerText = message;

    const thanksModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
    thanksModal.show();
}

function redirectToMenu() {
    window.location.href = "menu.html";
}