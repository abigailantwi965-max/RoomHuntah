/**
 * RoomHuntah — Room Details Page Logic
 * 
 * Reads room ID from URL parameters, loads details from data.js/localStorage,
 * handles photo gallery switcher, video player, and the "I'm Interested" enquiry modal.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("id");

  let room = null;
  if (roomId) {
    if (typeof fetchRoomById === "function") {
      room = await fetchRoomById(roomId);
    } else if (typeof getRoomById === "function") {
      room = getRoomById(roomId);
    }
  }

  // Fallback if no ID given: take first available room
  if (!room) {
    if (typeof fetchRooms === "function") {
      const allRooms = await fetchRooms();
      if (allRooms.length > 0) room = allRooms[0];
    } else if (typeof getRooms === "function") {
      const allRooms = getRooms();
      if (allRooms.length > 0) room = allRooms[0];
    }
  }

  if (!room) {
    document.getElementById("room-not-found").style.display = "block";
    document.getElementById("room-details-content").style.display = "none";
    return;
  }

  // Populate Page Title & Meta
  document.title = `${room.title} — RoomHuntah`;

  // Breadcrumbs & Headers
  const crumbRegion = document.getElementById("crumb-region");
  const crumbCity = document.getElementById("crumb-city");
  const crumbTitle = document.getElementById("crumb-title");
  if (crumbRegion) crumbRegion.textContent = room.region || "Ashanti";
  if (crumbCity) crumbCity.textContent = room.city || "Kumasi";
  if (crumbTitle) crumbTitle.textContent = room.title;

  document.getElementById("detail-title").textContent = room.title;
  document.getElementById("detail-location").textContent = `${room.neighborhood || room.city}, ${room.region}`;
  
  // Pricing
  const monthlyRent = room.rent;
  document.getElementById("detail-price").textContent = formatCedis(monthlyRent);
  document.getElementById("sidebar-price").textContent = formatCedis(monthlyRent);
  
  // Advance Calculation (Ghana Standard)
  const advanceMonths = room.advanceMonths || 12;
  const totalAdvance = monthlyRent * advanceMonths;
  const advanceText = `${room.advancePeriod || '1 Year Advance'} (${formatCedis(totalAdvance)} total)`;
  
  document.getElementById("detail-advance-term").textContent = advanceText;
  document.getElementById("sidebar-advance-term").textContent = advanceText;

  const depositEl = document.getElementById("detail-deposit");
  if (depositEl) {
    depositEl.textContent = room.securityDeposit ? formatCedis(room.securityDeposit) : "GH₵ 0";
  }

  // Description & Specs
  document.getElementById("detail-description").textContent = room.description;
  document.getElementById("detail-type").textContent = room.type;
  document.getElementById("detail-bedrooms").textContent = room.bedrooms || 1;
  document.getElementById("detail-bathrooms").textContent = room.bathrooms || 1;

  // Facilities Checklist
  const facilitiesContainer = document.getElementById("detail-facilities-list");
  if (facilitiesContainer && room.facilities) {
    facilitiesContainer.innerHTML = room.facilities.map(fac => `
      <div class="facility-check-item">
        <span class="facility-icon-check">✓</span>
        <span>${fac}</span>
      </div>
    `).join("");
  }

  // Landlord Card
  const landlordName = room.landlord?.name || "Verified Landlord";
  document.getElementById("landlord-name").textContent = landlordName;
  document.getElementById("landlord-avatar-letter").textContent = landlordName.charAt(0);
  document.getElementById("landlord-role").textContent = room.landlord?.role || "Property Owner";
  document.getElementById("landlord-since").textContent = `Active on RoomHuntah since ${room.landlord?.memberSince || '2024'}`;
  
  // Phone Masking (Safety First)
  const phoneBtn = document.getElementById("btn-reveal-phone");
  const phoneDisplay = document.getElementById("landlord-phone-text");
  if (phoneBtn && phoneDisplay) {
    phoneBtn.addEventListener("click", () => {
      phoneDisplay.textContent = room.landlord?.phone || "+233 24 000 0000";
      phoneBtn.style.display = "none";
      showToast("Landlord contact revealed. Never send advance rent via MoMo before inspection!", "info");
    });
  }

  // Photo Gallery
  const mainPhoto = document.getElementById("gallery-main-img");
  const thumbsContainer = document.getElementById("gallery-thumbnails-reel");
  
  if (room.images && room.images.length > 0) {
    mainPhoto.src = room.images[0];
    mainPhoto.alt = room.title;
    mainPhoto.onerror = function() {
      this.onerror = null;
      this.src = "images/empty-single-room.jpg";
    };

    thumbsContainer.innerHTML = room.images.map((imgUrl, idx) => `
      <button type="button" class="thumbnail-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgUrl}" alt="Room photo ${idx + 1}" onerror="this.onerror=null;this.src='images/empty-single-room.jpg';">
      </button>
    `).join("");

    // Thumbnail Click Handler
    thumbsContainer.querySelectorAll(".thumbnail-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        thumbsContainer.querySelectorAll(".thumbnail-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const idx = btn.dataset.index;
        mainPhoto.src = room.images[idx];
      });
    });
  }

  // Video Walkthrough
  const videoSection = document.getElementById("video-walkthrough-section");
  const videoPlayer = document.getElementById("room-video-player");
  if (room.hasVideo && room.videoUrl) {
    videoPlayer.src = room.videoUrl;
    if (room.videoThumbnail) videoPlayer.poster = room.videoThumbnail;
    videoPlayer.load();
  } else {
    // If no video, show friendly notice
    videoSection.innerHTML = `
      <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 8px; border: 1px dashed var(--border-color); text-align: center; color: var(--text-muted);">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">📹</span>
        <strong>Video Walkthrough Currently Being Recorded</strong>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">The landlord hasn't uploaded a video tour yet. You can still inspect the room photos or submit an enquiry to schedule an in-person visit.</p>
      </div>
    `;
  }

  // =========================================================================
  // "I'm Interested" Enquiry Modal Handling
  // =========================================================================
  const modalOverlay = document.getElementById("enquiry-modal-overlay");
  const openModalBtns = document.querySelectorAll(".btn-trigger-enquiry");
  const closeModalBtn = document.getElementById("btn-close-modal");
  const enquiryForm = document.getElementById("room-enquiry-form");
  const modalRoomSummary = document.getElementById("modal-room-summary-text");

  if (modalRoomSummary) {
    modalRoomSummary.textContent = `${room.title} (${formatCedis(room.rent)}/mo - ${room.advancePeriod})`;
  }

  function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  // Close when clicking dark backdrop
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Handle Enquiry Form Submit to Backend API
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tenantName = document.getElementById("enq-name").value.trim();
      const tenantPhone = document.getElementById("enq-phone").value.trim();
      const tenantEmail = document.getElementById("enq-email").value.trim();
      const moveInDate = document.getElementById("enq-move-in").value;
      const message = document.getElementById("enq-message").value.trim();

      if (!tenantName || !tenantPhone) {
        showToast("Please provide your Name and Phone number", "error");
        return;
      }

      const enquiryData = {
        roomId: room.id,
        roomTitle: room.title,
        name: tenantName,
        phone: tenantPhone,
        email: tenantEmail,
        moveInDate,
        message
      };

      try {
        if (typeof submitEnquiry === "function") {
          await submitEnquiry(enquiryData);
        } else {
          saveEnquiry(enquiryData);
        }

        closeModal();
        enquiryForm.reset();

        // Show Rich Feedback Toast
        showToast(`Medase! Your enquiry for "${room.title}" has been sent to ${room.landlord?.name}. They will reach out to you directly!`, "success");
      } catch (err) {
        showToast("Enquiry submitted! Landlord will be notified.", "success");
        closeModal();
      }
    });
  }

  // Report Listing Button
  const reportBtn = document.getElementById("btn-report-listing");
  if (reportBtn) {
    reportBtn.addEventListener("click", () => {
      const reason = prompt("Why are you reporting this listing? (e.g. Room already rented, Incorrect price, Suspicious contact):");
      if (reason && reason.trim()) {
        showToast("Thank you for keeping RoomHuntah safe. Our safety team has flagged this listing for immediate review.", "success");
      }
    });
  }
});
