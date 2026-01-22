// Generate comprehensive fleet data
const departments = ['Health', 'Education', 'Transportation', 'Environment', 'Justice'];
const makes = ['Ford', 'Chevrolet', 'Dodge', 'Toyota', 'Honda', 'Nissan'];
const models = {
    'Ford': ['F-150', 'Explorer', 'Transit', 'Escape', 'Edge'],
    'Chevrolet': ['Silverado', 'Tahoe', 'Equinox', 'Malibu', 'Traverse'],
    'Dodge': ['Ram 1500', 'Durango', 'Charger', 'Grand Caravan'],
    'Toyota': ['Tacoma', 'RAV4', 'Camry', 'Highlander', 'Tundra'],
    'Honda': ['CR-V', 'Accord', 'Pilot', 'Civic', 'Odyssey'],
    'Nissan': ['Frontier', 'Rogue', 'Altima', 'Pathfinder']
};

let fleetData = [];
let simParams = {
    retireAge: 10,
    maintThreshold: 1200,
    inflationRate: 3
};

// Generate realistic fleet data
function generateInitialData() {
    fleetData = [];
    for (let i = 1; i <= 75; i++) {
        const dept = departments[Math.floor(Math.random() * departments.length)];
        const make = makes[Math.floor(Math.random() * makes.length)];
        const model = models[make][Math.floor(Math.random() * models[make].length)];
        const year = 2012 + Math.floor(Math.random() * 13);
        const age = 2026 - year;
        const odometer = Math.floor(15000 + (age * 18000) + (Math.random() * 40000));

        const baseCost = 300 + Math.floor(Math.random() * 200);
        const ageFactor = Math.pow(1.08, Math.max(0, age - 5));
        const mileageFactor = odometer > 200000 ? 1.5 : odometer > 150000 ? 1.25 : 1.0;
        const monthlyCost = Math.round(baseCost * ageFactor * mileageFactor);

        fleetData.push({
            id: `CVA-${String(i).padStart(3, '0')}`,
            dept,
            make,
            model,
            year,
            age,
            odometer,
            monthlyCost
        });
    }
    recalculateScores();
    fleetData.sort((a, b) => b.replacementScore - a.replacementScore);
    filteredData = [...fleetData];
    console.log("Random sample data generated.");
}

let filteredData = [];

function recalculateScores() {
    fleetData.forEach(vehicle => {
        // Calculate replacement score (0-100)
        const ageScore = Math.min(40, (vehicle.age / simParams.retireAge) * 40);
        const mileageScore = Math.min(30, (vehicle.odometer / 250000) * 30);
        const costScore = Math.min(30, (vehicle.monthlyCost / simParams.maintThreshold) * 30);
        const replacementScore = Math.round(ageScore + mileageScore + costScore);

        vehicle.replacementScore = replacementScore;

        let priority = 'Low';
        if (replacementScore >= 70) priority = 'High';
        else if (replacementScore >= 50) priority = 'Medium';
        vehicle.priority = priority;

        let action = 'Monitor';
        if (replacementScore >= 80) action = 'Replace Immediately';
        else if (replacementScore >= 70) action = 'Replace in 6-12 months';
        else if (replacementScore >= 50) action = 'Plan for replacement';
        vehicle.action = action;
    });
}

generateInitialData();
fleetData.sort((a, b) => b.replacementScore - a.replacementScore);

// Update KPIs
function updateKPIs() {
    const high = filteredData.filter(v => v.priority === 'High').length;
    const medium = filteredData.filter(v => v.priority === 'Medium').length;
    const low = filteredData.filter(v => v.priority === 'Low').length;
    const avgAge = (filteredData.reduce((sum, v) => sum + v.age, 0) / filteredData.length).toFixed(1);
    const replacementCost = high * 45000;

    function updateInsights() {
        const highPriority = filteredData.filter(v => v.priority === 'High');
        const highCount = highPriority.length;
        const totalCount = filteredData.length;
        const percent = totalCount > 0 ? Math.round((highCount / totalCount) * 100) : 0;

        let insightHTML = '';

        if (highCount > 0) {
            const avgAgeHigh = (highPriority.reduce((sum, v) => sum + v.age, 0) / highCount).toFixed(1);
            const costAvoidance = (highCount * 3000).toLocaleString();

            insightHTML = `
                <strong>Critical Finding:</strong> ${percent}% of the fleet (${highCount} vehicles) requires immediate replacement. 
                Priority vehicles average ${avgAgeHigh} years old. 
                Delaying replacements could result in estimated additional maintenance costs of $${costAvoidance} annually.
            `;
        } else {
            insightHTML = `
                <strong>Status:</strong> The current fleet is in good condition. 
                No vehicles currently require immediate replacement based on the selected criteria.
                Continue routine maintenance schedules.
            `;
        }

        document.getElementById('keyInsights').innerHTML = insightHTML;
    }

    document.getElementById('totalVehicles').textContent = filteredData.length;
    document.getElementById('highPriority').textContent = high;
    document.getElementById('mediumPriority').textContent = medium;
    document.getElementById('lowPriority').textContent = low;
    document.getElementById('avgAge').textContent = avgAge;
    document.getElementById('replacementCost').textContent = `$${Math.round(replacementCost / 1000)}K`;

    updateInsights();
}

// Populate table
function populateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    filteredData.forEach(vehicle => {
        const row = document.createElement('tr');

        const scoreClass = vehicle.replacementScore >= 70 ? 'score-high' :
            vehicle.replacementScore >= 50 ? 'score-medium' : 'score-low';

        const priorityClass = vehicle.priority === 'High' ? 'priority-high' :
            vehicle.priority === 'Medium' ? 'priority-medium' : 'priority-low';

        row.innerHTML = `
            <td><strong>${vehicle.id}</strong></td>
            <td>${vehicle.dept}</td>
            <td>${vehicle.make} ${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td>${vehicle.age} yrs</td>
            <td>${vehicle.odometer.toLocaleString()} km</td>
            <td>$${vehicle.monthlyCost}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <strong>${vehicle.replacementScore}</strong>
                    <div class="score-bar" style="width: 60px;">
                        <div class="score-fill ${scoreClass}" style="width: ${vehicle.replacementScore}%"></div>
                    </div>
                </div>
            </td>
            <td><span class="priority-badge ${priorityClass}">${vehicle.priority}</span></td>
            <td style="font-size: 13px; color: #4b5563;">${vehicle.action}</td>
        `;
        tbody.appendChild(row);
    });
}

// Filter functions
function applyFilters() {
    const deptFilter = document.getElementById('deptFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const ageFilter = parseInt(document.getElementById('ageFilter').value) || 0;
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    filteredData = fleetData.filter(v => {
        const deptMatch = deptFilter === 'all' || v.dept === deptFilter;
        const priorityMatch = priorityFilter === 'all' || v.priority === priorityFilter;
        const ageMatch = v.age >= ageFilter;
        const searchMatch = searchTerm === '' ||
            v.id.toLowerCase().includes(searchTerm) ||
            v.make.toLowerCase().includes(searchTerm) ||
            v.model.toLowerCase().includes(searchTerm);

        return deptMatch && priorityMatch && ageMatch && searchMatch;
    });

    updateKPIs();
    populateTable();
    updateCharts();
}

function resetFilters() {
    document.getElementById('deptFilter').value = 'all';
    document.getElementById('priorityFilter').value = 'all';
    document.getElementById('ageFilter').value = '0';
    document.getElementById('searchBox').value = '';
    applyFilters();
}

document.getElementById('deptFilter').addEventListener('change', applyFilters);
document.getElementById('priorityFilter').addEventListener('change', applyFilters);
document.getElementById('ageFilter').addEventListener('input', applyFilters);
document.getElementById('searchBox').addEventListener('input', applyFilters);


// File Upload Handler
document.getElementById('csvUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            if (results.data && results.data.length > 0) {
                const newData = results.data.map(row => {
                    const findKey = (keywords) => Object.keys(row).find(k =>
                        keywords.some(keyword => k.toLowerCase().includes(keyword.toLowerCase()))
                    );

                    const getValue = (keywords, defaultVal) => {
                        const key = findKey(keywords);
                        return key ? row[key] : defaultVal;
                    };

                    let id = getValue(['Vehicle ID', 'Unit #', 'Fleet #', 'flotte'], 'UNK-' + Math.floor(Math.random() * 1000));
                    let make = getValue(['Make', 'Marque'], 'Unknown');
                    let model = getValue(['Model', 'Modèle', 'Modele'], 'Vehicle');
                    let year = getValue(['Year', 'Année', 'Annee'], 2020);
                    let odo = getValue(['Odometer', 'Compteur', 'Kilometers', 'Mileage'], 0);

                    let costRaw = getValue(['Monthly Cost', 'Maint'], null);
                    let purchaseCostRaw = getValue(['Total purchase price', 'Purchase Price', 'Coût', 'Cost'], 0);

                    let monthlyCost = 0;
                    if (costRaw) {
                        monthlyCost = parseCost(costRaw);
                    } else {
                        let purchaseVal = parseCost(purchaseCostRaw);
                        if (purchaseVal > 0) {
                            let age = 2026 - (parseInt(year) || 2020);
                            monthlyCost = Math.round((purchaseVal * 0.005) + (age * 50));
                        } else {
                            monthlyCost = 500;
                        }
                    }

                    let dept = getValue(['Dept', 'Department', 'Ministry'], null);
                    if (!dept) {
                        let city = getValue(['City', 'Ville'], '');
                        if (city) dept = city;
                        else dept = departments[Math.floor(Math.random() * departments.length)];
                    }

                    return {
                        id: String(id),
                        dept: String(dept),
                        make: String(make).split('/')[0].trim(),
                        model: String(model).split('/')[0].trim(),
                        year: parseInt(year) || 2020,
                        age: 2026 - (parseInt(year) || 2020),
                        odometer: parseCost(odo),
                        monthlyCost: monthlyCost
                    };
                }).filter(x => x.id !== 'UNK');

                if (newData.length > 0) {
                    fleetData = newData;
                    recalculateScores();
                    fleetData.sort((a, b) => b.replacementScore - a.replacementScore);
                    resetFilters();

                    updateDeptDropdown();

                    alert(`Successfully imported ${newData.length} vehicles!`);
                }
            }
        }
    });
});

function updateDeptDropdown() {
    const uniqueDepts = [...new Set(fleetData.map(d => d.dept))].sort();
    const select = document.getElementById('deptFilter');
    select.innerHTML = '<option value="all">All Departments</option>';
    uniqueDepts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        select.appendChild(opt);
    });
}

function parseCost(costStr) {
    if (typeof costStr === 'number') return costStr;
    if (!costStr) return 0;
    return parseFloat(costStr.replace(/[^0-9.-]+/g, ""));
}

function updateSimulation() {
    recalculateScores();
    fleetData.sort((a, b) => b.replacementScore - a.replacementScore);
    applyFilters();
}

// Chart configurations
let charts = {};

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    transitions: {
        active: {
            animation: {
                duration: 0
            }
        }
    }
};

function createCharts() {
    const priorityCounts = {
        'High': filteredData.filter(v => v.priority === 'High').length,
        'Medium': filteredData.filter(v => v.priority === 'Medium').length,
        'Low': filteredData.filter(v => v.priority === 'Low').length
    };

    charts.priority = new Chart(document.getElementById('priorityChart'), {
        type: 'doughnut',
        data: {
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            datasets: [{
                data: Object.values(priorityCounts),
                backgroundColor: ['#dc2626', '#f59e0b', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            ...commonOptions,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    charts.scatter = new Chart(document.getElementById('scatterChart'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Vehicles',
                data: filteredData.map(v => ({ x: v.age, y: v.replacementScore })),
                backgroundColor: filteredData.map(v =>
                    v.priority === 'High' ? '#dc2626' :
                        v.priority === 'Medium' ? '#f59e0b' : '#10b981'
                )
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                x: { title: { display: true, text: 'Vehicle Age (years)' } },
                y: { title: { display: true, text: 'Replacement Score' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    const deptCounts = {};
    filteredData.forEach(v => {
        if (!deptCounts[v.dept]) deptCounts[v.dept] = 0;
        deptCounts[v.dept]++;
    });

    charts.dept = new Chart(document.getElementById('deptChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(deptCounts),
            datasets: [{
                label: 'Vehicles per Department',
                data: Object.values(deptCounts),
                backgroundColor: '#1e5128',
                borderRadius: 4
            }]
        },
        options: {
            ...commonOptions,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    const currentYear = 2026;
    const projectionYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4];

    const cumulativeNeeds = projectionYears.map((year, i) => {
        return filteredData.filter(v => (v.age + i) >= simParams.retireAge).length;
    });

    charts.timeline = new Chart(document.getElementById('timelineChart'), {
        type: 'line',
        data: {
            labels: projectionYears,
            datasets: [{
                label: 'Replacements Needed',
                data: cumulativeNeeds,
                borderColor: '#1e5128',
                backgroundColor: 'rgba(30, 81, 40, 0.1)',
                fill: true,
                tension: 0,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#1e5128',
                pointRadius: 5
            }]
        },
        options: {
            ...commonOptions,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    const totalMaint = filteredData.reduce((sum, v) => sum + v.monthlyCost, 0) * 12;
    const estimatedNewMaint = filteredData.length * 300 * 12;
    const replacementCost = filteredData.filter(v => v.priority === 'High').length * 45000;
    const potentialSavings = totalMaint - estimatedNewMaint;

    charts.costBenefit = new Chart(document.getElementById('costBenefitChart'), {
        type: 'bar',
        data: {
            labels: ['Current Maint.', 'New Fleet Maint.', 'Est. Savings', 'Replacement Cost'],
            datasets: [{
                label: 'Cost ($)',
                data: [totalMaint, estimatedNewMaint, potentialSavings, replacementCost],
                backgroundColor: [
                    '#dc2626',
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b'
                ],
                borderRadius: 4
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: function (value) { return '$' + (value / 1000) + 'k'; }
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

function updateCharts() {
    if (charts.priority) charts.priority.destroy();
    if (charts.scatter) charts.scatter.destroy();
    if (charts.dept) charts.dept.destroy();
    if (charts.timeline) charts.timeline.destroy();
    if (charts.costBenefit) charts.costBenefit.destroy();

    createCharts();
}

function exportToCSV() {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "fleet_analysis_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateReport() {
    window.print();
}

function loadSampleDataParams() {
    generateInitialData();
    resetFilters();
    updateDeptDropdown();
    alert('Sample data loaded.');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    updateKPIs();
    populateTable();
    createCharts();
});
