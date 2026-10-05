/**
 * RoomHuntah — Shared Frontend Utilities
 * 
 * Includes mobile menu controls, currency formatting, toast notifications,
 * and reusable room card rendering.
 */

// Format Ghanaian Cedis
function formatCedis(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "GH₵ 0";
  return `GH₵ ${Number(amount).toLocaleString('en-US')}`;
}

// Global Toast Notification Helper
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "✓" : (type === "error" ? "✕" : "ℹ");
  toast.innerHTML = `<span style="font-size: 1.1rem; font-weight: 800;">${icon}</span><span>${message}</span>`;
  
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Generate reusable Room Card HTML markup
function renderRoomCard(room) {
  const isFav = typeof isFavourite === "function" ? isFavourite(room.id) : false;
  const mainImage = (room.images && room.images.length > 0) 
    ? room.images[0] 
    : "";

  const facilitiesMarkup = (room.facilities || []).slice(0, 3).map(f => {
    return `<span class="facility-chip">✓ ${f}</span>`;
  }).join("");

  const advanceBadge = room.advancePeriod 
    ? `<span class="badge badge-advance">${room.advancePeriod}</span>` 
    : '';

  const unfurnishedBadge = `<span class="badge badge-unfurnished">🈳 Empty Room</span>`;

  const videoBadge = room.hasVideo 
    ? `<span class="badge badge-video">📹 Video Tour</span>` 
    : '';

  const verifiedBadge = room.isVerified 
    ? `<span class="badge badge-verified">✓ Verified Room</span>` 
    : '';

  return `
    <article class="room-card" data-room-id="${room.id}">
      <div class="room-card-media">
        <a href="room-details.html?id=${room.id}" style="display: block; width: 100%; height: 100%;">
          ${mainImage ? `<img src="${mainImage}" alt="${room.title}" loading="lazy" onerror="this.onerror=null;this.src='images/empty-single-room.jpg';">` : `<div class="room-media-missing">Photos coming soon</div>`}
        </a>
        
        <div class="room-badge-stack">
          ${verifiedBadge}
          ${unfurnishedBadge}
          ${videoBadge}
          ${advanceBadge}
        </div>

        <button class="btn-fav ${isFav ? 'active' : ''}" onclick="handleFavClick(event, '${room.id}')" title="Save Room" aria-label="Save Room">
          ♥
        </button>
      </div>

      <div class="room-card-body">
        <div class="room-card-price-row">
          <div class="room-price">${formatCedis(room.rent)}<span class="room-price-term"> / month</span></div>
        </div>

        <h3 class="room-title">
          <a href="room-details.html?id=${room.id}">${room.title}</a>
        </h3>

        <div class="room-location">
          <span>📍</span>
          <span>${room.neighborhood || room.city}, ${room.region}</span>
        </div>

        <div class="room-facilities-preview">
          ${facilitiesMarkup}
        </div>

        <div class="room-card-footer">
          <div class="landlord-meta">
            <div class="landlord-avatar">${(room.landlord?.name || 'L').charAt(0)}</div>
            <span>${room.landlord?.name || 'Direct Landlord'}</span>
          </div>

          <a href="room-details.html?id=${room.id}" class="btn btn-sm btn-primary">
            View Details &rarr;
          </a>
        </div>
      </div>
    </article>
  `;
}

// Handle clicking favorite heart icon
function handleFavClick(e, roomId) {
  e.preventDefault();
  e.stopPropagation();
  if (typeof toggleFavourite === "function") {
    const isNowFav = toggleFavourite(roomId);
    const btn = e.currentTarget;
    if (isNowFav) {
      btn.classList.add("active");
      showToast("Room saved to your favourites!", "success");
    } else {
      btn.classList.remove("active");
      showToast("Removed from favourites", "info");
    }
  }
}

// Initialize Navigation & Common Listeners
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav-drawer");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      mobileNav.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        menuToggle.classList.remove("open");
        mobileNav.classList.remove("open");
      }
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // 3. Highlight Current Active Nav Link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});
