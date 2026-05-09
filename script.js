const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXi2i9J59vHfVc0pv_UQNBL3se9JtFNRFBGTtEIsv0B578CmvKmTym2XFGdm0ZU-Rora_jp0oeERBU/pub?output=csv";

function loadDashboard() {

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {

            const data = results.data;

            const dashboard = document.getElementById("dashboard");
            dashboard.innerHTML = "";

            let totalNominations = 0;
            let candidatesSet = new Set();
            let positionsSet = new Set();

            const grouped = {};

            data.forEach(row => {

                const position = row["Which leadership position are you nominating this person for?"] || "Unknown Position";

                const nominee = row["Nominee’s Full Name"] || row["Nominee's Full Name"] || "Unknown Candidate";

                if (!grouped[position]) {
                    grouped[position] = {};
                }

                if (!grouped[position][nominee]) {
                    grouped[position][nominee] = 0;
                }

                grouped[position][nominee]++;

                totalNominations++;
                candidatesSet.add(nominee);
                positionsSet.add(position);
            });

            document.getElementById("totalNominations").textContent = totalNominations;
            document.getElementById("totalCandidates").textContent = candidatesSet.size;
            document.getElementById("totalPositions").textContent = positionsSet.size;

            for (const position in grouped) {

                const block = document.createElement("div");
                block.className = "position-block";

                let html = `
                    <h3>${position}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Nominations</th>
setInterval(loadDashboard, 60000);