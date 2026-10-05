# 🏠 RoomHuntah — Ghana Room Rental Platform

> **"Your house hunt, without the unnecessary walking."**

RoomHuntah is a digital platform designed specifically for Ghana to eliminate the stressful, costly physical house-hunting experience and middleman agent fees. Renters can inspect authentic photos, watch room walkthrough videos, verify self-prepaid ECG meter status, and submit enquiries directly to landlords.

---

## 📁 Phase 1 Project Structure

Here is how your project files are organized:

```text
roomhuntah/
├── index.html              # Homepage: Hero search, benefits, problem vs solution table, featured rooms
├── rooms.html              # Find a Room: Search bar, multi-criteria filters, price slider, sorting, room cards
├── room-details.html       # Room Details: Photo gallery switcher, video walkthrough player, specs, "I'm Interested" modal
├── rent.html               # Compatibility redirect pointing to room-details.html
├── post-room.html          # Post a Room: Landlord multi-step form wizard with instant live preview
├── how-it-works.html       # How It Works: Guides for renters & landlords, Ghanaian safety rules
├── about.html              # About Us: Mission, brand story, Ghanaian problem-solution context
├── .gitignore              # Prevents tracking temporary files, node_modules, and secrets in Git
│
├── css/
│   └── style.css           # Master stylesheet: Ghanaian green & gold palette, responsive layout, cards, modals
│
├── js/
│   ├── data.js             # 100% Kumasi-based empty/unfurnished room listings with real media & localStorage logic
│   ├── common.js           # Shared utilities (mobile hamburger drawer, toast alerts, currency formatters)
│   ├── rooms.js            # Live search, filtering, and sorting logic for rooms.html
│   ├── room-details.js     # Room details loader, photo gallery, video player, and enquiry submission handler
│   └── post-room.js        # Multi-step landlord wizard, live card preview, and room publishing handler
│
├── images/                 # Authentic Ghanaian empty-room photographs (chamber & hall, single room, bath, kitchen)
├── videos/                 # Local video walkthrough tours for instant offline/online playback
│
└── README.md               # Beginner guide and documentation (this file)
```

---

## 🚀 How to Run and Test (Phase 1)

Because Phase 1 uses **pure HTML, CSS, and Vanilla JavaScript**, you **do not need Node.js or npm installed** to run this version!

### Method 1: Open in Any Web Browser (Easiest)
1. Open File Explorer on Windows.
2. Navigate to: `c:\Users\HP\OneDrive\Desktop\roomhuntah`
3. Double-click on `index.html`.
4. It will open directly in Google Chrome, Microsoft Edge, or your default browser!

### Method 2: Open in VS Code with "Live Server" (Recommended for Learning)
1. Open **VS Code**.
2. Click **File** > **Open Folder...**
3. Select the folder: `c:\Users\HP\OneDrive\Desktop\roomhuntah`
4. In VS Code, install the extension named **"Live Server"** (by Ritwick Dey).
5. Right-click on `index.html` in the file explorer sidebar on the left and select **"Open with Live Server"**.
6. Your browser will open at `http://127.0.0.1:5500/index.html`. Any edits you make to HTML/CSS will automatically refresh in real-time!

---

## 🧪 Phase 1 Testing Checklist

Try these interactive tests to verify everything works properly:

1. **Homepage Search Flow**:
   - Go to `index.html`.
   - In the search box, type "Kumasi" or select "Chamber & Hall Self-Contained", then click **"Find Room 🔍"**.
   - Notice how it transfers your search directly to `rooms.html` and pre-filters the listings!

2. **Find a Room Multi-Filters (`rooms.html`)**:
   - Move the **Maximum Monthly Rent** slider to test price filtering.
   - Check the **"⚡ Self ECG Meter"** checkbox to see only rooms with dedicated meters.
   - Change **Sort by** to "Price: Low to High".
   - Click **"Reset All"** to restore default listings.

3. **Room Details & Enquiry Flow (`room-details.html`)**:
   - Click on any room card to open its details page.
   - Click the photo thumbnails to switch the active gallery image.
   - Press play on the **Room Walkthrough Video** player.
   - Click the **"👉 I'm Interested / Select This Room"** button.
   - Fill in your name, phone number, and move-in date, then click **"Submit My Enquiry"**.
   - Notice the green confirmation toast notification! Your enquiry is safely stored in your browser's `localStorage`.

4. **Landlord "Post a Room" Wizard (`post-room.html`)**:
   - Navigate to `post-room.html`.
   - Start typing a room title and monthly rent in Step 1.
   - Look at the right side of the screen: the **Live Renter View Preview** updates in real-time!
   - Select photos using the upload dropzone to preview them.
   - Click through the steps and click **"Publish Room Listing 🚀"**.
   - You will automatically be redirected to `rooms.html`, and your newly created room will now appear right at the top of the search results!

5. **Mobile Responsiveness**:
   - Press `F12` in your browser and toggle the mobile device toolbar (or shrink your browser window).
   - Test the hamburger menu button in the top right to verify the slide-out menu drawer opens and closes smoothly.

---

## 🇬🇭 Key Features Tailored for Ghana

- **Ghana Cedis (`GH₵`) Pricing**: Shows monthly rent alongside the advance period (e.g. 1 Year Advance or 2 Years Advance).
- **Essential Ghanaian Facilities**: Flags whether a room has a separate ECG prepaid meter, poly tank / running water backup, gated compound, and private W/C.
- **Renter Safety First**: Warnings on every page reminding users to never send Mobile Money (MoMo) before physically inspecting the room and verifying the property owner.
- **Zero Agent Fees**: Direct connection between renters and landlords.
