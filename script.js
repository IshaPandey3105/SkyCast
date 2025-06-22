// alert("hi")

const btn = document.getElementById("search-btn");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const cityHum = document.getElementById("city-hum");
const cityFeels = document.getElementById("city-feels");

const original = "EzHIHHMGMDLLHzKHMyLEDGLDDFIFEDJ";
const hashedAPIKey = unhashBack20(original);

function formatDateTime(dateTimeStr) {
  const dateObj = new Date(dateTimeStr);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", {month: "long"});
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  return `${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;
}

async function getData(cityName) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${hashedAPIKey}&q=${cityName}&aqi=yes`
  );
  return await data.json();
}
btn.addEventListener("click", async () => {
  const value = input.value;
  if (value.trim() === "") {
    alert("Please enter a city name!");
    return;
  }
  try {
    const result = await getData(value);
    const DateAndTime = formatDateTime(result.location.localtime);

    cityName.innerHTML = `<i class="fa-solid fa-city"></i> City ${"\u2192"} ${
      result.location.name
    }, ${result.location.country}`;
    cityTime.innerHTML = `<i class="fa-regular fa-clock"></i> Time ${"\u2192"} ${DateAndTime}`;
    cityTemp.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> Temperature ${"\u2192"} ${
      result.current.temp_c
    }°C`;
    cityHum.innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity ${"\u2192"} ${
      result.current.humidity
    }%`;
    cityFeels.innerHTML = `<i class="fa-solid fa-temperature-low"></i> Feels Like ${"\u2192"} ${
      result.current.feelslike_c
    }°C`;
  } catch (err) {
    alert("City not found or error in fetching data!");
  }
});
