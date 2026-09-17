/**
 * RoomHuntah — Post a Room (Multi-Step Form & Live Card Preview)
 * 
 * Guides landlords through posting their rental room, provides live preview,
 * handles image upload previews with FileReader, and persists new rooms to localStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const totalSteps = 4;

  // Form Inputs
  const inputTitle = document.getElementById("post-title");
  const selectType = document.getElementById("post-type");
  const inputRent = document.getElementById("post-rent");
  const selectAdvance = document.getElementById("post-advance");
  const inputRegion = document.getElementById("post-region");
  const inputCity = document.getElementById("post-city");
  const inputArea = document.getElementById("post-area");
  const inputDesc = document.getElementById("post-desc");
  const inputLandlordName = document.getElementById("post-landlord-name");
  const inputLandlordPhone = document.getElementById("post-landlord-phone");
  const photoFileInput = document.getElementById("post-photo-upload");
  const videoFileInput = document.getElementById("post-video-upload");

  // Live Preview Elements
  const previewTitle = document.getElementById("live-preview-title");
  const previewLocation = document.getElementById("live-preview-location");
  const previewPrice = document.getElementById("live-preview-price");
  const previewAdvance = document.getElementById("live-preview-advance");
  const previewImg = document.getElementById("live-preview-img");
  const previewLandlord = document.getElementById("live-preview-landlord");
  const previewFacilitiesContainer = document.getElementById("live-preview-facilities");
  const previewReel = document.getElementById("uploaded-photos-reel");

  let uploadedImages = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
  ];

  // Update Live Preview as Landlord Types
  function updateLivePreview() {
    previewTitle.textContent = inputTitle.value.trim() || "Room Title Will Appear Here";
    
    const city = inputCity.value.trim();
    const area = inputArea.value.trim();
    const region = inputRegion.value;
    
    if (area || city || region) {
      previewLocation.textContent = `${area || 'Area'}, ${city || 'City'}${region ? ` (${region})` : ''}`;
    } else {
      previewLocation.textContent = "Location, Ghana";
    }

    const rent = parseFloat(inputRent.value);
    previewPrice.textContent = isNaN(rent) ? "GH₵ 0" : formatCedis(rent);
    previewAdvance.textContent = selectAdvance.options[selectAdvance.selectedIndex].text;
    previewLandlord.textContent = inputLandlordName.value.trim() || "Landlord Name";

    // Preview Facilities
    const checkedFacilities = Array.from(document.querySelectorAll("input[name='facilities']:checked")).map(cb => cb.value);
    if (checkedFacilities.length === 0) {
      previewFacilitiesContainer.innerHTML = `<span class="facility-chip">✓ Self Meter</span><span class="facility-chip">✓ Gated</span>`;
    } else {
      previewFacilitiesContainer.innerHTML = checkedFacilities.slice(0, 3).map(f => `<span class="facility-chip">✓ ${f}</span>`).join("");
    }
  }

  // Handle Photo Upload Simulation with FileReader
  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      previewReel.innerHTML = "";
      uploadedImages = [];

      files.forEach((file, index) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const imgData = event.target.result;
          uploadedImages.push(imgData);

          // Update main preview image with first uploaded photo
          if (index === 0) {
            previewImg.src = imgData;
          }

          // Thumbnail in reel
          const thumb = document.createElement("img");
          thumb.src = imgData;
          thumb.className = "preview-thumb";
          previewReel.appendChild(thumb);
        };
        reader.readAsDataURL(file);
      });

      showToast(`Selected ${files.length} photo(s) for preview`, "success");
    });
  }

  // Step Navigation Buttons
  const btnNext = document.getElementById("btn-wizard-next");
  const btnPrev = document.getElementById("btn-wizard-prev");
  const btnSubmit = document.getElementById("btn-wizard-submit");

  function goToStep(step) {
    currentStep = step;

    // Show/hide step panels
    document.querySelectorAll(".form-step-content").forEach((panel, idx) => {
      panel.classList.toggle("active", idx + 1 === currentStep);
    });

    // Update step node headers
    document.querySelectorAll(".wizard-step-node").forEach((node, idx) => {
      const stepNum = idx + 1;
      node.classList.remove("active", "completed");
      if (stepNum === currentStep) {
        node.classList.add("active");
      } else if (stepNum < currentStep) {
        node.classList.add("completed");
      }
    });

    // Toggle button visibility
    btnPrev.style.display = currentStep > 1 ? "inline-flex" : "none";
    if (currentStep === totalSteps) {
      btnNext.style.display = "none";
      btnSubmit.style.display = "inline-flex";
    } else {
      btnNext.style.display = "inline-flex";
      btnSubmit.style.display = "none";
    }

    // Scroll to top of wizard on mobile
    window.scrollTo({ top: document.querySelector(".wizard-card").offsetTop - 80, behavior: "smooth" });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      // Validate current step
      if (currentStep === 1) {
        if (!inputTitle.value.trim() || !inputRent.value || parseFloat(inputRent.value) <= 0) {
          showToast("Please enter a room title and monthly rent", "error");
          return;
        }
      } else if (currentStep === 2) {
        if (!inputRegion.value || !inputCity.value.trim() || !inputArea.value.trim()) {
          showToast("Please provide the region, city, and area / neighbourhood", "error");
          return;
        }
      }
      goToStep(currentStep + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      goToStep(currentStep - 1);
    });
  }

  // Bind live listeners
  [inputTitle, inputRent, inputCity, inputArea, inputDesc, inputLandlordName, inputLandlordPhone].forEach(input => {
    if (input) input.addEventListener("input", updateLivePreview);
  });

  [selectType, selectAdvance, inputRegion].forEach(select => {
    if (select) select.addEventListener("change", updateLivePreview);
  });

  document.querySelectorAll("input[name='facilities']").forEach(cb => {
    cb.addEventListener("change", updateLivePreview);
  });

  // Handle Listing Submission
  const postForm = document.getElementById("post-room-form");
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = inputTitle.value.trim();
      const rent = parseFloat(inputRent.value);
      const category = selectType.value;
      const typeText = selectType.options[selectType.selectedIndex].text;
      const region = inputRegion.value;
      const city = inputCity.value.trim();
      const area = inputArea.value.trim();
      const advanceText = selectAdvance.options[selectAdvance.selectedIndex].text;
      const advanceMonths = parseInt(selectAdvance.value, 10);
      const description = inputDesc.value.trim() || "Neat room available for rent with standard facilities.";
      const landlordName = inputLandlordName.value.trim() || "Landlord";
      const landlordPhone = inputLandlordPhone.value.trim() || "+233 24 000 0000";

      const facilities = Array.from(document.querySelectorAll("input[name='facilities']:checked")).map(cb => cb.value);

      const newRoom = {
        id: "room-" + Date.now(),
        title,
        type: typeText,
        roomCategory: category,
        bedrooms: category === "two-bedroom" ? 2 : 1,
        bathrooms: 1,
        rent,
        advancePeriod: advanceText,
        advanceMonths: advanceMonths,
        securityDeposit: Math.round(rent * 0.5),
        region,
        city,
        neighborhood: area,
        description,
        facilities: facilities.length > 0 ? facilities : ["Self Prepaid Meter", "Gated Compound", "Poly Tank / Constant Water"],
        isVerified: true,
        hasVideo: true,
        images: uploadedImages,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        videoThumbnail: uploadedImages[0],
        landlord: {
          name: landlordName,
          phone: landlordPhone,
          role: "Landlord",
          isVerified: true,
          memberSince: "2026"
        },
        datePosted: new Date().toISOString().split("T")[0],
        isAvailable: true
      };

      // Save to localStorage
      saveRoom(newRoom);

      showToast("🎉 Room listing published successfully!", "success");

      // Redirect to rooms.html after brief delay so landlord sees the published listing immediately
      setTimeout(() => {
        window.location.href = "rooms.html";
      }, 1200);
    });
  }

  // Initial preview sync
  updateLivePreview();
});
