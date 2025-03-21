document.getElementById("stockForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    const medicineName = document.getElementById("medicineName").value;
    const totalPack = document.getElementById("totalPack").value;
    const purchasePrice = document.getElementById("purchasePrice").value;

    const requestData = {
        medicine: medicineName,
        total_pack: totalPack,
        purchase_price: purchasePrice
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/management/stocks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data[0] || "Something went wrong!");
        } else {
            alert("Stock added successfully!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
});