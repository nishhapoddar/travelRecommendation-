// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "results";
  resultsContainer.style.display = "grid";
  resultsContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
  resultsContainer.style.gap = "20px";
  document.body.appendChild(resultsContainer);

  // Fetch JSON data
  let travelData = [];
  fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
      travelData = data;
      console.log("Travel data loaded:", travelData); // ✅ Check if data is accessible
    })
    .catch(error => console.error("Error fetching data:", error));

  // Search button logic
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase(); // normalize input
    resultsContainer.innerHTML = ""; // clear previous results

    if (!keyword) {
      alert("Please enter a keyword (beach, temple, or country).");
      return;
    }

    let matches = [];

    if (keyword.includes("beach")) {
      matches = travelData.beaches || [];
    } else if (keyword.includes("temple")) {
      matches = travelData.temples || [];
    } else if (keyword.includes("country")) {
      matches = travelData.countries || [];
    } else {
      alert("No matching category found. Try 'beach', 'temple', or 'country'.");
      return;
    }

    // Display results
    matches.slice(0, 2).forEach(place => {
      const card = document.createElement("div");
      card.style.background = "#f6ecec";
      card.style.padding = "15px";
      card.style.borderRadius = "8px";
      card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      card.style.textAlign = "center";

      const img = document.createElement("img");
      img.src = place.imageUrl; // ensure your JSON has valid image paths
      img.alt = place.name;
      img.style.width = "100%";
      img.style.borderRadius = "6px";

      const title = document.createElement("h3");
      title.textContent = place.name;

      const desc = document.createElement("p");
      desc.textContent = place.description;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      resultsContainer.appendChild(card);
    });
  });

  // Clear button logic
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
  });
});
