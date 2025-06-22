const apiKey = "HG4LfCwAdnemFdD0aSl7hxYiUZdmhowY";
const year = "2025";

async function loadHolidays() {
  const country = document.getElementById("country").value;
  const holidayList = document.getElementById("holiday-list");

  if (!country) {
    holidayList.innerHTML = " Please select a country.";
    return;
  }

  holidayList.innerHTML = " Loading holidays...";

  const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const holidays = result.response.holidays;

    if (!holidays || holidays.length === 0) {
      holidayList.innerHTML = " No holidays found for this country.";
      return;
    }

    holidayList.innerHTML = "";

    holidays.forEach((holiday) => {
      const holidayItem = document.createElement("div");
      holidayItem.className = "holiday";

      holidayItem.innerHTML = `
        <h3>${holiday.name}</h3>
        <p><strong>Date:</strong> ${holiday.date.iso}</p>
        <p><strong>Type:</strong> ${holiday.type.join(", ")}</p>
        <p>${holiday.description}</p>
      `;

      holidayList.appendChild(holidayItem);
    });

  } catch (error) {
    holidayList.innerHTML = " Could not load holidays.";
    console.error("Error fetching holidays:", error);
  }
}
