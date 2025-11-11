# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**마이노크 (MyNok)** is a Korean-language social connection and memory-sharing mobile web application. Built with vanilla JavaScript, HTML, and CSS, it's a multi-page application optimized for mobile viewing (393px width, targeting iPhone 14 Pro dimensions).

## Development Commands

This is a static HTML/CSS/JS application with **no build process**.

**Run locally:**
```bash
cd "C:\Users\라포랩스\Desktop\mynok\1_main"
python -m http.server 8000
# Navigate to http://localhost:8000/00_loading.html
```

**No build, lint, or test commands** - this is vanilla web with no toolchain.

## Architecture Overview

### Technology Stack
- **Pure vanilla JavaScript** (8,218 lines) - No frameworks
- **HTML5** - 27 separate page files
- **CSS3** (7,692 lines) - Single shared stylesheet
- **localStorage** - All data persistence (no backend)
- **Pretendard font** - Via jsDelivr CDN

### File Structure
```
1_main/
├── 00_*.html          # Authentication flow (loading, login, join)
├── 01_*.html          # Core pages (main, mypage, list_edit)
├── 02_*.html          # Memory pages (memory, groupmemory)
├── 03_*.html          # Content pages (letter, photo, calendar, groupletter, groupphoto)
├── 04_*.html          # Feature pages (voice, placephoto, groupvoice, groupplacephoto)
├── 05_*.html          # E-commerce (gift)
├── *.html             # Supporting pages (peopleplus, new_group, letter_write, etc.)
├── script.js          # ALL JavaScript (shared across pages)
├── styles.css         # ALL styles (shared across pages)
└── z_claude_md.md     # Legacy documentation

img/
├── keyring/           # Product detail images
├── miso/              # User profile images (할머니, 아빠, 엄마, etc.)
├── kanghoon/          # Connection profile images
├── seewer/            # Pet images
└── *.png              # App icons and UI elements
```

### Core Design Pattern

**Monolithic Shared Resources:**
- Single `script.js` file handles ALL pages (8,218 lines)
- Single `styles.css` file styles ALL pages (7,692 lines)
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

This allows one script to work safely across 27 different pages without throwing errors.

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
    └─ [문장이 있어] → 03_letter.html?name={name}
        ├─ [+ 편지 쓰기] → letter_write.html?name={name}
        └─ [편지 보기] → Opens letter view modal (implemented)
```

**Tab 2: 소중한 그룹 인연 (Groups)**
```
[+ 새 그룹 만들기] → new_group.html
[📖 추억 노크하기] → 02_groupmemory.html?groupId={id}
```

### Calendar Flow
```
03_calendar.html
    ├─ [+ FAB button] → calendar_plus.html
    ├─ [Event card click] → calendar_plus.html?eventId={id} (edit mode)
    └─ [Date click] → calendar_plus.html?date={date} (pre-filled date)
```

### Settings Flow
```
01_mypage.html
    └─ [추억 인연 수정하기] → 01_list_edit.html
        ├─ [수정] → peopleplus.html?mode=edit&index={i}
        │          edit_group.html?id={groupId}
        └─ [삭제] → Confirmation → localStorage update
```

### E-commerce Flow
```
05_gift.html
    ├─ [NFC 키링 선물하러 가기] → keyring.html
    └─ [액자 선물하러 가기] → frame.html
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

### Memory Page (02_memory.html)
- Dynamic rendering from URL: `?name={connectionName}`
- Share toggle: 공유중 ↔ 간직중
  - **Auto-disabled for pets/memorial/no-contact**
  - Modal confirmation when disabling sharing
  - Saves `isSharing` property to localStorage
- Gift card section with product recommendations

### Letter System (03_letter.html, letter_write.html)
- `getLetters()` - Retrieves person-specific letters
- `renderLetters(type, query)` - Filters and displays letters
- `openLetterModal(letterId)` - Opens letter view modal with random pattern
  - **6 letter patterns**: hearts, plain-pink, dots, stripes, flowers, waves
  - Uses saved pattern if available, otherwise randomizes
  - Displays title, recipient, date, content, and photos
- Person-specific storage: `mynokLetters_{personName}`
- Pattern selection with 6 visual styles
- Photo upload via FileReader API (base64 encoding)
- Form validation: recipient, title, content required

### Calendar System (03_calendar.html, calendar_plus.html)
- `getEvents()` - Retrieves calendar events from localStorage
- `renderCalendar(year, month)` - Generates calendar grid for specific month
- `renderMonthlyEvents(year, month, selectedDate)` - Displays events for month/date
- `filterEventsByDate(date)` - Filters events for specific date
- Event creation/editing with:
  - Date range selection (start/end dates)
  - Repeat settings (none, daily, weekly, monthly, yearly, custom)
  - Alarm settings (5분 전, 10분 전, 30분 전, 1시간 전, etc.)
  - Share methods: 선택공유 (select), 비공개 (private), 전체보기 (all)
  - Member selection for shared events
- **Navigation icons replaced with images**: 마이노크 캘린더 아이콘_on.png
- **Filter system**: 전체 일정, 비공유 일정, 공유 일정, and by connection
- **Korean alphabetical sorting**: Using `localeCompare('ko-KR')`

### Event Notification Modal (01_main.html)
- **Auto-display on date range**: Shows between Nov 26-30
- **Daily display limit**: Uses localStorage to show once per day
- **Styled as gift button**: Pink gradient with shadow
- Content: "띵동! 오늘은 미소님의 졸업전시회 날이에요!"
- **Test mode**: Currently set to always display (remove date check for testing)

### Font Accessibility (script.js)
- `applyFontSize(fontClass)` - Applies and saves font preference
- 4 levels: font-small (12px), font-medium (14px), font-large (16px), font-xlarge (18px)
- Slider synced with radio buttons in join flow

## Styling Conventions

### CSS Architecture
- **Monolithic**: All 7,692 lines in one file
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
--text: #333, #5D5D5D
--gray: #666, #999
--light-bg: #f5f5f5, #f0f0f0
--borders: #e0e0e0, #ddd, rgba(255, 149, 149, 0.3)
```

### Key CSS Patterns

**Button Styles (Standardized):**
```css
/* Primary action buttons */
.gift-btn, .event-notification-btn {
    background: linear-gradient(135deg, #FF9595 0%, #FFB4B6 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(255, 149, 149, 0.3);
}

/* Toggle switches (active state) */
.toggle-switch.active {
    background: linear-gradient(135deg, #FF9595 0%, #FFB4B6 100%);
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(255, 149, 149, 0.3);
}
```

**Fixed Bottom Navigation:**
```css
.bottom-nav {
    position: fixed;
    bottom: 0;
    max-width: 393px;
    height: 83px;
    z-index: 1000;
}
```

**State Management Classes:**
```css
.active          /* Active tabs, buttons, modals */
.selected        /* Selected items (patterns, members) */
.disabled        /* Disabled toggles/buttons */
.collapsed       /* Collapsed accordions/sections */
```

**Letter Patterns (Semi-transparent for readability):**
```css
.pattern-hearts {
    background-color: #FFFEF9;
    background-image:
        radial-gradient(circle, rgba(255, 215, 0, 0.15) 8%, transparent 8%);
}

.pattern-dots {
    background-color: #FFFBFB;
    background-image: radial-gradient(circle, rgba(255, 149, 149, 0.15) 2px, transparent 2px);
}
/* All patterns use rgba with 0.08-0.3 opacity for text readability */
```

**Gift Section (Consistent across pages):**
```css
.gift-section {
    background: linear-gradient(135deg, rgba(255, 180, 182, 0.08) 0%, rgba(255, 149, 149, 0.12) 100%);
    border: 1px solid rgba(255, 149, 149, 0.25);
    padding: 20px;
    border-radius: 12px;
    display: flex; /* Icons left, text/button right */
}
```

### Calendar-Specific Styles
```css
/* Date picker cards */
.event-date-card {
    border: 1.5px solid #FF9595; /* Pink border, not blue */
}

.event-calendar-icon {
    width: 18px;
    height: 18px;
    object-fit: contain; /* Image icon, not emoji */
}

/* Search wrapper structure */
.event-search-wrapper {
    /* Contains: .event-search-input-container, .event-search-results, .event-selected-members */
}

.event-search-input-container {
    position: relative; /* For absolute positioned icon */
}
```

### Modal Styles
```css
/* Letter view modal */
.letter-view-modal-overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 10000;
}

.letter-view-pattern {
    /* Applies one of 6 pattern classes dynamically */
    padding: 30px 24px;
    border-radius: 12px;
    min-height: 400px;
}

/* Event notification modal */
.event-notification-modal {
    background: linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%);
    border: 2px solid rgba(255, 149, 149, 0.3);
    animation: slideUp 0.4s ease;
}
```

### Component Classes
```css
.connection-item         /* Person/group cards */
.member-tag             /* Group member badges */
.toggle-switch          /* On/off toggles (with inner shadow when active) */
.letter-card            /* Letter preview cards */
.letter-pattern-box     /* Pattern selection */
.calendar-filter-dropdown  /* Calendar filter menu (z-index: 1000) */
.event-notification-icon   /* Clover emoji with bounce animation */
```

## Important Patterns & Conventions

### Form Validation
**Add/Edit Connection (peopleplus.html):**
- Name required
- Birthday/contact optional (use "모르겠어요" checkbox)
- Empty optionals save as "정보 없음"
- Connection type affects sharing capabilities

**Group Creation (new_group.html):**
- Group name required
- Member selection with search
- Validates member types (blocks pets/memorial/no-contact)
- Memory keeper dropdown auto-updates

**Letter Writing (letter_write.html):**
- Recipient, title, content required
- Pattern selection (1 of 6)
- Up to 4 photos (base64 encoded)
- Auto-saves to person-specific localStorage

**Calendar Event (calendar_plus.html):**
- Title required
- Date range required (start/end)
- Repeat type, alarm time optional
- Share method affects member selection visibility

### Modal System
```javascript
// Show modal
modalOverlay.classList.add('active');

// Hide modal
modalOverlay.classList.remove('active');

// Close on background click
modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});
```

### Tab Switching
```javascript
// Pattern used in 01_main.html, 01_list_edit.html, 03_letter.html
tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from all tabs
        tabButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked tab
        this.classList.add('active');
        // Show corresponding content
        const tabName = this.getAttribute('data-tab');
        // Toggle content visibility
    });
});
```

### Image Upload Pattern
```javascript
// Used in peopleplus.html, letter_write.html
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            // Display preview
            previewImg.src = base64;
            // Store in object
            data.image = base64;
        };
        reader.readAsDataURL(file);
    }
});
```

## Special Business Logic

### Connection Type Restrictions
**Three types with different capabilities:**

1. **'person'** (일반 인연):
   - Can be added to groups (if has contact)
   - Can toggle sharing (공유중 ↔ 간직중)
   - Can receive letters

2. **'pet'** (반려동물):
   - **Cannot** be added to groups
   - **Cannot** toggle sharing (always 간직중)
   - Can receive letters (stored locally)

3. **'memorial'** (추모 인연):
   - **Cannot** be added to groups
   - **Cannot** toggle sharing (always 간직중)
   - Can receive letters (stored locally)

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

### Memory Sharing Logic
On memory page (02_memory.html):
- Auto-disable toggle for pet/memorial/no-contact
- Show tooltip explaining why sharing is disabled
- Confirmation modal when switching from 공유중 to 간직중
- Saves `isSharing` property to connection in localStorage

### Calendar Event Sharing
On calendar event page (calendar_plus.html):
- **선택공유**: Shows member search, stores selected names in `sharedWith` array
- **비공개**: No sharing, hides member search
- **전체보기**: Public event, hides member search

### Letter Pattern Randomization
```javascript
// 6 available patterns
const patterns = ['hearts', 'plain-pink', 'dots', 'stripes', 'flowers', 'waves'];

// Random selection (or use saved pattern)
const selectedPattern = letter.pattern || patterns[Math.floor(Math.random() * patterns.length)];

// Apply to modal
patternDiv.classList.add(`pattern-${selectedPattern}`);
```

## Working with This Codebase

### When Adding New Pages
1. Create HTML file (follow naming convention: 00_/01_/02_/03_/04_/05_prefix or descriptive name)
2. Include `<link rel="stylesheet" href="styles.css">`
3. Include `<script src="script.js"></script>` before `</body>`
4. Add page-specific handlers in script.js with existence checks
5. Ensure 393px width + bottom navigation (if needed)
6. Use URL parameters for context (person name, group ID, edit mode)

### When Modifying Existing Pages
1. **HTML changes**: Edit specific HTML file
2. **Style changes**: Edit styles.css (affects ALL pages globally)
3. **Logic changes**: Edit script.js (wrap in existence checks)
4. **Navigation changes**: Update `window.location.href` calls

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
// Used in calendar filter dropdown
const sortedConnections = connections.sort((a, b) =>
    a.name.localeCompare(b.name, 'ko-KR')
);
```

### Debugging
Extensive console.log statements throughout:
- Open DevTools (F12) to monitor
- Loading transitions, button clicks, data operations all logged
- Pattern: `console.log('Context:', data)`

## Important Notes

- **No backend**: All data is client-side localStorage only (~5MB limit)
- **Korean-only**: No internationalization
- **Mobile-only**: Not responsive beyond 393px viewport
- **No build process**: Direct file editing, no compilation
- **Shared resources**: Changes to styles.css or script.js affect ALL pages
- **URL parameters**: Primary method for page-to-page data passing
- **Modal confirmations**: Used for destructive actions (deleting, disabling sharing)
- **Font accessibility**: 4-level system for vision-impaired users
- **Image icons**: Calendar and navigation use PNG images, not emojis
- **Pattern opacity**: Letter patterns use low opacity (0.08-0.3) for text readability

## Recent Additions

### Event Notification Modal (01_main.html)
- Auto-displays on main page (currently in test mode)
- Styled with pink gradient matching other buttons
- Shows graduation exhibition announcement with clover emoji 🍀
- localStorage tracking to show once per day
- Date range: Nov 26-30 (when not in test mode)

### Letter View Modal (03_letter.html)
- Opens when "편지 보기" button clicked
- Displays full letter content with random pattern background
- 6 semi-transparent patterns for readability
- Shows title, recipient, date, content, and photos
- Close via X button or background click

### Calendar System (03_calendar.html, calendar_plus.html)
- Full calendar grid with month/year navigation
- Event creation/editing with date range, repeat, alarm
- Share methods: 선택공유, 비공개, 전체보기
- Member selection for shared events
- Filter dropdown with Korean alphabetical sorting
- Icon replacements: Calendar icon images, not emojis
- Search and filter functionality

### Gift Section Redesign
- Consistent across main, memory, and group memory pages
- Horizontal flex layout: icons left, text/button right
- Gradient background with semi-transparent pink
- Product icons: 오디오 키링, 디스플레이 액자
- Button matches event notification style

### Toggle Switch Enhancement
- Active state uses pink gradient
- Inner shadow for depth (inset 0 2px 6px)
- Matches overall app aesthetic
- Used for sharing status on memory pages
