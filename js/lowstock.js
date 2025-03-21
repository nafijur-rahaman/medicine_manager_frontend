document.addEventListener("DOMContentLoaded", async function() {
    const lowStocksTable = document.getElementById("lowStocks");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/management/medicines/");
        const medicines = await response.json();

        if (Array.isArray(medicines)) {
            lowStocksTable.innerHTML = ""; // Clear existing rows

            let count = 1;
            medicines.forEach(medicine => {
                if (medicine.total_pack <= 10) {  // Check if stock is 10 or less
                    const row = `
                        <tr>
                            <td>${count++}</td>
                            <td>${medicine.name}</td>
                            <td>${medicine.category_name || "N/A"}</td>
                            <td>$${medicine.unit_price}</td>
                            <td>${medicine.pack_size || "N/A"}</td>
                            <td>${medicine.total_pack}</td>
                        </tr>
                    `;
                    lowStocksTable.innerHTML += row;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching medicines:", error);
    }
});