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
        const response = await fetch("https://medicine-management-backend.vercel.app/api/management/stocks/", {
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
            document.getElementById('stockForm').reset();
        }
    } catch (error) {
      
    }
});