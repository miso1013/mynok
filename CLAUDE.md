# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**마이노크 (MyNok)** is a Korean-language social connection and memory-sharing mobile web application designed for exhibition display. Built with vanilla JavaScript, HTML, and CSS, it's a multi-page application optimized for mobile viewing (393px width, targeting iPhone 14 Pro dimensions).

## Development Commands

This is a static HTML/CSS/JS application with **no build process**.

**Run locally from mynok root (required for image paths):**
```bash
cd "C:\Users\라포랩스\Desktop\mynok"
python -m http.server 8000 --bind 0.0.0.0
# Navigate to http://localhost:8000/1_main/00_loading.html
```

**For external access (different Wi-Fi networks):**
```bash
# Start ngrok tunnel
ngrok http 8000
# Access via generated URL: https://[random].ngrok-free.dev/1_main/00_loading.html
```

**No build, lint, or test commands** - this is vanilla web with no toolchain.

## Architecture Overview

### Technology Stack
- **Pure vanilla JavaScript** (~8,200+ lines) - No frameworks
- **HTML5** - 28 separate page files
- **CSS3** (~7,700+ lines) - Single shared stylesheet
- **localStorage** - All data persistence (no backend)
- **Pretendard font** - Via jsDelivr CDN
- **PWA enabled** - Service Worker with offline caching

### File Structure
```
mynok/
├── manifest.json          # PWA manifest
├── service-worker.js      # Offline caching (cache: mynok-v3)
├── 1_main/
│   ├── 00_*.html          # Authentication flow (loading, login, join)
│   ├── 01_*.html          # Core pages (main, mypage, list_edit)
│   ├── 02_*.html          # Memory pages (memory, groupmemory)
│   ├── 03_*.html          # Content pages (letter, photo, calendar, groupletter, groupphoto)
│   ├── 04_*.html          # Feature pages (voice, placephoto, groupvoice, groupplacephoto)
│   ├── 05_*.html          # E-commerce (gift)
│   ├── *.html             # Supporting pages (peopleplus, new_group, letter_write, calendar_plus, etc.)
│   ├── script.js          # ALL JavaScript (shared across pages)
│   └── styles.css         # ALL styles (shared across pages)
└── img/
    ├── keyring/           # Product detail images
    ├── miso/              # User profile images
    ├── kanghoon/          # Connection profile images
    ├── seewer/            # Pet images
    ├── 00_로고.png         # App logo (192x192)
    ├── 마이노크 홈 아이콘_on.png  # App icon (512x512)
    ├── 소리가 있어 아이콘_00.png  # Voice memory icon
    ├── 사진이 있어 아이콘_00.png  # Photo memory icon
    ├── 문장이 있어 아이콘_00.png  # Letter memory icon
    └── [other UI icons]
```

### Core Design Pattern

**Monolithic Shared Resources:**
- Single `script.js` file handles ALL pages (~8,200+ lines)
- Single `styles.css` file styles ALL pages (~7,700+ lines)
- Event handlers use element existence checks to avoid errors:

```javascript
// Pattern used throughout script.js
const element = document.getElementById('elementId');
if (element) {
    element.addEventListener('click', function() {
        // Handler logic
    });
}
```

This allows one script to work safely across 28 different pages without throwing errors.

## PWA Configuration

### Service Worker (service-worker.js)
- **Cache name**: `mynok-v7` (increment for forced updates)
- **Strategy**: Cache-first with network fallback
- **Cached resources**: All HTML pages, script.js, styles.css
- Registration: Auto-registered in script.js on page load

```javascript
// Service Worker registration (script.js)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('[PWA] Service Worker registered'))
        .catch(err => console.error('[PWA] Registration failed:', err));
}
```

### Manifest (manifest.json)
- **Start URL**: `/1_main/00_loading.html`
- **Display**: standalone (hides browser UI)
- **Theme**: #FF9595 (pink)
- **Icons**: 192x192 and 512x512 PNG
- **Orientation**: portrait (locked)

### HTML PWA Meta Tags (all pages)
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#FF9595">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="/img/00_로고.png">
```

## Data Management

### localStorage Architecture

**Primary Keys:**
```javascript
'fontSize'                        // User font preference
'mynokConnections'               // Array of connection objects
'mynokGroups'                    // Array of group objects
'mynokUserProfile'               // User profile data
'mynokCalendarEvents'            // Calendar events
'mynokLetters_{personName}'      // Person-specific letters
'mynokPlacePhotos'               // Location-based photos
'eventNotificationLastShown'     // Last shown date for event notification
```

### Data Structures

**Connection Object:**
```javascript
{
    name: string,              // Required
    birthday: string,          // "1975-05-15" or "정보 없음"
    contact: string,           // "010-1234-5678" or "정보 없음"
    memories: number,          // Memory count
    avatar: string|null,       // Base64 image or path
    connectionType: string,    // 'person' | 'pet' | 'memorial'
    isSharing: boolean         // Sharing status (true = 공유중, false = 간직중)
}
```

**Group Object:**
```javascript
{
    id: string,                // String-based timestamp ID
    name: string,              // Group name
    members: Array<{           // Object array (migrated from string array)
        name: string,
        relation: string,
        profileImage: string
    }>,
    memoryKeeper: string,      // Keeper name
    createdAt: string          // ISO timestamp
}
```

**Letter Object:**
```javascript
{
    id: number,
    type: 'sent' | 'received',
    recipient: string,
    date: string,              // "2025.03.15"
    title: string,
    content: string,
    pattern: string,           // 'hearts' | 'plain-pink' | 'dots' | 'stripes' | 'flowers' | 'waves'
    photos: string[],          // Base64 encoded images
    createdAt: string          // ISO timestamp
}
```

**Calendar Event Object:**
```javascript
{
    id: number,
    title: string,
    date: string,              // "2025-01-15" (start date)
    endDate: string,           // "2025-01-15" (end date)
    content: string,
    repeatType: string,        // 'none' | 'daily' | 'monthly' | 'weekly' | 'yearly' | 'custom'
    alarmTime: number,         // Minutes before event (0 = no alarm)
    shareMethod: string,       // 'select' | 'private' | 'all'
    sharedWith: string[],      // Array of connection names (if shareMethod is 'select')
    createdAt: string          // ISO timestamp
}
```

### Data Migration Pattern

The codebase includes automatic migration logic (script.js ~line 303-467):
- Converts numeric group IDs to strings
- Migrates string member arrays to object arrays
- Updates profile images from localStorage
- Maintains backward compatibility

**Auto-update Logic:**
```javascript
// Runs on page load for connections
const connections = getConnections();
let updated = false;

// Example: Update specific connection
const kanghoon = connections.find(conn => conn.name === '강훈');
if (kanghoon) {
    if (kanghoon.avatar !== '../img/kanghoon/2024.12.30_강훈2.jpg') {
        kanghoon.avatar = '../img/kanghoon/2024.12.30_강훈2.jpg';
        updated = true;
    }
    if (kanghoon.isSharing !== true) {
        kanghoon.isSharing = true;
        updated = true;
    }
}

if (updated) {
    localStorage.setItem('mynokConnections', JSON.stringify(connections));
}
```

## Navigation Flow

### Entry Point
```
00_loading.html → 00_login.html → 00_join.html → 01_main.html
```

### Main Hub (01_main.html)
The central dashboard with two tabs:

**Tab 1: 소중한 인연 (Connections)**
```
[+ 인연 추가하기] → peopleplus.html
[📖 추억 노크하기] → 02_memory.html?name={name}
    └─ [소리가 있어/사진이 있어/문장이 있어] → Respective pages
        └─ [문장이 있어] → 03_letter.html?name={name}
            ├─ [+ 편지 쓰기] → letter_write.html?name={name}
            └─ [편지 보기] → Opens letter view modal
```

**Tab 2: 소중한 그룹 인연 (Groups)**
```
[+ 새 그룹 만들기] → new_group.html
[📖 추억 노크하기] → 02_groupmemory.html?groupId={id}
```

### URL Parameter Communication
Pages pass data via query strings:
- `02_memory.html?name=강훈` - Memory page for person
- `02_groupmemory.html?groupId=1699876543210` - Group memory
- `03_letter.html?name=강훈` - Letters for person
- `letter_write.html?name=강훈` - Write letter to person
- `peopleplus.html?mode=edit&index=2` - Edit connection
- `edit_group.html?id=1699876543210` - Edit group
- `calendar_plus.html?eventId=123` - Edit event
- `calendar_plus.html?date=2025-01-15` - Add event with pre-filled date

## Key Functions Reference

### Connection Management (script.js)
- `getConnections()` - Retrieves from localStorage, initializes defaults
- `renderConnections()` - Generates connection list DOM
- `addNewConnection(data)` - Adds to localStorage
- `initializeSampleData()` - Sets up default connections/groups

### Group Management (script.js)
- `renderGroups()` - Renders group cards
- `renderMemberSelectionList(query)` - Member search/selection
- `toggleMemberSelection(name, isSelected)` - Member selection with validation
  - **Blocks pets/memorial/no-contact** from groups
  - Shows alert explaining restrictions
- `updateSelectedMembersDisplay()` - Updates member tag UI
- `updateMemoryKeeperDropdown()` - Syncs dropdown with members

### Memory Page (02_memory.html, 02_groupmemory.html)
- Dynamic rendering from URL: `?name={connectionName}` or `?groupId={id}`
- Share toggle: 공유중 ↔ 간직중
  - **Auto-disabled for pets/memorial/no-contact**
  - Modal confirmation when disabling sharing
  - Saves `isSharing` property to localStorage
- **Red-dot notification system**: Shows update indicators on memory type icons
  - Only displays when `isSharing === true` (공유중)
  - 40% random probability per icon
  - Pulse animation with gradient background
  - Auto-clears on icon click

### Letter System (03_letter.html, letter_write.html)
- `getLetters()` - Retrieves person-specific letters
- `renderLetters(type, query)` - Filters and displays letters
- `openLetterModal(letterId)` - Opens letter view modal with pattern
  - **6 letter patterns**: hearts, plain-pink, dots, stripes, flowers, waves
  - Uses saved pattern if available, otherwise randomizes
  - Displays title, recipient, date, content, and photos
- Person-specific storage: `mynokLetters_{personName}`
- Photo upload via FileReader API (base64 encoding)

### Calendar System (03_calendar.html, calendar_plus.html)
- `getEvents()` - Retrieves calendar events from localStorage
- `renderCalendar(year, month)` - Generates calendar grid
- `renderMonthlyEvents(year, month, selectedDate)` - Displays events
- Event creation/editing with date range, repeat, alarm, sharing
- **Korean alphabetical sorting**: Using `localeCompare('ko-KR')`

### Font Accessibility (script.js)
- `applyFontSize(fontClass)` - Applies and saves font preference
- 4 levels: font-small (12px), font-medium (14px), font-large (16px), font-xlarge (18px)

## Styling Conventions

### CSS Architecture
- **Monolithic**: All ~7,700+ lines in one file
- **No preprocessors**: Pure CSS3
- **Class-based**: BEM-like naming patterns
- **Mobile-first**: 393px fixed width, responsive height

### Color Palette
```css
/* Primary pink/coral theme */
--primary: #FF7474
--light-pink: #FFB4B6
--accent-coral: #FF8A8A
--pink-gradient: linear-gradient(135deg, #FF9595 0%, #FFB4B6 100%)

/* Supporting colors */
--header-text: #333333      /* Darker for headers */
--body-text: #5D5D5D        /* Lighter for body text */
--gray: #666, #999
--light-bg: #f5f5f5, #f0f0f0
--borders: #e0e0e0, #ddd, rgba(255, 149, 149, 0.3)
```

### Key CSS Patterns

**Fixed Bottom Navigation (adjusted for iOS):**
```css
.bottom-nav {
    position: fixed;
    bottom: 12px;          /* Raised from 0 for better mobile display */
    left: 50%;
    transform: translateX(-50%);
    max-width: 393px;
    z-index: 1000;         /* High z-index to prevent content showing through */
    padding-bottom: 24px;
}

.bottom-nav::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 12px;
    background-color: white;  /* Extends background below nav */
}
```

**Headers with iPhone Safe Area:**
```css
.header {
    padding-top: calc(16px + env(safe-area-inset-top));  /* Status bar clearance */
}

.memory-header {
    padding-top: env(safe-area-inset-top);
}
```

**Red-dot Notification Indicator:**
```css
.red-dot {
    position: absolute;
    top: 0;
    right: 2px;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #FF4444 0%, #FF7474 100%);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(255, 68, 68, 0.5);
    display: none;
    animation: pulse-dot 2s infinite;
}

.red-dot.active {
    display: block;
}

@keyframes pulse-dot {
    0%, 100% {
        box-shadow: 0 2px 8px rgba(255, 68, 68, 0.5),
                    0 0 0 0 rgba(255, 68, 68, 0);
    }
    50% {
        box-shadow: 0 2px 8px rgba(255, 68, 68, 0.5),
                    0 0 0 4px rgba(255, 68, 68, 0);
    }
}
```

**Memory Type Icons (no background box):**
```css
.memory-type-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* No background - uses PNG images directly */
}

.memory-type-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
```

**Group Profile Display (4분할 Grid):**
```css
.group-profile-images.has-members {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    width: 100px;
    height: 100px;
}

.group-member-profile {
    width: 100%;
    height: 48px;
    border-radius: 6px;
    object-fit: cover;
}

/* Mini version for photo pages */
.group-profile-mini.has-members {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    width: 95px;
    height: 95px;
}
```

**Feature Card Icons:**
```css
.feature-icon-img {
    width: 90px;
    height: 90px;
    object-fit: contain;
}

/* Different positioning per icon type */
.feature-icon-img[alt="캘린더"] {
    margin-top: 0;
}

.feature-icon-img[alt="장소별 추억"] {
    margin-top: -20px;
}
```

**Connection Type Icons (peopleplus.html):**
```css
.type-icon-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
}
```

**State Management Classes:**
```css
.active          /* Active tabs, buttons, modals, red-dots */
.selected        /* Selected items (patterns, members) */
.disabled        /* Disabled toggles/buttons */
.collapsed       /* Collapsed accordions/sections */
.has-members     /* Triggers 4분할 grid layout for group profiles */
```

## Special Business Logic

### Connection Type Restrictions
**Three types with different capabilities:**

1. **'person'** (일반 인연):
   - Can be added to groups (if has contact)
   - Can toggle sharing (공유중 ↔ 간직중)
   - Can receive letters
   - **Red-dot shows only when `isSharing === true`**

2. **'pet'** (반려동물):
   - **Cannot** be added to groups
   - **Cannot** toggle sharing (always 간직중)
   - Can receive letters (stored locally)
   - **No red-dot** (always 간직중)

3. **'memorial'** (추모 인연):
   - **Cannot** be added to groups
   - **Cannot** toggle sharing (always 간직중)
   - Can receive letters (stored locally)
   - **No red-dot** (always 간직중)

### Red-dot Notification Logic
Shows update indicators on memory type cards (script.js ~line 3179-3226):
```javascript
function showRandomRedDots() {
    // Individual memory page: Check isSharing status
    if (window.location.pathname.includes('02_memory.html')) {
        const personName = new URLSearchParams(window.location.search).get('name');
        const connections = getConnections();
        const person = connections.find(conn => conn.name === personName);

        // Only show red-dot if sharing (공유중)
        if (person && person.isSharing === true) {
            [voiceDot, photoDot, letterDot].forEach(dot => {
                if (dot && Math.random() < 0.4) {  // 40% probability
                    dot.classList.add('active');
                }
            });
        }
    }

    // Group memory page: Always show (groups are always shared)
    if (window.location.pathname.includes('02_groupmemory.html')) {
        [groupVoiceDot, groupPhotoDot, groupLetterDot].forEach(dot => {
            if (dot && Math.random() < 0.4) {
                dot.classList.add('active');
            }
        });
    }
}

// Auto-remove red-dot on click
item.addEventListener('click', function() {
    const dot = item.querySelector('.red-dot');
    if (dot) dot.classList.remove('active');
    // Navigate to page...
});
```

### Memory Sharing Logic
On memory page (02_memory.html):
- Auto-disable toggle for pet/memorial/no-contact
- Show tooltip explaining why sharing is disabled
- Confirmation modal when switching from 공유중 to 간직중
- Saves `isSharing` property to connection in localStorage
- Red-dot only appears when `isSharing === true`

### Group Member Validation
When selecting members for groups (script.js):
```javascript
// Block conditions
if (connectionType === 'pet' || connectionType === 'memorial' || contact === '정보 없음') {
    alert('반려동물, 추모 인연 또는 연락처가 없는 인연은 그룹에 추가할 수 없습니다.');
    checkbox.checked = false;
    return;
}
```

## Working with This Codebase

### When Adding New Pages
1. Create HTML file (follow naming convention: 00_/01_/02_/03_/04_/05_prefix)
2. Include `<link rel="stylesheet" href="styles.css">`
3. Include PWA meta tags (manifest, theme-color, apple-touch-icon)
4. Include `<script src="script.js"></script>` before `</body>`
5. Add page-specific handlers in script.js with existence checks
6. Ensure 393px width + bottom navigation at `bottom: 12px`
7. Use URL parameters for context (person name, group ID, edit mode)
8. **Update service-worker.js** to cache the new page
9. **Increment CACHE_NAME** in service-worker.js (e.g., v3 → v4)

### When Modifying Existing Pages
1. **HTML changes**: Edit specific HTML file
2. **Style changes**: Edit styles.css (affects ALL pages globally)
3. **Logic changes**: Edit script.js (wrap in existence checks)
4. **Navigation changes**: Update `window.location.href` calls
5. **Cache updates**: Increment service-worker.js CACHE_NAME for forced refresh

### Common Development Patterns

**localStorage operations:**
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key') || '[]');

// Delete from array (reverse order)
const indices = [3, 1, 5].sort((a, b) => b - a);
indices.forEach(i => array.splice(i, 1));
```

**URL parameters:**
```javascript
// Read
const params = new URLSearchParams(window.location.search);
const name = params.get('name');

// Navigate with params
window.location.href = `page.html?name=${encodeURIComponent(name)}`;
```

**Dynamic DOM rendering:**
```javascript
// Pattern used throughout
const container = document.getElementById('container');
if (container) {
    container.innerHTML = '';  // Clear
    items.forEach(item => {
        const element = document.createElement('div');
        element.className = 'item-class';
        element.textContent = item.name;
        container.appendChild(element);
    });
}
```

**Korean alphabetical sorting:**
```javascript
const sortedConnections = connections.sort((a, b) =>
    a.name.localeCompare(b.name, 'ko-KR')
);
```

## Important Notes

- **No backend**: All data is client-side localStorage only (~5MB limit)
- **Korean-only**: No internationalization
- **Mobile-only**: Not responsive beyond 393px viewport
- **No build process**: Direct file editing, no compilation
- **Server from root**: Must run HTTP server from mynok root, not 1_main folder
- **Shared resources**: Changes to styles.css or script.js affect ALL pages
- **URL parameters**: Primary method for page-to-page data passing
- **Modal confirmations**: Used for destructive actions
- **Font accessibility**: 4-level system for vision-impaired users
- **Exhibition context**: Designed for display at graduation exhibition
- **PWA ready**: Installable, offline-capable, mobile-optimized
- **Image icons**: All UI icons use PNG images, not emojis (memory types, calendar, location, connection types)
- **Bottom nav spacing**: Fixed at `bottom: 12px` for better iOS display
- **iPhone 14 Pro safe area**: Headers use `env(safe-area-inset-top)` for status bar clearance
- **Group profile grid**: Both memory and photo pages use 2x2 grid layout (max 4 members)

## Recent Additions (Latest First)

### Connection Type Icon Replacement (Latest - v7)
- Replaced emoji icons in peopleplus.html with PNG images:
  - 👤 → `마이노크 마이페이지 아이콘_on.png` (일반 인연)
  - 🐾 → `마이노크 하트 아이콘_on.png` (반려동물)
- Consistent image-based UI throughout app
- 28x28px icons with proper styling

### Group Photo Profile Grid (v7)
- Changed 03_groupphoto.html profile display from overlapped circles to 4분할 grid
- Matches 02_groupmemory.html layout pattern
- Displays up to 4 members in 2x2 grid (95x95px)
- Uses same logic as group memory page for consistency

### Text Color Standardization (v6)
- Header text: `#333333` (darker for better readability)
- Body text: `#5D5D5D` (lighter, softer)
- Batch replaced 89 occurrences across styles.css

### iPhone 14 Pro Safe Area Support (v6)
- Added `env(safe-area-inset-top)` to all headers
- Status bar area properly accounted for
- Prevents content overlap with notch/status bar

### Navigation Bar Scroll Fix (v6)
- Increased z-index to 1000
- Added padding-bottom: 24px
- Extended white background 12px below nav with ::after pseudo-element
- Prevents content showing through during scroll

### Icon Positioning System (v5-v6)
- Calendar and location icons replaced emojis in memory feature cards
- 90px icons with specific positioning:
  - 캘린더 아이콘: margin-top: 0
  - 장소별 추억 아이콘: margin-top: -20px
- Fixed 150px card height with flexbox layout

### Red-dot Notification System (v5)
- **Visual indicator** for new updates on memory type cards
- Appears only when `isSharing === true` (공유중) for individual connections
- Always appears for group memories (groups are inherently shared)
- 40% random probability per icon on page load
- Gradient red dot with pulse animation (no white border)
- Auto-removes on click
- Positioned at `top: 0, right: 2px` of icon container
- Implementation: script.js ~line 3179-3226, styles.css ~line 1906-1938

### Memory Type Icon Redesign (v4)
- Removed background gradient boxes
- Direct PNG image display: 소리가 있어 아이콘_00.png, 사진이 있어 아이콘_00.png, 문장이 있어 아이콘_00.png
- Cleaner, more professional appearance
- 80x80px container with `object-fit: contain`

### Bottom Navigation Adjustment (v4)
- Raised from `bottom: 0` to `bottom: 12px`
- Better alignment with iOS safe area
- Prevents overlap with device UI

### PWA Implementation (v3)
- Complete Progressive Web App setup
- Service Worker with cache-first strategy
- manifest.json with app metadata
- Offline capability for all pages
- iOS home screen installation support
- Current cache version: mynok-v7

### Event Notification Modal (01_main.html)
- Auto-displays on main page
- Styled with pink gradient matching other buttons
- Shows graduation exhibition announcement with clover emoji 🍀
- localStorage tracking to show once per day

### Letter View Modal (03_letter.html)
- Opens when "편지 보기" button clicked
- 6 semi-transparent patterns for readability
- Shows title, recipient, date, content, and photos
- Close via X button or background click

### Calendar System (03_calendar.html, calendar_plus.html)
- Full calendar grid with month/year navigation
- Event creation/editing with date range, repeat, alarm
- Share methods: 선택공유, 비공개, 전체보기
- Member selection for shared events
- Filter dropdown with Korean alphabetical sorting

### Gift Section Redesign
- Consistent across main, memory, and group memory pages
- Horizontal flex layout: icons left, text/button right
- Gradient background with semi-transparent pink
- Product icons: 오디오 키링, 디스플레이 액자

### Toggle Switch Enhancement
- Active state uses pink gradient
- Inner shadow for depth
- Matches overall app aesthetic
- Used for sharing status on memory pages
