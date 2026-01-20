function loadHotspots() {
    fetch("http://192.168.1.20:5000/api/hotspots") // backend device IP
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById("output");
            output.innerHTML = "";

            data.forEach(h => {
                output.innerHTML += `
                    <p>
                        <strong>${h.location}</strong><br>
                        Severity: ${h.severity}<br>
                        Ward: ${h.ward}
                    </p>
                    <hr>
                `;
            });
        })
        .catch(err => {
            alert("Failed to load data");
            console.error(err);
        });
}
