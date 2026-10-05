/**
 * RoomHuntah — Post a Room (Multi-Step Form & Live Card Preview)
 * 
 * Guides landlords through posting their rental room, provides live preview,
 * handles photo & video uploads, and persists new rooms to SQLite backend via REST API.
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const totalSteps = 4;

  // Form Inputs
  const inputTitle = document.getElementById("post-title");
  const selectType = document.getElementById("post-type");
  const inputRent = document.getElementById("post-rent");
  const selectAdvance = document.getElementById("post-advance");
  const inputBedrooms = document.getElementById("post-bedrooms");
  const inputRegion = document.getElementById("post-region");
  const inputCity = document.getElementById("post-city");
  const inputArea = document.getElementById("post-area");
  const inputDesc = document.getElementById("post-desc");
  const inputLandlordName = document.getElementById("post-landlord-name");
  const inputLandlordPhone = document.getElementById("post-landlord-phone");
  const photoFileInput = document.getElementById("post-photo-upload");
  const videoFileInput = document.getElementById("post-video-upload");
  const videoInfoDisplay = document.getElementById("uploaded-video-info");

  // Live Preview Elements
  const previewTitle = document.getElementById("live-preview-title");
  const previewLocation = document.getElementById("live-preview-location");
  const previewPrice = document.getElementById("live-preview-price");
  const previewAdvance = document.getElementById("live-preview-advance");
  const previewImg = document.getElementById("live-preview-img");
  const previewLandlord = document.getElementById("live-preview-landlord");
  const previewFacilitiesContainer = document.getElementById("live-preview-facilities");
  const previewReel = document.getElementById("uploaded-photos-reel");

  // Real File Objects for Multipart Upload
  let selectedPhotoFiles = [];
  let selectedVideoFile = null;

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

  // Handle Photo Selection & Previews
  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      selectedPhotoFiles = files.filter(f => f.type.startsWith("image/"));
      previewReel.innerHTML = "";

      selectedPhotoFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgData = event.target.result;

          // Update main preview image with first uploaded photo
          if (index === 0) {
            previewImg.src = imgData;
          }

          // Thumbnail in reel
          const thumb = document.createElement("img");
          thumb.src = imgData;
          thumb.className = "preview-thumb";
          thumb.title = file.name;
          previewReel.appendChild(thumb);
        };
        reader.readAsDataURL(file);
      });

      showToast(`Selected ${selectedPhotoFiles.length} photo(s) ready to upload`, "success");
    });
  }

  // Handle Video Selection
  if (videoFileInput) {
    videoFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) {
        selectedVideoFile = null;
        if (videoInfoDisplay) videoInfoDisplay.style.display = "none";
        return;
      }

      if (!file.type.startsWith("video/")) {
        showToast("Please select a valid video file (MP4, MOV, WebM)", "error");
        videoFileInput.value = "";
        selectedVideoFile = null;
        if (videoInfoDisplay) videoInfoDisplay.style.display = "none";
        return;
      }

      selectedVideoFile = file;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      
      if (videoInfoDisplay) {
        videoInfoDisplay.innerHTML = `✓ <strong>Video Selected:</strong> ${file.name} (${sizeMb} MB) — Ready to upload`;
        videoInfoDisplay.style.display = "block";
      }

      showToast("Walkthrough video attached successfully!", "success");
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
    const wizardCard = document.querySelector(".wizard-card");
    if (wizardCard) {
      window.scrollTo({ top: wizardCard.offsetTop - 80, behavior: "smooth" });
    }
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
        if (!inputCity.value.trim() || !inputArea.value.trim()) {
          showToast("Please enter both city and neighborhood/landmark", "error");
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

  [selectType, selectAdvance, inputRegion, inputBedrooms].forEach(select => {
    if (select) select.addEventListener("change", updateLivePreview);
  });

  document.querySelectorAll("input[name='facilities']").forEach(cb => {
    cb.addEventListener("change", updateLivePreview);
  });

  // Handle Listing Submission to Backend API
  const postForm = document.getElementById("post-room-form");
  if (postForm) {
    postForm.addEventListener("submit", async (e) => {
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
      const bedrooms = parseInt(inputBedrooms.value, 10) || (category === "two-bedroom" ? 2 : 1);
      const description = inputDesc.value.trim() || "Neat unfurnished empty room ready for immediate tenancy.";
      const landlordName = inputLandlordName.value.trim();
      const landlordPhone = inputLandlordPhone.value.trim();

      if (!title) {
        showToast("Please enter a listing title", "error");
        goToStep(1);
        return;
      }
      if (isNaN(rent) || rent <= 0) {
        showToast("Please enter a valid monthly rent in GH₵", "error");
        goToStep(1);
        return;
      }
      if (!area) {
        showToast("Please enter the neighbourhood or landmark", "error");
        goToStep(2);
        return;
      }
      if (!landlordName || !landlordPhone) {
        showToast("Please enter your name and phone number so interested tenants can reach you", "error");
        goToStep(4);
        return;
      }

      const facilities = Array.from(document.querySelectorAll("input[name='facilities']:checked")).map(cb => cb.value);

      // Prepare FormData for multipart upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("rent", rent);
      formData.append("type", typeText);
      formData.append("roomCategory", category);
      formData.append("region", region);
      formData.append("city", city);
      formData.append("neighborhood", area);
      formData.append("advanceMonths", advanceMonths);
      formData.append("advancePeriod", advanceText);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", 1);
      formData.append("securityDeposit", Math.round(rent * 0.5));
      formData.append("description", description);
      formData.append("landlordName", landlordName);
      formData.append("landlordPhone", landlordPhone);
      formData.append("facilities", JSON.stringify(facilities.length > 0 ? facilities : ["Self Prepaid Meter", "Gated Compound", "Poly Tank / Constant Water"]));

      // Append real photo files
      if (selectedPhotoFiles && selectedPhotoFiles.length > 0) {
        selectedPhotoFiles.forEach(file => {
          formData.append("photos", file);
        });
      }

      // Append real video file if provided
      if (selectedVideoFile) {
        formData.append("video", selectedVideoFile);
      }

      // UI Loading state
      btnSubmit.disabled = true;
      btnSubmit.textContent = "Publishing Room Listing... ⏳";

      try {
        let createdRoom = null;
        if (typeof submitRoomListing === "function") {
          createdRoom = await submitRoomListing(formData);
        } else {
          // Fallback to local save if offline
          const fallbackRoom = {
            id: "room-" + Date.now(),
            title,
            type: typeText,
            roomCategory: category,
            bedrooms,
            bathrooms: 1,
            rent,
            advancePeriod: advanceText,
            advanceMonths,
            securityDeposit: Math.round(rent * 0.5),
            region,
            city,
            neighborhood: area,
            description,
            facilities: facilities.length > 0 ? facilities : ["Self Prepaid Meter", "Gated Compound", "Poly Tank / Constant Water"],
            isVerified: true,
            hasVideo: Boolean(selectedVideoFile),
            images: ["images/empty-single-room.jpg"],
            landlord: { name: landlordName, phone: landlordPhone, role: "Landlord", isVerified: true, memberSince: "2026" },
            datePosted: new Date().toISOString().split("T")[0],
            isAvailable: true
          };
          createdRoom = saveRoom(fallbackRoom);
        }

        showToast("🎉 Room listing published successfully!", "success");

        // Redirect to find a room page where the newly posted room appears at the top
        setTimeout(() => {
          window.location.href = "rooms.html";
        }, 1200);

      } catch (err) {
        console.error("Submission failed:", err);
        showToast(err.message || "Failed to publish listing. Please try again.", "error");
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Publish Room Listing 🚀";
      }
    });
  }

  // Initial preview sync
  updateLivePreview();
});
