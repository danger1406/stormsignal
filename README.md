# ☁️ Rain Informer Mailer (WeatherWatch) 🌧️

A full-stack web application built with **Flask** that fetches real-time weather forecasts and sends email notifications if rain is expected at a given location. Users can look up weather by city name, latitude/longitude coordinates, or by clicking on an interactive map.

---

## 🚀 Features

- 🌦️ Real-time weather data via [Open-Meteo API](https://open-meteo.com/)
- 📩 Automatic email alerts with forecast table & graph if rain is expected
- 🗺️ Interactive Leaflet map — click any location to get weather
- 📊 24-hour forecast chart (Chart.js) with temperature & rain
- 🌙 Dark-mode toggle
- ✅ Client-side form validation (jQuery)
- 📱 Fully responsive (Bootstrap 5)

---

## 🛠️ Technologies Used

| Layer      | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Backend    | Flask (Python), Jinja2 templating                           |
| Frontend   | HTML5, Bootstrap 5, minimal custom CSS                      |
| JavaScript | jQuery 3.x, Chart.js, Leaflet.js                            |
| APIs       | Open-Meteo (weather), API Ninjas (geocoding), LocationIQ    |
| Email      | SMTP (Gmail) with HTML email + graph attachment              |
| Deployment | Gunicorn (Procfile)                                         |

---

## 📂 Project Structure

```
Rain_Informer_Mailer/
├── static/
│   ├── css/
│   │   └── style.css           # Custom styles (minimal overrides)
│   ├── js/
│   │   └── main.js             # jQuery logic, validation, map, charts
│   └── images/
│       ├── img.png             # Favicon
│       ├── map.png
│       ├── location.png
│       ├── cityscape.png
│       ├── architecture-and-city.png
│       └── clock.png
├── templates/
│   ├── base.html               # Base layout (Bootstrap, jQuery, nav, footer)
│   ├── index.html              # Home page with input forms
│   └── success.html            # Weather results / confirmation
├── app.py                      # Flask main application
├── requirements.txt            # Python dependencies
├── Procfile                    # Deployment configuration
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/saimani1232/Rain_Informer_Mailer.git
cd Rain_Informer_Mailer
```

### 2. Create a virtual environment (optional but recommended)

```bash
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set environment variables

Create a `.env` file or set these in your shell:

```
MY_EMAIL=your_gmail@gmail.com
MY_PASSWORD=your_app_password
GEO_API_KEY=your_api_ninjas_key
LOC_API_KEY=your_locationiq_key
SECRET_KEY=any-random-string
```

### 5. Run the application

```bash
python app.py
```

Open your browser and navigate to **http://127.0.0.1:5000/**

---

## 🔥 Usage

1. **Home Page (`/`)** — Choose input method: coordinates, city name, or map click.
2. **Submit (`/submit`)** — The app fetches weather data and sends an email alert if rain is expected.
3. **Results (`/success`)** — View current conditions, 24-hour chart, and hourly breakdown.

---

## 📧 Email Notification Preview

**Subject:** 🌧️ Weather Alert: Updated Forecast for Your Location!
**Body includes:** Weather summary, 24-hour forecast table, and temperature/rain graph attachment.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📬 Contact

📧 Email: macherlasaimani@gmail.com
🐙 GitHub: [saimani1232](https://github.com/saimani1232)

---

Made with ❤️ using Flask & Bootstrap. Stay dry and stay safe! 🌧️☂️
