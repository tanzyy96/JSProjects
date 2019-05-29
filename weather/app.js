// Run onLoad
window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temperature-description");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempSection = document.querySelector(".degree-section");
  const tempSectionSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/98f6b38550a8cb2548b1461b05ecf107/${lat},${long}`;

      // asynchronous update from api fetch
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          // Set DOM Elements from the API
          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Set Icon
          setIcons(icon, document.querySelector(".icon"));
          setTempType(temperature);
        });
    });
  } else {
    h1.textContent = "Please enable geolocation.";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function setTempType(temp) {
    tempSection.addEventListener("click", () => {
      if (tempSectionSpan.textContent === "F") {
        tempSectionSpan.textContent = "C";
        tempDegree.textContent = Math.floor(
          ((tempDegree.textContent - 32) * 5) / 9
        );
      } else {
        tempSectionSpan.textContent = "F";
        tempDegree.textContent = temp;
      }
    });
  }
});
