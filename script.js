// Global Variables
let currentSubject = '';
let currentLesson = 0;
let userProgress = {
    business: 0,
    math: 0,
    science: 0,
    english: 0,
    hindi: 0
};
let studyTime = 0;
let achievements = 0;
let totalLessons = 0;

// API Configuration
const GEMINI_API_KEY = 'AIzaSyC0papZa44uagYYxtGEZHy56mPqxCEBzLI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';

// Subject Data
const subjectData = {
    business: {
        title: 'Business Studies',
        lessons: [
            {
                title: 'Cost-Effective Farming',
                content: `
                    <h2>Smart Farming for Maximum Profit</h2>
                    <p>Learn how to reduce costs while increasing your crop yield and profits.</p>
                    
                    <div class="business-tip">
                        <h3>Key Principles:</h3>
                        <ul>
                            <li><strong>Plan Before You Plant:</strong> Calculate all costs before starting</li>
                            <li><strong>Quality Seeds:</strong> Invest in good seeds for better yield</li>
                            <li><strong>Water Management:</strong> Use drip irrigation to save water</li>
                            <li><strong>Organic Methods:</strong> Reduce chemical costs with natural fertilizers</li>
                        </ul>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Cost Calculation Example:</h3>
                        <p><strong>For 1 Acre Wheat Farming:</strong></p>
                        <p>Seeds: ₹2,000 | Fertilizer: ₹3,000 | Labor: ₹5,000 | Water: ₹1,000</p>
                        <p><strong>Total Cost: ₹11,000</strong></p>
                        <p><strong>Expected Yield: 20 quintals × ₹2,000 = ₹40,000</strong></p>
                        <p><strong>Profit: ₹40,000 - ₹11,000 = ₹29,000</strong></p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Action Plan:</h3>
                        <p>1. Make a budget before starting any crop<br>
                        2. Compare prices of seeds and fertilizers<br>
                        3. Keep records of all expenses<br>
                        4. Calculate profit after each harvest</p>
                    </div>
                `
            },
            {
                title: 'Fertilizers & Soil Management',
                content: `
                    <h2>Right Fertilizer for Right Soil</h2>
                    <p>Understanding your soil and choosing the correct fertilizer is key to good harvest.</p>
                    
                    <div class="lesson-example">
                        <h3>Soil Types and Best Crops:</h3>
                        <div class="math-problem">
                            🟤 <strong>Clay Soil:</strong> Best for Rice, Wheat<br>
                            🟫 <strong>Sandy Soil:</strong> Best for Groundnut, Watermelon<br>
                            ⚫ <strong>Black Soil:</strong> Best for Cotton, Sugarcane<br>
                            🟨 <strong>Red Soil:</strong> Best for Millets, Pulses
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Fertilizer Guide:</h3>
                        <p><strong>NPK (Nitrogen-Phosphorus-Potassium) Ratio:</strong></p>
                        <ul>
                            <li><strong>For Leafy Vegetables:</strong> High Nitrogen (20-10-10)</li>
                            <li><strong>For Fruits:</strong> Balanced NPK (10-10-10)</li>
                            <li><strong>For Root Crops:</strong> High Phosphorus (5-20-10)</li>
                            <li><strong>For Flowering:</strong> High Potassium (10-10-20)</li>
                        </ul>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Organic vs Chemical Fertilizer Cost:</h3>
                        <p><strong>Chemical Fertilizer:</strong> ₹800 per bag (50kg)</p>
                        <p><strong>Organic Compost:</strong> ₹300 per bag (50kg)</p>
                        <p><strong>Savings:</strong> ₹500 per bag + Better soil health</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Soil Testing Tips:</h3>
                        <p>• Test soil pH every 6 months<br>
                        • Add lime if soil is too acidic<br>
                        • Use organic matter to improve soil structure<br>
                        • Rotate crops to maintain soil fertility</p>
                    </div>
                `
            },
            {
                title: 'Crop Storage & Marketing',
                content: `
                    <h2>Store Smart, Sell Smart</h2>
                    <p>Proper storage and timing of sales can increase your profits by 30-50%.</p>
                    
                    <div class="business-tip">
                        <h3>Storage Methods:</h3>
                        <ul>
                            <li><strong>Gunny Bags:</strong> For grains like wheat, rice (up to 6 months)</li>
                            <li><strong>Metal Bins:</strong> For long-term storage (up to 2 years)</li>
                            <li><strong>Cold Storage:</strong> For vegetables and fruits</li>
                            <li><strong>Hermetic Bags:</strong> For pulses and oilseeds</li>
                        </ul>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Storage Tips to Prevent Loss:</h3>
                        <div class="math-problem">
                            🌾 Dry grains to 12-14% moisture<br>
                            🐭 Use neem leaves to prevent pests<br>
                            🌡️ Store in cool, dry place<br>
                            📦 Check stored grains every month
                        </div>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Price Timing Strategy:</h3>
                        <p><strong>Harvest Time Price:</strong> ₹1,800 per quintal</p>
                        <p><strong>Off-Season Price:</strong> ₹2,500 per quintal</p>
                        <p><strong>Storage Cost:</strong> ₹50 per quintal per month</p>
                        <p><strong>Profit by waiting 4 months:</strong> ₹700 - ₹200 = ₹500 extra per quintal</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Where to Sell:</h3>
                        <p>1. <strong>Mandi (Market Yard):</strong> Traditional but competitive prices<br>
                        2. <strong>Direct to Retailers:</strong> Better prices, build relationships<br>
                        3. <strong>Online Platforms:</strong> e-NAM, FarmEasy for better reach<br>
                        4. <strong>Food Processing Units:</strong> Contract farming opportunities</p>
                    </div>
                `
            },
            {
                title: 'Seasonal Planning & Crop Calendar',
                content: `
                    <h2>Right Crop at Right Time</h2>
                    <p>Planning your crops according to seasons ensures maximum yield and profit.</p>
                    
                    <div class="lesson-example">
                        <h3>Three Season Farming in India:</h3>
                        <div class="math-problem">
                            🌱 <strong>Kharif (June-October):</strong> Rice, Cotton, Sugarcane<br>
                            🌾 <strong>Rabi (November-April):</strong> Wheat, Barley, Mustard<br>
                            ☀️ <strong>Zaid (April-June):</strong> Watermelon, Fodder, Vegetables
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Crop Selection Strategy:</h3>
                        <ul>
                            <li><strong>Market Demand:</strong> Check what sells well in your area</li>
                            <li><strong>Water Availability:</strong> Choose crops based on water supply</li>
                            <li><strong>Soil Suitability:</strong> Match crops to your soil type</li>
                            <li><strong>Climate:</strong> Consider temperature and rainfall patterns</li>
                        </ul>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Seasonal Profit Comparison (Per Acre):</h3>
                        <p><strong>Kharif Season:</strong></p>
                        <p>Rice: ₹25,000 profit | Cotton: ₹35,000 profit</p>
                        <p><strong>Rabi Season:</strong></p>
                        <p>Wheat: ₹30,000 profit | Mustard: ₹28,000 profit</p>
                        <p><strong>Zaid Season:</strong></p>
                        <p>Watermelon: ₹40,000 profit | Vegetables: ₹50,000 profit</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Planning Calendar:</h3>
                        <p><strong>January:</strong> Plan for Zaid crops, prepare land<br>
                        <strong>March:</strong> Sow Zaid crops, harvest Rabi<br>
                        <strong>May:</strong> Prepare for Kharif, arrange seeds<br>
                        <strong>June:</strong> Sow Kharif crops with first rains<br>
                        <strong>October:</strong> Harvest Kharif, prepare for Rabi<br>
                        <strong>November:</strong> Sow Rabi crops</p>
                    </div>
                `
            }
        ]
    },
    math: {
        title: 'Mathematics',
        lessons: [
            {
                title: 'Fractions in Daily Life',
                content: `
                    <h2>Understanding Fractions</h2>
                    <p>Fractions help us understand parts of a whole. They are very useful in farming and business.</p>
                    
                    <div class="lesson-example">
                        <h3>What is a Fraction?</h3>
                        <div class="math-problem">
                            1/2 = Half of something<br>
                            1/4 = One quarter (one part out of four)<br>
                            3/4 = Three quarters (three parts out of four)<br>
                            2/3 = Two parts out of three
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Fractions in Farming:</h3>
                        <div class="math-problem">
                            🌾 If you have 1 acre land:<br>
                            1/2 acre = 0.5 acre for wheat<br>
                            1/4 acre = 0.25 acre for vegetables<br>
                            1/4 acre = 0.25 acre for rest
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice Problems:</h3>
                        <p>1. If you buy 1 kg sugar and use 1/4 kg, how much is left?<br>
                        <strong>Answer:</strong> 1 - 1/4 = 3/4 kg left</p>
                        <p>2. If 2/3 of your crop is ready for harvest and you have 30 quintals total, how much is ready?<br>
                        <strong>Answer:</strong> 2/3 × 30 = 20 quintals ready</p>
                    </div>
                `
            },
            {
                title: 'Percentage & Profit-Loss',
                content: `
                    <h2>Calculating Profit and Loss</h2>
                    <p>Understanding percentages helps you calculate profits, losses, and discounts in farming business.</p>
                    
                    <div class="lesson-example">
                        <h3>What is Percentage?</h3>
                        <div class="math-problem">
                            Percentage means "out of 100"<br>
                            50% = 50 out of 100 = 1/2<br>
                            25% = 25 out of 100 = 1/4<br>
                            75% = 75 out of 100 = 3/4
                        </div>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Profit-Loss Calculation:</h3>
                        <p><strong>Cost Price (CP):</strong> What you spend to grow crops</p>
                        <p><strong>Selling Price (SP):</strong> What you get by selling crops</p>
                        <p><strong>Profit = SP - CP</strong></p>
                        <p><strong>Loss = CP - SP</strong></p>
                        <p><strong>Profit % = (Profit ÷ CP) × 100</strong></p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Example:</h3>
                        <p>You spend ₹10,000 on wheat farming and sell for ₹15,000</p>
                        <p><strong>Profit = ₹15,000 - ₹10,000 = ₹5,000</strong></p>
                        <p><strong>Profit % = (₹5,000 ÷ ₹10,000) × 100 = 50%</strong></p>
                        <p>This means you made 50% profit!</p>
                    </div>
                `
            },
            {
                title: 'Area & Perimeter for Farming',
                content: `
                    <h2>Measuring Land and Fields</h2>
                    <p>Knowing how to calculate area and perimeter helps in planning crops and fencing.</p>
                    
                    <div class="lesson-example">
                        <h3>Basic Shapes:</h3>
                        <div class="math-problem">
                            <strong>Rectangle:</strong><br>
                            Area = Length × Width<br>
                            Perimeter = 2 × (Length + Width)<br><br>
                            <strong>Square:</strong><br>
                            Area = Side × Side<br>
                            Perimeter = 4 × Side
                        </div>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Farming Example:</h3>
                        <p><strong>Your field is 100 meters long and 50 meters wide</strong></p>
                        <p><strong>Area = 100 × 50 = 5,000 square meters</strong></p>
                        <p><strong>= 5,000 ÷ 4,047 = 1.24 acres (approximately)</strong></p>
                        <p><strong>Perimeter = 2 × (100 + 50) = 300 meters</strong></p>
                        <p>You need 300 meters of fencing wire</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice:</h3>
                        <p>1. If you want to fence a square field of 80 meters each side, how much wire do you need?<br>
                        <strong>Answer:</strong> 4 × 80 = 320 meters</p>
                        <p>2. How many bags of seeds do you need for a rectangular field 60m × 40m if 1 bag covers 500 sq.m?<br>
                        <strong>Answer:</strong> Area = 2,400 sq.m ÷ 500 = 4.8 ≈ 5 bags</p>
                    </div>
                `
            },
            {
                title: 'Data Handling & Records',
                content: `
                    <h2>Keeping Farm Records</h2>
                    <p>Good record keeping helps you track expenses, income, and make better farming decisions.</p>
                    
                    <div class="lesson-example">
                        <h3>Types of Data to Record:</h3>
                        <div class="math-problem">
                            📊 Daily expenses<br>
                            📈 Crop yield per season<br>
                            💰 Income from sales<br>
                            🌧️ Rainfall and weather data<br>
                            🌱 Seed and fertilizer usage
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Simple Record Format:</h3>
                        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                            <tr style="background: #f3f4f6;">
                                <th style="border: 1px solid #ddd; padding: 8px;">Date</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Expense</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Income</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">01/01/2025</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">Seeds</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">₹2,000</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">-</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">15/04/2025</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">Wheat Sale</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">-</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">₹25,000</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Benefits of Good Records:</h3>
                        <p>• Know which crops give more profit<br>
                        • Plan better for next season<br>
                        • Get loans easily from banks<br>
                        • File income tax returns<br>
                        • Track improvement over years</p>
                    </div>
                `
            }
        ]
    },
    science: {
        title: 'Science',
        lessons: [
            {
                title: 'Plant Biology & Growth',
                content: `
                    <h2>How Plants Grow and Develop</h2>
                    <p>Understanding plant biology helps you grow better crops and increase yield.</p>
                    
                    <div class="lesson-example">
                        <h3>Parts of a Plant and Their Functions:</h3>
                        <div class="math-problem">
                            🌱 <strong>Roots:</strong> Absorb water and nutrients from soil<br>
                            🌿 <strong>Stem:</strong> Transports water and nutrients, supports plant<br>
                            🍃 <strong>Leaves:</strong> Make food through photosynthesis<br>
                            🌸 <strong>Flowers:</strong> Reproduce and form fruits<br>
                            🍎 <strong>Fruits:</strong> Protect seeds and help in dispersal
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Photosynthesis - How Plants Make Food:</h3>
                        <div class="business-tip">
                            <p><strong>Sunlight + Water + Carbon Dioxide = Food + Oxygen</strong></p>
                            <p>This process happens in leaves. That's why plants need:</p>
                            <ul>
                                <li>Plenty of sunlight (6-8 hours daily)</li>
                                <li>Adequate water supply</li>
                                <li>Fresh air circulation</li>
                                <li>Healthy green leaves</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Plant Growth Factors:</h3>
                        <p><strong>Light:</strong> More light = better growth (but not too much heat)<br>
                        <strong>Water:</strong> Regular watering, but avoid waterlogging<br>
                        <strong>Temperature:</strong> Each crop has ideal temperature range<br>
                        <strong>Nutrients:</strong> NPK and micronutrients from soil<br>
                        <strong>Space:</strong> Proper spacing for root and leaf development</p>
                    </div>
                `
            },
            {
                title: 'Soil Science & Nutrients',
                content: `
                    <h2>Understanding Soil and Plant Nutrition</h2>
                    <p>Healthy soil is the foundation of successful farming. Learn what plants need to grow well.</p>
                    
                    <div class="lesson-example">
                        <h3>Essential Plant Nutrients:</h3>
                        <div class="math-problem">
                            <strong>Primary Nutrients (NPK):</strong><br>
                            🟢 <strong>Nitrogen (N):</strong> For green leaves and growth<br>
                            🟡 <strong>Phosphorus (P):</strong> For roots and flowers<br>
                            🔴 <strong>Potassium (K):</strong> For disease resistance and fruit quality
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Secondary Nutrients:</h3>
                        <ul>
                            <li><strong>Calcium:</strong> Strengthens cell walls</li>
                            <li><strong>Magnesium:</strong> Essential for chlorophyll</li>
                            <li><strong>Sulfur:</strong> Helps in protein formation</li>
                        </ul>
                        <h3>Micronutrients:</h3>
                        <p>Iron, Zinc, Boron, Manganese - needed in small amounts but very important</p>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Signs of Nutrient Deficiency:</h3>
                        <div class="cost-calculation">
                            <p><strong>Nitrogen Deficiency:</strong> Yellow leaves, slow growth</p>
                            <p><strong>Phosphorus Deficiency:</strong> Purple leaves, poor flowering</p>
                            <p><strong>Potassium Deficiency:</strong> Brown leaf edges, weak stems</p>
                            <p><strong>Iron Deficiency:</strong> Yellow leaves with green veins</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Soil Health Improvement:</h3>
                        <p>• Add organic matter (compost, farmyard manure)<br>
                        • Practice crop rotation<br>
                        • Use cover crops in off-season<br>
                        • Avoid over-tilling<br>
                        • Test soil pH regularly (ideal: 6.0-7.5)</p>
                    </div>
                `
            },
            {
                title: 'Weather & Climate Effects',
                content: `
                    <h2>How Weather Affects Your Crops</h2>
                    <p>Understanding weather patterns helps you plan better and protect your crops.</p>
                    
                    <div class="lesson-example">
                        <h3>Weather Elements Important for Farming:</h3>
                        <div class="math-problem">
                            🌡️ <strong>Temperature:</strong> Affects growth rate and flowering<br>
                            🌧️ <strong>Rainfall:</strong> Provides water for plants<br>
                            💨 <strong>Wind:</strong> Can help or harm crops<br>
                            ☀️ <strong>Sunlight:</strong> Essential for photosynthesis<br>
                            💧 <strong>Humidity:</strong> Affects disease development
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Seasonal Weather Patterns:</h3>
                        <p><strong>Monsoon (June-September):</strong></p>
                        <ul>
                            <li>Heavy rainfall - good for Kharif crops</li>
                            <li>High humidity - watch for fungal diseases</li>
                            <li>Moderate temperature - ideal for rice, cotton</li>
                        </ul>
                        <p><strong>Winter (October-February):</strong></p>
                        <ul>
                            <li>Cool, dry weather - perfect for Rabi crops</li>
                            <li>Clear skies - good sunlight for wheat</li>
                            <li>Low humidity - less disease problems</li>
                        </ul>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Weather-Related Crop Protection:</h3>
                        <p><strong>Too Much Rain:</strong> Improve drainage, use raised beds</p>
                        <p><strong>Drought:</strong> Mulching, drip irrigation, drought-resistant varieties</p>
                        <p><strong>Strong Winds:</strong> Windbreaks, support stakes for tall crops</p>
                        <p><strong>Hail:</strong> Protective nets, crop insurance</p>
                        <p><strong>Frost:</strong> Cover crops, smoke, choose frost-resistant varieties</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Weather Monitoring Tips:</h3>
                        <p>• Check weather forecast daily<br>
                        • Use weather apps for farmers<br>
                        • Keep rain gauge to measure rainfall<br>
                        • Note temperature patterns<br>
                        • Plan irrigation based on weather predictions</p>
                    </div>
                `
            },
            {
                title: 'Food Science & Nutrition',
                content: `
                    <h2>Nutritional Value of Crops</h2>
                    <p>Understanding nutrition helps you grow healthier crops and maintain good health.</p>
                    
                    <div class="lesson-example">
                        <h3>Major Food Groups:</h3>
                        <div class="math-problem">
                            🌾 <strong>Carbohydrates:</strong> Rice, wheat, corn - provide energy<br>
                            🥜 <strong>Proteins:</strong> Pulses, nuts - build and repair body<br>
                            🥑 <strong>Fats:</strong> Oils, nuts - store energy<br>
                            🥬 <strong>Vitamins:</strong> Fruits, vegetables - keep body healthy<br>
                            🥛 <strong>Minerals:</strong> Leafy greens, dairy - strengthen bones
                        </div>
                    </div>
                    
                    <div class="business-tip">
                        <h3>Nutritious Crops to Grow:</h3>
                        <p><strong>High Protein:</strong> Lentils, chickpeas, soybeans</p>
                        <p><strong>Rich in Vitamins:</strong> Spinach, carrots, tomatoes</p>
                        <p><strong>Good Minerals:</strong> Millets, green leafy vegetables</p>
                        <p><strong>Healthy Fats:</strong> Groundnuts, sunflower, mustard</p>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Food Preservation Methods:</h3>
                        <div class="cost-calculation">
                            <p><strong>Drying:</strong> Sun-dry grains, vegetables (removes moisture)</p>
                            <p><strong>Storage:</strong> Proper containers prevent pest damage</p>
                            <p><strong>Processing:</strong> Make value-added products</p>
                            <p><strong>Refrigeration:</strong> Keep fruits and vegetables fresh longer</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Healthy Eating for Farmers:</h3>
                        <p>• Eat variety of crops you grow<br>
                        • Include proteins (dal, eggs) daily<br>
                        • Drink plenty of water, especially during work<br>
                        • Eat fresh fruits and vegetables<br>
                        • Avoid too much processed food</p>
                    </div>
                `
            }
        ]
    },
    english: {
        title: 'English',
        lessons: [
            {
                title: 'Grammar Basics',
                content: `
                    <h2>Understanding English Grammar</h2>
                    <p>Good grammar helps you communicate clearly in business and daily life.</p>
                    
                    <div class="lesson-example">
                        <h3>Parts of Speech:</h3>
                        <div class="math-problem">
                            <strong>Noun:</strong> Names of people, places, things (farmer, field, tractor)<br>
                            <strong>Verb:</strong> Action words (plant, harvest, sell)<br>
                            <strong>Adjective:</strong> Describing words (good, fresh, organic)<br>
                            <strong>Pronoun:</strong> Replace nouns (I, you, he, she, it, they)
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Sentence Structure:</h3>
                        <div class="business-tip">
                            <p><strong>Simple Sentence:</strong> Subject + Verb + Object</p>
                            <p>Example: "The farmer grows rice."</p>
                            <p><strong>Subject:</strong> The farmer (who)</p>
                            <p><strong>Verb:</strong> grows (what action)</p>
                            <p><strong>Object:</strong> rice (what)</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice Sentences:</h3>
                        <p>1. I sell vegetables in the market.<br>
                        2. The crops need water every day.<br>
                        3. We harvest wheat in April.<br>
                        4. She buys seeds from the shop.<br>
                        5. They use organic fertilizers.</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Common Mistakes to Avoid:</h3>
                        <p><strong>Wrong:</strong> "I am go to market"<br>
                        <strong>Right:</strong> "I am going to market" or "I go to market"</p>
                        <p><strong>Wrong:</strong> "He have many cows"<br>
                        <strong>Right:</strong> "He has many cows"</p>
                    </div>
                `
            },
            {
                title: 'Business Communication',
                content: `
                    <h2>English for Farming Business</h2>
                    <p>Learn useful English phrases for buying, selling, and business communication.</p>
                    
                    <div class="lesson-example">
                        <h3>At the Market - Buying:</h3>
                        <div class="math-problem">
                            "What is the price of seeds?"<br>
                            "How much does this fertilizer cost?"<br>
                            "Can you give me a discount?"<br>
                            "Is this the best quality?"<br>
                            "I need 50 kg of this."
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>At the Market - Selling:</h3>
                        <div class="business-tip">
                            <p>"Fresh vegetables for sale!"</p>
                            <p>"This is organic produce."</p>
                            <p>"The price is ₹50 per kg."</p>
                            <p>"These are grown without chemicals."</p>
                            <p>"Would you like to buy some?"</p>
                        </div>
                    </div>
                    
                    <div class="cost-calculation">
                        <h3>Negotiation Phrases:</h3>
                        <p><strong>Polite Requests:</strong></p>
                        <p>"Could you please reduce the price?"</p>
                        <p>"Would it be possible to get a better rate?"</p>
                        <p>"Can we discuss the price?"</p>
                        <p><strong>Agreeing:</strong> "That sounds fair." "I agree."</p>
                        <p><strong>Disagreeing:</strong> "That's too expensive." "I cannot afford that."</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Phone Conversations:</h3>
                        <p><strong>Answering:</strong> "Hello, this is [your name] speaking."<br>
                        <strong>Asking for someone:</strong> "May I speak to Mr. Sharma?"<br>
                        <strong>Taking messages:</strong> "Can I take a message?"<br>
                        <strong>Ending:</strong> "Thank you for calling. Goodbye."</p>
                    </div>
                `
            },
            {
                title: 'Reading Comprehension',
                content: `
                    <h2>Understanding What You Read</h2>
                    <p>Good reading skills help you understand farming guides, government schemes, and market information.</p>
                    
                    <div class="lesson-example">
                        <h3>Reading Strategy:</h3>
                        <div class="business-tip">
                            <p><strong>1. Preview:</strong> Look at headings and pictures first</p>
                            <p><strong>2. Read slowly:</strong> Don't rush, understand each sentence</p>
                            <p><strong>3. Ask questions:</strong> What is the main idea?</p>
                            <p><strong>4. Summarize:</strong> What did you learn?</p>
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Sample Text - Weather Report:</h3>
                        <div class="math-problem">
                            "The weather department predicts heavy rainfall in the next three days. Farmers are advised to postpone harvesting activities. The temperature will remain between 25-30°C. Humidity levels will be high, which may increase the risk of fungal diseases in crops."
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Comprehension Questions:</h3>
                        <p>1. What does the weather department predict?<br>
                        <strong>Answer:</strong> Heavy rainfall in the next three days</p>
                        <p>2. What advice is given to farmers?<br>
                        <strong>Answer:</strong> To postpone harvesting activities</p>
                        <p>3. What is the temperature range?<br>
                        <strong>Answer:</strong> Between 25-30°C</p>
                        <p>4. What risk is mentioned?<br>
                        <strong>Answer:</strong> Risk of fungal diseases due to high humidity</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Useful Reading Materials:</h3>
                        <p>• Government agriculture websites<br>
                        • Farming magazines and newspapers<br>
                        • Seed packet instructions<br>
                        • Fertilizer usage guides<br>
                        • Market price reports</p>
                    </div>
                `
            },
            {
                title: 'Writing Skills',
                content: `
                    <h2>Writing for Farming Business</h2>
                    <p>Learn to write letters, applications, and keep records in English.</p>
                    
                    <div class="lesson-example">
                        <h3>Letter Writing Format:</h3>
                        <div class="business-tip">
                            <p><strong>1. Date:</strong> Write the date at the top</p>
                            <p><strong>2. Address:</strong> To whom you are writing</p>
                            <p><strong>3. Greeting:</strong> "Dear Sir/Madam" or "Dear Mr. Sharma"</p>
                            <p><strong>4. Body:</strong> Main message</p>
                            <p><strong>5. Closing:</strong> "Yours sincerely" + your name</p>
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Sample Application Letter:</h3>
                        <div class="cost-calculation">
                            <p>Date: January 15, 2025</p>
                            <p>To: The Bank Manager<br>
                            State Bank of India</p>
                            <p>Dear Sir,</p>
                            <p>I am a farmer from village Rampur. I want to apply for a crop loan of ₹50,000 for wheat farming. I have 2 acres of land and good irrigation facilities. Please consider my application.</p>
                            <p>Yours sincerely,<br>
                            Ram Singh</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Record Keeping in English:</h3>
                        <p><strong>Daily Farm Diary:</strong></p>
                        <p>"Today I planted tomato seeds in the nursery. Used 100 grams of seeds. Weather was sunny and warm. Watered the field in the evening."</p>
                        <p><strong>Expense Record:</strong></p>
                        <p>"Bought fertilizer - ₹2,000. Paid labor charges - ₹1,500. Total expense today - ₹3,500."</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Common Writing Mistakes:</h3>
                        <p><strong>Wrong:</strong> "I am write a letter"<br>
                        <strong>Right:</strong> "I am writing a letter"</p>
                        <p><strong>Wrong:</strong> "Please give me informations"<br>
                        <strong>Right:</strong> "Please give me information"</p>
                    </div>
                `
            }
        ]
    },
    hindi: {
        title: 'हिंदी (Hindi)',
        lessons: [
            {
                title: 'व्याकरण की मूल बातें (Grammar Basics)',
                content: `
                    <h2>हिंदी व्याकरण की जानकारी</h2>
                    <p>अच्छी हिंदी व्याकरण से आप बेहतर तरीके से बात कर सकते हैं और लिख सकते हैं।</p>
                    
                    <div class="lesson-example">
                        <h3>शब्द के प्रकार (Types of Words):</h3>
                        <div class="hindi-text">
                            <strong>संज्ञा (Noun):</strong> व्यक्ति, स्थान, वस्तु के नाम (किसान, खेत, ट्रैक्टर)<br>
                            <strong>सर्वनाम (Pronoun):</strong> मैं, तुम, वह, हम, आप<br>
                            <strong>क्रिया (Verb):</strong> काम के शब्द (बोना, काटना, बेचना)<br>
                            <strong>विशेषण (Adjective):</strong> गुण बताने वाले शब्द (अच्छा, ताजा, जैविक)
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>वाक्य की संरचना (Sentence Structure):</h3>
                        <div class="business-tip">
                            <p><strong>सरल वाक्य:</strong> कर्ता + कर्म + क्रिया</p>
                            <p>उदाहरण: "किसान धान उगाता है।"</p>
                            <p><strong>कर्ता:</strong> किसान (कौन)</p>
                            <p><strong>कर्म:</strong> धान (क्या)</p>
                            <p><strong>क्रिया:</strong> उगाता है (क्या करता है)</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अभ्यास वाक्य:</h3>
                        <p>1. मैं बाजार में सब्जी बेचता हूं।<br>
                        2. फसल को रोज पानी की जरूरत होती है।<br>
                        3. हम अप्रैल में गेहूं काटते हैं।<br>
                        4. वह दुकान से बीज खरीदती है।<br>
                        5. वे जैविक खाद का उपयोग करते हैं।</p>
                    </div>
                `
            },
            {
                title: 'गद्य और पद्य (Prose & Poetry)',
                content: `
                    <h2>हिंदी साहित्य की समझ</h2>
                    <p>गद्य और पद्य पढ़ने से भाषा की समझ बेहतर होती है।</p>
                    
                    <div class="lesson-example">
                        <h3>गद्य (Prose) - किसान की कहानी:</h3>
                        <div class="hindi-text">
                            "राम एक मेहनती किसान था। वह रोज सुबह जल्दी उठकर अपने खेत में जाता था। उसके पास दो एकड़ जमीन थी। वह गेहूं, धान और सब्जियां उगाता था। मेहनत के कारण उसकी फसल हमेशा अच्छी होती थी। वह अपनी फसल बाजार में बेचकर अच्छा मुनाफा कमाता था।"
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>पद्य (Poetry) - खेती का गीत:</h3>
                        <div class="hindi-text">
                            "हरे-भरे खेत में लहराती फसल,<br>
                            किसान का मन होता है खुश।<br>
                            सुबह से शाम तक मेहनत करे,<br>
                            अन्न उगाकर देश को खिलाए।"
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>समझने के प्रश्न:</h3>
                        <p>1. राम क्या काम करता था?<br>
                        <strong>उत्तर:</strong> वह किसान था और खेती करता था।</p>
                        <p>2. उसके पास कितनी जमीन थी?<br>
                        <strong>उत्तर:</strong> दो एकड़ जमीन थी।</p>
                        <p>3. वह कौन सी फसलें उगाता था?<br>
                        <strong>उत्तर:</strong> गेहूं, धान और सब्जियां।</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>नैतिक शिक्षा:</h3>
                        <p>• मेहनत का फल मीठा होता है<br>
                        • किसान देश की रीढ़ हैं<br>
                        • ईमानदारी से काम करना चाहिए<br>
                        • प्रकृति का सम्मान करना चाहिए</p>
                    </div>
                `
            },
            {
                title: 'पत्र लेखन (Letter Writing)',
                content: `
                    <h2>हिंदी में पत्र लिखना</h2>
                    <p>सरकारी काम और व्यापार के लिए हिंदी में पत्र लिखना जरूरी है।</p>
                    
                    <div class="lesson-example">
                        <h3>पत्र का प्रारूप (Letter Format):</h3>
                        <div class="business-tip">
                            <p><strong>1. दिनांक:</strong> ऊपर दाईं ओर तारीख लिखें</p>
                            <p><strong>2. पता:</strong> जिसे पत्र लिख रहे हैं उसका पता</p>
                            <p><strong>3. संबोधन:</strong> "महोदय" या "श्रीमान जी"</p>
                            <p><strong>4. विषय:</strong> पत्र का मुख्य विषय</p>
                            <p><strong>5. मुख्य भाग:</strong> असली बात</p>
                            <p><strong>6. समापन:</strong> "धन्यवाद" + आपका नाम</p>
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>आवेदन पत्र का उदाहरण:</h3>
                        <div class="cost-calculation">
                            <p>दिनांक: 15 जनवरी, 2025</p>
                            <p>सेवा में,<br>
                            शाखा प्रबंधक<br>
                            भारतीय स्टेट बैंक<br>
                            रामपुर</p>
                            <p>महोदय,</p>
                            <p>विषय: कृषि ऋण के लिए आवेदन</p>
                            <p>मैं रामपुर गांव का निवासी हूं और खेती का काम करता हूं। मुझे गेहूं की खेती के लिए ₹50,000 का ऋण चाहिए। मेरे पास 2 एकड़ जमीन है और सिंचाई की अच्छी व्यवस्था है। कृपया मेरे आवेदन पर विचार करें।</p>
                            <p>धन्यवाद,<br>
                            राम सिंह</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अन्य प्रकार के पत्र:</h3>
                        <p><strong>शिकायती पत्र:</strong> किसी समस्या के बारे में<br>
                        <strong>निवेदन पत्र:</strong> कोई मांग या अनुरोध<br>
                        <strong>सूचना पत्र:</strong> कोई जानकारी देने के लिए<br>
                        <strong>व्यापारिक पत्र:</strong> खरीद-बिक्री के लिए</p>
                    </div>
                `
            },
            {
                title: 'निबंध लेखन (Essay Writing)',
                content: `
                    <h2>हिंदी में निबंध लिखना</h2>
                    <p>अपने विचारों को व्यवस्थित तरीके से लिखना सीखें।</p>
                    
                    <div class="lesson-example">
                        <h3>निबंध की संरचना:</h3>
                        <div class="business-tip">
                            <p><strong>1. प्रस्तावना:</strong> विषय का परिचय</p>
                            <p><strong>2. मुख्य भाग:</strong> विस्तार से जानकारी</p>
                            <p><strong>3. उपसंहार:</strong> निष्कर्ष और सुझाव</p>
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>निबंध उदाहरण - "आधुनिक खेती":</h3>
                        <div class="hindi-text">
                            <p><strong>प्रस्तावना:</strong> आज के समय में खेती के तरीके बदल रहे हैं। नई तकनीक और वैज्ञानिक तरीकों से किसान बेहतर फसल उगा रहे हैं।</p>
                            
                            <p><strong>मुख्य भाग:</strong> आधुनिक खेती में ट्रैक्टर, हार्वेस्टर जैसी मशीनों का उपयोग होता है। ड्रिप सिंचाई से पानी की बचत होती है। उन्नत बीजों से अधिक उत्पादन मिलता है। जैविक खाद से मिट्टी की गुणवत्ता बनी रहती है।</p>
                            
                            <p><strong>उपसंहार:</strong> आधुनिक खेती से किसानों की आय बढ़ रही है। सरकार को और भी सुविधाएं देनी चाहिए ताकि सभी किसान इसका लाभ उठा सकें।</p>
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>निबंध के विषय:</h3>
                        <p>• मेरा गांव<br>
                        • पर्यावरण संरक्षण<br>
                        • किसान का महत्व<br>
                        • जल संरक्षण<br>
                        • शिक्षा का महत्व</p>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अच्छा निबंध लिखने के तरीके:</h3>
                        <p>• सरल और स्पष्ट भाषा का उपयोग करें<br>
                        • छोटे-छोटे वाक्य लिखें<br>
                        • उदाहरण दें<br>
                        • व्यक्तिगत अनुभव शामिल करें<br>
                        • सकारात्मक सुझाव दें</p>
                    </div>
                `
            }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    setTimeout(() => {
        hideLoadingScreen();
        initializeApp();
    }, 3000);
    
    // Initialize event listeners
    setupEventListeners();
    
    // Load user progress from localStorage
    loadUserProgress();
});

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function initializeApp() {
    // Initialize navigation
    setupNavigation();
    
    // Initialize progress tracking
    updateProgressDisplay();
    
    // Setup AI assistant
    setupAIAssistant();
    
    // Add scroll animations
    setupScrollAnimations();
}

function setupEventListeners() {
    // Navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Enter key for chat input
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);

            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                document.getElementById('form-status').innerHTML = "<div class='success-message'>Thank you! Your message has been sent.</div>";
                form.reset();
            } else {
                document.getElementById('form-status').innerHTML = "<div class='error-message'>Sorry! Something went wrong. Please try again.</div>";
            }
        };
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openSubject(subject) {
    currentSubject = subject;
    currentLesson = 0;
    
    const modal = document.getElementById('learning-modal');
    const modalTitle = document.getElementById('modal-title');
    const lessonList = document.getElementById('lesson-list');
    
    if (modal && modalTitle && lessonList) {
        modalTitle.textContent = subjectData[subject].title;
        
        // Populate lesson list
        lessonList.innerHTML = '';
        subjectData[subject].lessons.forEach((lesson, index) => {
            const li = document.createElement('li');
            li.textContent = lesson.title;
            li.addEventListener('click', () => loadLesson(index));
            if (index === 0) li.classList.add('active');
            lessonList.appendChild(li);
        });
        
        // Load first lesson
        loadLesson(0);
        
        modal.style.display = 'block';
        modal.classList.add('animate-fade-in');
    }
}

function loadLesson(lessonIndex) {
    if (!currentSubject || !subjectData[currentSubject]) return;
    
    currentLesson = lessonIndex;
    const lesson = subjectData[currentSubject].lessons[lessonIndex];
    const lessonDisplay = document.getElementById('lesson-display');
    const lessonItems = document.querySelectorAll('.lesson-list li');
    
    if (lessonDisplay && lesson) {
        lessonDisplay.innerHTML = lesson.content;
        lessonDisplay.classList.add('animate-slide-up');
        
        // Update active lesson
        lessonItems.forEach((item, index) => {
            item.classList.toggle('active', index === lessonIndex);
        });
        
        // Track progress
        updateLessonProgress();
    }
}

function nextLesson() {
    if (!currentSubject || !subjectData[currentSubject]) return;
    
    const maxLessons = subjectData[currentSubject].lessons.length;
    if (currentLesson < maxLessons - 1) {
        loadLesson(currentLesson + 1);
        
        // Update progress
        userProgress[currentSubject] = Math.max(
            userProgress[currentSubject],
            ((currentLesson + 1) / maxLessons) * 100
        );
        saveUserProgress();
        updateProgressDisplay();
    } else {
        // Course completed
        showCourseCompletion();
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        loadLesson(currentLesson - 1);
    }
}

function closeLearningModal() {
    const modal = document.getElementById('learning-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateLessonProgress() {
    if (!currentSubject) return;
    
    const maxLessons = subjectData[currentSubject].lessons.length;
    const progressPercentage = ((currentLesson + 1) / maxLessons) * 100;
    
    // Update subject card progress
    const subjectCard = document.querySelector(`[data-subject="${currentSubject}"]`);
    if (subjectCard) {
        const progressFill = subjectCard.querySelector('.progress-fill');
        const progressText = subjectCard.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
        }
    }
    
    // Update global progress
    userProgress[currentSubject] = Math.max(userProgress[currentSubject], progressPercentage);
    totalLessons = Math.max(totalLessons, currentLesson + 1);
    studyTime += 3; // Add 3 minutes per lesson
    
    saveUserProgress();
}

function showCourseCompletion() {
    achievements++;
    saveUserProgress();
    updateProgressDisplay();
    
    // Show completion message
    const lessonDisplay = document.getElementById('lesson-display');
    if (lessonDisplay) {
        lessonDisplay.innerHTML = `
            <div class="success-message animate-bounce">
                <h2>🎉 बधाई हो! Congratulations!</h2>
                <p>You have completed the ${subjectData[currentSubject].title} course!</p>
                <p>Keep learning and growing your farming knowledge.</p>
            </div>
        `;
    }
}

// AI Assistant Functions
function setupAIAssistant() {
    // Initialize chat with welcome message
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        // Welcome message is already in HTML
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');
    
    if (!userInput || !chatMessages || !sendBtn) return;
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Show loading state
    sendBtn.innerHTML = '<div class="spinner"></div>';
    sendBtn.disabled = true;
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        addMessageToChat(response, 'ai');
    } catch (error) {
        console.error('AI Error:', error);
        addMessageToChat('Sorry, I encountered an error. Please try again later.', 'ai');
    } finally {
        // Reset button
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendBtn.disabled = false;
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getAIResponse(userMessage) {
    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value || GEMINI_API_KEY : GEMINI_API_KEY;
    
    if (!apiKey) {
        return 'Please set your Gemini API key in the settings to use the AI assistant.';
    }
    
    const prompt = `You are a helpful AI assistant for farmers and people learning basic education. The user is asking: "${userMessage}"
    
    Please provide a simple, clear, and encouraging response. Focus on:
    - Farming techniques and business advice
    - Cost-effective methods
    - Seasonal planning
    - Crop management
    - Basic education topics (Math, Science, English, Hindi)
    
    Use easy language and be supportive. Keep your response under 200 words and include practical tips when relevant.`;
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'I apologize, but I am having trouble connecting right now. Please try asking your question again in a moment.';
    }
}

function askQuickQuestion(question) {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.value = question;
        sendMessage();
    }
}

function openAIAssistant() {
    scrollToSection('ai-assistant');
}

// Progress Functions
function updateProgressDisplay() {
    // Update stats
    const totalLessonsEl = document.getElementById('total-lessons');
    const studyTimeEl = document.getElementById('study-time');
    const achievementsEl = document.getElementById('achievements');
    
    if (totalLessonsEl) totalLessonsEl.textContent = totalLessons;
    if (studyTimeEl) studyTimeEl.textContent = studyTime;
    if (achievementsEl) achievementsEl.textContent = achievements;
    
    // Update subject progress bars
    Object.keys(userProgress).forEach(subject => {
        const progressBar = document.querySelector(`.${subject}-progress`);
        const progressItem = progressBar ? progressBar.closest('.subject-progress-item') : null;
        const percentageEl = progressItem ? progressItem.querySelector('.progress-percentage') : null;
        
        if (progressBar) {
            progressBar.style.width = `${userProgress[subject]}%`;
        }
        if (percentageEl) {
            percentageEl.textContent = `${Math.round(userProgress[subject])}%`;
        }
    });
}

function saveUserProgress() {
    const progressData = {
        userProgress,
        studyTime,
        achievements,
        totalLessons
    };
    localStorage.setItem('smartGuardianProgress', JSON.stringify(progressData));
}

function loadUserProgress() {
    const saved = localStorage.getItem('smartGuardianProgress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            userProgress = data.userProgress || userProgress;
            studyTime = data.studyTime || 0;
            achievements = data.achievements || 0;
            totalLessons = data.totalLessons || 0;
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
}

// Animation Functions
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.subject-card, .stat-card, .ai-header');
    animateElements.forEach(el => observer.observe(el));
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Arrow keys for lesson navigation
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
        previousLesson();
    }
    if (e.key === 'ArrowRight' && e.ctrlKey) {
        nextLesson();
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}