/**
 * RoomHuntah — Find a Room (Search, Filtering & Sorting)
 * 
 * Handles query parameter initialization, real-time multi-filter matching,
 * price slider reactivity, and sorting.
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("rooms-results-grid");
  const countEl = document.getElementById("results-count-number");
  const emptyState = document.getElementById("empty-results-state");

  // Form Filter Controls
  const locationInput = document.getElementById("filter-location");
  const regionSelect = document.getElementById("filter-region");
  const priceSlider = document.getElementById("filter-price-slider");
  const priceDisplay = document.getElementById("filter-price-val");
  const sortSelect = document.getElementById("sort-by");
  const resetBtn = document.getElementById("btn-reset-all");

  // Checkboxes
  const typeCheckboxes = document.querySelectorAll("input[name='roomType']");
  const facilityCheckboxes = document.querySelectorAll("input[name='facility']");

  // Parse initial query params from URL (e.g. from homepage hero search)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("location")) {
    locationInput.value = urlParams.get("location");
  }
  if (urlParams.has("region")) {
    regionSelect.value = urlParams.get("region");
  }
  if (urlParams.has("type") && urlParams.get("type") !== "") {
    const targetType = urlParams.get("type");
    typeCheckboxes.forEach(cb => {
      if (cb.value === targetType) cb.checked = true;
    });
  }
  if (urlParams.has("maxPrice")) {
    const p = parseInt(urlParams.get("maxPrice"), 10);
    if (!isNaN(p) && p > 0) {
      priceSlider.value = p;
      priceDisplay.textContent = formatCedis(p);
    }
  }

  // Update slider label when dragging
  priceSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    priceDisplay.textContent = val >= 2500 ? "Any Price" : formatCedis(val);
    applyFilters();
  });

  // Filter application
  function applyFilters() {
    let allRooms = getRooms();
    const queryLocation = (locationInput.value || "").trim().toLowerCase();
    const selectedRegion = regionSelect.value;
    const maxPrice = parseInt(priceSlider.value, 10);

    // Selected Room Types
    const selectedTypes = Array.from(typeCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    // Selected Facilities
    const selectedFacilities = Array.from(facilityCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    let filtered = allRooms.filter(room => {
      // 1. Location search (matches title, city, neighborhood, or region)
      if (queryLocation) {
        const fullLocationString = `${room.title} ${room.city} ${room.neighborhood} ${room.region}`.toLowerCase();
        if (!fullLocationString.includes(queryLocation)) {
          return false;
        }
      }

      // 2. Region filter
      if (selectedRegion && room.region !== selectedRegion) {
        return false;
      }

      // 3. Room Type filter
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(room.roomCategory)) {
          return false;
        }
      }

      // 4. Max Price filter
      if (maxPrice < 2500 && room.rent > maxPrice) {
        return false;
      }

      // 5. Facilities filter (must have all checked facilities)
      if (selectedFacilities.length > 0) {
        const roomFacsLower = (room.facilities || []).map(f => f.toLowerCase());
        const hasAllFacilities = selectedFacilities.every(reqFac => {
          return roomFacsLower.some(rf => rf.includes(reqFac));
        });
        if (!hasAllFacilities) return false;
      }

      return true;
    });

    // Sort Results
    const sortBy = sortSelect.value;
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.rent - a.rent);
    } else {
      // "newest" by default
      filtered.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    }

    // Render results
    renderResults(filtered);
  }

  function renderResults(rooms) {
    countEl.textContent = rooms.length;
    if (rooms.length === 0) {
      container.style.display = "none";
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
      container.style.display = "grid";
      container.innerHTML = rooms.map(renderRoomCard).join("");
    }
  }

  // Event Listeners for live filtering
  locationInput.addEventListener("input", applyFilters);
  regionSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  facilityCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      locationInput.value = "";
      regionSelect.value = "";
      priceSlider.value = 2500;
      priceDisplay.textContent = "Any Price";
      sortSelect.value = "newest";
      typeCheckboxes.forEach(cb => cb.checked = false);
      facilityCheckboxes.forEach(cb => cb.checked = false);
      applyFilters();
      showToast("Filters reset to default", "info");
    });
  }

  // Initial run
  applyFilters();
});
