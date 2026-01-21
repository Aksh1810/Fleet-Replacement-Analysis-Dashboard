import csv
import random
import math

# Configuration
COUNT = 75
DEPARTMENTS = ['Health', 'Education', 'Transportation', 'Environment', 'Justice']
MAKES = ['Ford', 'Chevrolet', 'Dodge', 'Toyota', 'Honda', 'Nissan']
MODELS = {
    'Ford': ['F-150', 'Explorer', 'Transit', 'Escape', 'Edge'],
    'Chevrolet': ['Silverado', 'Tahoe', 'Equinox', 'Malibu', 'Traverse'],
    'Dodge': ['Ram 1500', 'Durango', 'Charger', 'Grand Caravan'],
    'Toyota': ['Tacoma', 'RAV4', 'Camry', 'Highlander', 'Tundra'],
    'Honda': ['CR-V', 'Accord', 'Pilot', 'Civic', 'Odyssey'],
    'Nissan': ['Frontier', 'Rogue', 'Altima', 'Pathfinder']
}

def generate_data():
    data = []
    
    for i in range(1, COUNT + 1):
        dept = random.choice(DEPARTMENTS)
        make = random.choice(MAKES)
        model = random.choice(MODELS[make])
        year = 2012 + math.floor(random.random() * 13) 
        current_year = 2026
        age = current_year - year
        
        # Odometer logic
        odometer = math.floor(15000 + (age * 18000) + (random.random() * 40000))
        
        # Costs
        base_cost = 300 + math.floor(random.random() * 200)
        age_factor = pow(1.08, max(0, age - 5))
        mileage_factor = 1.5 if odometer > 200000 else (1.25 if odometer > 150000 else 1.0)
        monthly_cost = round(base_cost * age_factor * mileage_factor)
        
        # Replacement Score (0-100)
        age_score = min(40, (age / 12) * 40)
        mileage_score = min(30, (odometer / 250000) * 30)
        cost_score = min(30, ((monthly_cost - 300) / 700) * 30)
        
        replacement_score = round(age_score + mileage_score + cost_score)
        
        # Priority
        if replacement_score >= 70:
            priority = 'High'
        elif replacement_score >= 50:
            priority = 'Medium'
        else:
            priority = 'Low'
            
        # Action
        if replacement_score >= 80:
            action = 'Replace Immediately'
        elif replacement_score >= 70:
            action = 'Replace in 6-12 months'
        elif replacement_score >= 50:
            action = 'Plan for replacement'
        else:
            action = 'Monitor'
            
        vehicle_id = f"CVA-{str(i).zfill(3)}"
        
        data.append({
            'Vehicle ID': vehicle_id,
            'Department': dept,
            'Make': make,
            'Model': model,
            'Year': year,
            'Age': age,
            'Odometer': odometer,
            'Monthly Cost': monthly_cost,
            'Replacement Score': replacement_score,
            'Priority': priority,
            'Recommended Action': action
        })
        
    return data

def save_csv(data, filename="fleet_data.csv"):
    if not data:
        return
        
    keys = data[0].keys()
    
    with open(filename, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(data)
    
    print(f"Successfully generated {filename} with {len(data)} records.")

if __name__ == "__main__":
    fleet_data = generate_data()
    save_csv(fleet_data)
