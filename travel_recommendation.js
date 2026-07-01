document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const searchInput = document.getElementById("searchInput");
  const heroSection = document.querySelector(".hero"); // main homepage section

  // Save original homepage content so we can restore it later
  const originalHomeContent = heroSection.innerHTML;

  // Fetch JSON data
  let travelData = [];
  fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
      travelData = data;
      console.log("Travel data loaded:", travelData);
    })
    .catch(error => console.error("Error fetching data:", error));

  // Search button logic
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    heroSection.innerHTML = ""; // clear homepage content

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

    // Create results grid inside heroSection
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "results";
    resultsContainer.style.display = "grid";
    resultsContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(440px, 1fr))"; // doubled size
    resultsContainer.style.gap = "20px";
    resultsContainer.style.justifyItems = "center";

    matches.slice(0, 4).forEach(place => {
      const card = document.createElement("div");
      card.style.background = "#fff";
      card.style.padding = "12px";
      card.style.borderRadius = "8px";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      card.style.textAlign = "center";
      card.style.maxWidth = "440px"; // doubled width

      // Image wrapper for overlay caption
      const imgWrapper = document.createElement("div");
      imgWrapper.style.position = "relative";
      imgWrapper.style.width = "420px";   // doubled size
      imgWrapper.style.height = "280px";  // doubled size

      const img = document.createElement("img");
      img.src = place.imageUrl;
      img.alt = place.name;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.borderRadius = "6px";

      const overlay = document.createElement("div");
      overlay.textContent = place.description;
      overlay.style.position = "absolute";
      overlay.style.bottom = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.background = "rgba(0,0,0,0.6)";
      overlay.style.color = "#fff";
      overlay.style.fontSize = "1rem";
      overlay.style.padding = "8px";
      overlay.style.borderRadius = "0 0 6px 6px";
      overlay.style.textAlign = "left";

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(overlay);

      const title = document.createElement("h3");
      title.textContent = place.name;
      title.style.margin = "10px 0 6px";

      card.appendChild(imgWrapper);
      card.appendChild(title);
      resultsContainer.appendChild(card);
    });

    heroSection.appendChild(resultsContainer);
  });

  // Clear button logic
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    heroSection.innerHTML = originalHomeContent; // restore homepage
  });
});
