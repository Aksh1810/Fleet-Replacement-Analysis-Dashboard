# FleetIQ | Fleet Replacement Analysis Dashboard

A modern, interactive web-based dashboard designed to analyze fleet vehicle data and provide actionable value-based recommendations for vehicle replacement.

## 🌐 Live Demo
**[Launch FleetIQ Dashboard](https://fleet-replacement-analysis-dashboar.vercel.app)**

## 🚀 Features

-   **Interactive Dashboard**: Real-time visualization of fleet health, age distribution, and replacement priorities.
-   **Smart CSV Import**: Upload your own fleet datasets. The system intelligently maps billingual or variant headers (e.g., "Make/Marque", "Purchase Cost") to the dashboard's structure.
-   **Dynamic Analysis**:
    -   **KPI Cards**: Instant view of high-priority replacements, average fleet age, and estimated costs.
    -   **Priority Scoring**: Algorithmically calculates a "Replacement Score" (0-100) based on age, mileage, and maintenance costs.
    -   **Charts & Graphs**:
        -   Priority Distribution (Doughnut)
        -   Age vs. Score (Scatter)
        -   Department Analysis (Dynamic Bar)
        -   5-Year Replacement Timeline (Line)
        -   Cost-Benefit Analysis (Horizontal Bar)
-   **Sample Data Standard**: The dashboard automatically loads a realistic 75-vehicle sample dataset on first load. You can always reset to this state with the "Load Sample" button.
-   **Reporting**: Export filtered data to CSV or generate a printable PDF report directly from the browser.

## 🛠 Technologies Used

-   **HTML5 / CSS3**: Custom responsive design with a premium "Green/Professional" theme using Inter typography and glassmorphism effects.
-   **JavaScript (ES6+)**: Core logic for data parsing, scoring algorithms, and DOM manipulation.
-   **Chart.js**: Rendering of interactive and responsive charts.
-   **PapaParse**: Fast and robust CSV parsing library.

## 📂 Project Structure

```
├── index.html              # Main application entry point
├── script.js               # Application logic and interactivity
├── style.css               # Custom styling and theming
├── sample_fleet_data.csv   # Sample dataset for testing
├── fleet_theme.json        # Theme configuration reference
└── README.md               # Project documentation
```

## 🔌 How to Use

1.  **Open the Dashboard**: Visit the live demo link above or open `index.html` locally.
2.  **Explore Default Data**: The dashboard initializes with a random sample of 75 vehicles.
3.  **Import Your Data**:
    -   Click the **"📂 Import CSV"** button.
    -   Select a CSV file containing vehicle data. The dashboard supports standard headers (ID, Make, Model, Year, Odometer) and handles diverse formats.
    -   *Reset Option*: Click **"🔄 Load Sample"** at any time to return to the sample dataset.
4.  **Analyze & Act**:
    -   Use the filters (Department, Priority, Age) to narrow down the view.
    -   Review the "Recommendations" section for specific actions (e.g., "Immediate Action", "Short-Term Planning").
5.  **Export**:
    -   Click **"📊 Export Data"** to download the currently filtered dataset.
    -   Click **"📄 Generate Report"** to print or save as PDF.

## 📊 Data Logic

The dashboard calculates a **Replacement Score** for each vehicle:
-   **Age Score (40%)**: Based on a standard service life (e.g., 10-12 years).
-   **Mileage Score (30%)**: Scaled against high-mileage thresholds (e.g., 250,000 km).
-   **Cost Score (30%)**: Based on monthly maintenance costs relative to thresholds.

**Priority Levels**:
-   **High**: Score ≥ 70
-   **Medium**: Score ≥ 50
-   **Low**: Score < 50
