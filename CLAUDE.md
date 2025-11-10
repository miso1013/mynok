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
- **Pure vanilla JavaScript** (6,850 lines) - No frameworks
- **HTML5** - 24 separate page files
- **CSS3** (7,251 lines) - Single shared stylesheet
- **localStorage** - All data persistence (no backend)
- **Pretendard font** - Via jsDelivr CDN

### File Structure
```
1_main/
├── 00_*.html          # Authentication flow (loading, login, join)
├── 01_*.html          # Core pages (main, mypage, list_edit)
├── 02_*.html          # Memory pages (memory, groupmemory)
├── 03_*.html          # Content pages (letter, photo, calendar)
├── 04_*.html          # Feature pages (voice, placephoto)
├── 05_*.html          # E-commerce (gift)
├── *.html             # Supporting pages (peopleplus, new_group, etc.)
├── script.js          # ALL JavaScript (shared across pages)
├── styles.css         # ALL styles (shared across pages)
└── z_claude_md.md     # Legacy documentation

img/
├── keyring/           # Product detail images
└── [user folders]     # Profile images
```

### Core Design Pattern

**Monolithic Shared Resources:**
- Single `script.js` file handles ALL pages (6,850 lines)
- Single `styles.css` file styles ALL pages (7,251 lines)
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

This allows one script to work safely across 24 different pages without throwing errors.

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
    connectionType: string     // 'person' | 'pet' | 'memorial'
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

### Data Migration Pattern

The codebase includes automatic migration logic (script.js ~line 303-351):
- Converts numeric group IDs to strings
- Migrates string member arrays to object arrays
- Maintains backward compatibility

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
        └─ [+ 편지 쓰기] → letter_write.html?name={name}
```

**Tab 2: 소중한 그룹 인연 (Groups)**
```
[+ 새 그룹 만들기] → new_group.html
[📖 추억 노크하기] → 02_groupmemory.html?groupId={id}
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
- Gift card section with product recommendations

### Letter System (03_letter.html, letter_write.html)
- `getLetters()` - Retrieves person-specific letters
- `renderLetters(type, query)` - Filters and displays letters
- Person-specific storage: `mynokLetters_{personName}`
- Pattern selection with 6 visual styles
- Photo upload via FileReader API (base64 encoding)
- Form validation: recipient, title, content required

### Font Accessibility (script.js)
- `applyFontSize(fontClass)` - Applies and saves font preference
- 4 levels: font-small (12px), font-medium (14px), font-large (16px), font-xlarge (18px)
- Slider synced with radio buttons in join flow

## Styling Conventions

### CSS Architecture
- **Monolithic**: All 7,251 lines in one file
- **No preprocessors**: Pure CSS3
- **Class-based**: BEM-like naming patterns
- **Mobile-first**: 393px fixed width, responsive height

### Color Palette
```css
/* Primary pink/coral theme */
--primary: #FF7474
--light-pink: #FFB4B6
--accent-coral: #FF8A8A
--pink-gradient: linear-gradient(135deg, #FF7474 0%, #FF8A8A 100%)

/* Supporting colors */
--text: #333
--gray: #666, #999
--light-bg: #f5f5f5, #f0f0f0
--borders: #e0e0e0, #ddd
```

### Key CSS Patterns

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

**Component Classes:**
```css
.connection-item         /* Person/group cards */
.member-tag             /* Group member badges */
.toggle-switch          /* On/off toggles */
.letter-card            /* Letter preview cards */
.letter-pattern-box     /* Pattern selection */
.purchase-button-container  /* Product purchase buttons */
```

### Page-Specific Styling Sections
The CSS file is organized by page (lines 6837+):
- Keyring purchase page: lines 6837-7251
- Frame purchase page: uses same classes
- Group memory page: lines 6673-6796
- Letter pages: lines 5800+

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

### Product Pages (keyring.html, frame.html)
Recent additions (~lines 6734+ in script.js):
- Back navigation to 05_gift.html
- Delivery info toggle (collapsed by default)
- Purchase/gift button (placeholder alert)
- Same structure for both products
- Bottom padding prevents content overlap with nav

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

## Recent Additions

### Product Purchase Pages (keyring.html, frame.html)
- Complete e-commerce style pages
- Product info: name, price, discount, delivery
- Collapsible delivery details
- Detail cards with pink/green/dark/spec variants
- Product specifications table
- Purchase button with white background container
- Bottom navigation integration
- Script handlers: ~lines 6738-6849 in script.js
- Styles: ~lines 6837-7251 in styles.css

### Group Memory Page (02_groupmemory.html)
- Similar to individual memory page
- Group-specific member card (collapsible)
- Group context from URL: `?groupId={id}`
- Member list with profile images
- Script handlers: ~lines 6308-6731 in script.js

### Data Structure Migration
- Automatic migration on load (script.js ~lines 303-351)
- String group IDs → string IDs
- String member arrays → object arrays
- Maintains backward compatibility
