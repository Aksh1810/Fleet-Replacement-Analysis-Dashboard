# 📊 Power BI Setup Guide (Mac / Web Version)

Since you are on a Mac, you will use the **Power BI Service** (Web Browser) instead of the Desktop app.

## 1. Import Your Data
The easiest way to get data into the Web version without a Windows PC is to copy-paste it.

1.  **Open the CSV**:
    -   Locate `fleet_data.csv` in this project folder.
    -   Open it with **TextEdit** or **Numbers**.
    -   **Select All** (Cmd+A) and **Copy** (Cmd+C).

2.  **Go to Power BI Web**:
    -   Navigate to [app.powerbi.com](https://app.powerbi.com).
    -   Click **Create** (the Plus `+` icon on the left sidebar).
    -   Select **"Paste or manually enter data"** (or "Enter data").

3.  **Paste Data**:
    -   Click the first cell in the popup window.
    -   **Paste** (Cmd+V). Your vehicle data should appear in the grid.
    -   **Important**: Ensure "Use first row as headers" is automatically detected (the top row should show "Vehicle ID", "Department", etc., not Column1).
    -   Name the table **"FleetData"** (bottom left corner).
    -   Click **Auto-create report** (for a quick start) or **Create a blank report** (to build it yourself).

## 2. Recreating the Visuals
If you chose "Create a blank report", use the **Visualizations** pane on the right.

### 🎨 Styling (Web Limitation)
*Note: The Web version does not support importing the `fleet_theme.json` file. You will need to manually set Data Colors to Green (`#1e5128`) in the visual formatting options.*

### Recommended Charts

#### 1. Priority Breakdown (Donut Chart)
- **Visual**: Donut Chart
- **Legend**: `Priority`
- **Values**: Count of `Vehicle ID`
- **Format**: Set "High" to Red, "Medium" to Orange, "Low" to Green.

#### 2. Average Fleet Age (Card)
- **Visual**: Card (Exclamation mark icon 123)
- **Fields**: `Age`
- **Aggregation**: Click the dropdown on the field and select **Average**.

#### 3. Replacement Score Analysis (Scatter Plot)
- **Visual**: Scatter Chart
- **X Axis**: `Age`
- **Y Axis**: `Replacement Score`
- **Legend**: `Department` or `Priority`

#### 4. Detailed List (Table)
- **Visual**: Table
- **Columns**: Select `Vehicle ID`, `Make`, `Model`, `Age`, `Odometer`, `Priority`, `Recommended Action`.

## 3. Save
-   Click **File** > **Save**.
-   Name your report "Fleet Analysis Dashboard".
