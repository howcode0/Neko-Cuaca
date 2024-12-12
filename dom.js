const apiKey = '891060519296be31fbe8978dde07a559'; //api key dari weather map jangan di ubah 
//openweathermap.org

function getWeather() {
    const city = document.getElementById('city').value;
    
    //jika kota tidak ada ini yang muncul boleh di ubah jika berpengaruh sama css nya
    if (!city) {
        document.getElementById('weatherResult').innerHTML = '<p>Nama kota harus diisi!</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // debug api yang akan di tampilkan di indexOF bisa cek di console
            if (data.cod === 200) { //200 OK 400 EROR 500 EROR Tanggapan server jika overflow (maxload)
                const temperature = data.main.temp; //temperatur celcius
                const description = data.weather[0].description; //kondisi cuaca 
                const humidity = data.main.humidity; //kelembapan suatu daerah
                const windSpeed = data.wind.speed; //kecepatan angin m/s
                const cloudiness = data.clouds.all; // Persentase awan

                document.getElementById('weatherResult').innerHTML = `
                    <p id="temperature" >Suhu: ${temperature}°C</p>
                    <p id="kondisi">Kondisi: ${description}</p>
                    <p id="kelembapan">Kelembapan: ${humidity}%</p>
                    <p id="angin">Kecepatan Angin: ${windSpeed} m/s</p>
                    <p id="awan">Persentase Awan: ${cloudiness}%</p>
                `; //udah pake id jangan lupa # di css
                
                // Cek kondisi cuaca dan beri peringatan
                const condition = description.toLowerCase();
                
                //alert boleh di ubah kalau tahu kondisi

                if (condition.includes("drizzle")) {
                    alert("Waspada! Hujan Rintik-rintik.");
                }
                if (condition.includes("rain")) {
                    alert("Waspada! Hujan Deras.");
                }
                if (condition.includes("thunderstorm")) {
                    alert("Waspada! Badai Petir.");
                }
                if (cloudiness >= 50) {
                    alert("Waspada! Awan .");
                }
                if (cloudiness < 50 && cloudiness > 20) {
                    alert("Waspada! Awan Tersebar.");
                }

                //muncul kalo kota ga ada
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>Kota tidak ditemukan!</p>`;
            }
        })

        //muncul kalau api bermasalah atau kesalah kondisi cuaca
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>Terjadi kesalahan. Silakan coba lagi!</p>`;
            console.log(error);
        });
}
