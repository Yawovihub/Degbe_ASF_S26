const MENU_ITEMS = [
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
];
const money = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD" });
money.format(12.5);

function populateTableWithMethods(data) {
    const tableBody = document.getElementById("tableBody");
    data.forEach(element => {

        let row = tableBody.insertRow(-1);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerText = element.id;
        cell2.innerText = element.name;
        cell3.innerText = money.format(element.price);
        cell4.innerText = element.calories;
        cell5.innerText = element.description;
        cell6.innerText = element.category;
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

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tableBody")) {
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
});