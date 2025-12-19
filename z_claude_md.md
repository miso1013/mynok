# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**마이노크 (MyNock)** is a Korean-language social connection and memory-sharing mobile web application. It's a modular multi-page application built with vanilla JavaScript, HTML, and CSS, optimized for mobile viewing (393px width).

## Application Structure

This version uses a **separated file architecture**:
- **HTML files**: Individual pages for authentication, main interface, memory management, profile settings, and group features
- **styles.css**: Shared stylesheet for all pages
- **script.js**: Shared JavaScript with event handlers for all pages (1800 lines)
- **../img/**: Image assets directory

Mobile-first design targeting iPhone 14 Pro dimensions (393px × 852px).

## Development Commands

This is a static HTML/CSS/JS application with no build process:

**Run locally:**
```bash
# Navigate to the project directory
cd "C:\Users\라포랩스\Desktop\mynok\1_main"

# Use Python's built-in server
python -m http.server 8000
# Then navigate to http://localhost:8000/00_loading.html

# Or simply open HTML files directly in a browser
```

**No build, lint, or test commands** - this is vanilla HTML/CSS/JS without a toolchain.

## Code Architecture

### Complete Page Structure and Navigation Flow

**Authentication Flow:**
```
00_loading.html (4 sequential screens with auto-transition)
    ↓ [시작하기 button]
00_login.html (phone verification)
    ↓ [회원가입 하기 link]
00_join.html (3-step signup: font size → personal info → phone verification)
    ↓ [지금 바로 시작하기 button]
01_main.html (main dashboard)
```

**Main Application Flow:**
```
01_main.html (main dashboard with two tabs)
    ├─ Tab 1: 소중한 인연 (Connections)
    │   ├─ [+ 인연 추가하기] → peopleplus.html
    │   └─ [📖 추억 노크하기] → 02_memory.html?name={name}
    │
    └─ Tab 2: 소중한 그룹 인연 (Groups)
        └─ [+ 새 그룹 만들기] → new_group.html

02_memory.html (individual memory page)
    ├─ Displays connection details and memory statistics
    ├─ Toggle: 공유중 ↔ 간직중 (with confirmation modal)
    └─ [문장이 있어] → 03_letter.html?name={name}

03_letter.html (letter exchange page)
    ├─ Two tabs: 보낸편지함 (sent) / 받은편지함 (received)
    ├─ Search functionality for letters
    ├─ [+ 편지 쓰기] → letter_write.html?name={name}
    └─ [편지 보기] buttons for individual letters (placeholder)

letter_write.html (letter writing page)
    ├─ Recipient selection with removable tags
    ├─ Title and content input fields
    ├─ Letter pattern selection (6 patterns)
    ├─ Photo upload (1 main + 3 additional slots)
    └─ [보내기] button saves to localStorage and returns to 03_letter.html

peopleplus.html (add/edit connection form)
    ├─ Add mode: Creates new connection
    └─ Edit mode: ?mode=edit&index={index}

01_mypage.html (settings and profile)
    ├─ Accordion sections: 프로필 정보, 선물·결제 정보, 추억 정보, 고객센터
    ├─ [추억 인연 수정하기] → 01_list_edit.html
    └─ [인연 추가하기] → peopleplus.html

01_list_edit.html (edit/delete interface)
    ├─ Two tabs: 소중한 인연, 소중한 그룹 인연
    ├─ [수정] button → navigates to peopleplus.html or edit_group.html
    └─ [삭제] button → deletes selected items

new_group.html (create new group)
    └─ Member selection, group naming, memory keeper assignment

edit_group.html (edit existing group)
    └─ Modify group name, members, and memory keeper
```

**Bottom Navigation (on most pages):**
- 🏠 **마이노크홈**: Returns to 01_main.html
- 📅 **일정 확인하기**: Placeholder (alert message)
- 👤 **마이페이지**: Opens 01_mypage.html

### State Management

**localStorage Keys:**
- `fontSize`: User's font size preference ('font-small', 'font-medium', 'font-large', 'font-xlarge')
- `mynokConnections`: JSON array of connection objects
- `mynokGroups`: JSON array of group objects
- `mynokLetters_{personName}`: JSON array of letter objects for specific person (e.g., `mynokLetters_강훈`)

**Connection Data Structure:**
```javascript
{
    name: string,           // Required
    birthday: string,       // "05월 23일" or "정보 없음"
    contact: string,        // Phone number or "정보 없음"
    memories: number,       // Count of shared memories
    avatar: string|null,    // Image path or null
    connectionType: string  // 'person' | 'pet' | 'memorial'
}
```

**Group Data Structure:**
```javascript
{
    id: number,             // Timestamp-based unique ID
    name: string,           // Group name (e.g., "우리 가족 💕")
    members: string[],      // Array of member names (includes "미소(나)")
    memoryKeeper: string,   // Name of memory keeper
    createdAt: string       // ISO timestamp
}
```

**Letter Data Structure:**
```javascript
{
    id: number,             // Unique ID for letter
    type: string,           // 'sent' or 'received'
    recipient: string,      // Name of recipient
    date: string,           // Display date (e.g., "2025.03.15")
    title: string,          // Letter title
    content: string,        // Letter content
    pattern: string,        // Selected pattern ('hearts', 'plain-pink', 'dots', 'stripes', 'flowers', 'waves')
    photos: string[],       // Array of base64 encoded images
    createdAt: string       // ISO timestamp
}
```

**Connection Types:**
- `person`: 일반 인연 (기본값) - 편지 공유 가능
- `pet`: 반려동물 - 편지 공유 불가, 간직중 고정
- `memorial`: 추모 인연 - 편지 공유 불가, 간직중 고정

**Default Data:**
- Connections:
  - 강훈 (person, 47 memories, 연락처 없음)
  - 할머니 (person, 654 memories, 연락처 있음)
  - 시월이 (pet, 23 memories, 반려동물)
- Groups: "우리 가족 💕" and "친구들과 함께 🎉"
- Letters: 2 sample sent letters with dates and content

### Key JavaScript Functions (script.js)

**Connection Management:**
- `getConnections()`: Retrieves connections from localStorage, initializes with defaults if empty
- `renderConnections()`: Dynamically generates connection list DOM with 2-line layout
- `addNewConnection(connectionData)`: Appends new connection to localStorage

**Group Management:**
- `renderGroups()`: Renders group cards with member tags and counts
- `renderMemberSelectionList(searchQuery)`: Displays checkable member list for group creation
- `toggleMemberSelection(memberName, isSelected)`: Handles member selection in group forms
  - **Blocks pets/memorial/no-contact**: Shows alert and unchecks if user tries to select
  - Alert messages explain why member cannot be added to group
- `updateSelectedMembersDisplay()`: Updates selected member tags in group forms
- `updateMemoryKeeperDropdown()`: Syncs memory keeper dropdown with selected members

**Font Size System:**
- `applyFontSize(fontClass)`: Applies font class to body and saves to localStorage
- Font slider (0-3 range) synced with radio buttons
- Classes: `font-small` (12px), `font-medium` (14px), `font-large` (16px), `font-xlarge` (18px)

**Memory Page Features (02_memory.html):**
- Dynamic rendering from URL parameter: `?name={connectionName}`
- Fetches connection data and displays personalized memory statistics
- Share toggle: 공유중 (active) ↔ 간직중 (inactive)
  - **Auto-disabled for pets/memorial/no-contact**: Toggle shows 간직중 and is disabled
  - Hover shows tooltip explaining why sharing is disabled
- Modal confirmation when switching from 공유중 to 간직중

**Edit/Delete Interface (01_list_edit.html):**
- Dual-tab interface for connections and groups
- Radio button selection (only one item can be selected at a time)
- Edit button: Opens peopleplus.html?mode=edit&index={index} for connections
- Delete button: Confirms and removes selected items from localStorage

**Letter Management (03_letter.html):**
- `getLetters()`: Retrieves letters from localStorage with person-specific key
- `renderLetters(filterType, searchQuery)`: Renders filtered and sorted letter list
- Letter filtering: By type (sent/received) and search query
- Letter sorting: Chronological order (newest first)
- Person-specific storage: Each connection has separate letter storage

**Letter Writing (letter_write.html):**
- `renderRecipientTags()`: Displays selected recipients as removable tags
- Recipient selection: Via search button (prompt-based) or URL parameter
- Pattern selection: 6 patterns with visual preview (hearts, plain-pink, dots, stripes, flowers, waves)
- Photo upload: FileReader API converts to base64 for localStorage
- Form validation: Requires recipient, title, and content
- On submit: Saves to `mynokLetters_{personName}` and redirects to 03_letter.html

**Search Functionality:**
- Main page: Live search filters connections by name
- Group creation: Member search filters available connections
- Letter page: Searches through letter content and recipient names

**Page-specific Event Handlers:**
- Loading page: Auto-transitions between 4 screens every 2.5 seconds
- Login page: Phone verification flow with "인증번호 발송" and "인증번호 확인" buttons
- Join page: Multi-step form with `nextStep1`, `nextStep2` button handlers and `completeJoin`
- Main page: Tab switching between "소중한 인연" and "소중한 그룹 인연"
- Add/edit connection form: Validates name field, handles "모르겠어요" checkboxes for optional fields
- Mypage: Accordion toggle for collapsible sections
- Memory page: "문장이 있어" button navigates to 03_letter.html with person name parameter
- Letter page: Tab switching between sent/received, live search filtering, letter card rendering
- Letter write page: Recipient tag management, pattern selection, photo upload with preview, form submission

### Styling Conventions

**CSS Architecture:**
- Pretendard font family (loaded via jsDelivr CDN)
- Primary color scheme: Pink/coral (#FF7474, #FFB4B6)
- Mobile viewport: 393px width, responsive height
- Fixed bottom navigation: 83px height
- Buttons use pink gradient: `linear-gradient(135deg, #FF7474 0%, #FF8A8A 100%)`

**Important CSS Classes:**
- `.connection-item`: Flexbox layout for avatar, info (2-line), and knock button
- `.connection-birthday` / `.connection-memories`: Separate lines within connection-info
- `.group-card`: Card layout for group display with member tags
- `.member-tag`: Individual member name badge (`.me` class for current user)
- `.next-step-btn`: Fixed positioned button at bottom (z-index: 10000, pointer-events: auto)
- `.loading-screen.active`: Controls which loading screen is visible
- `.join-step.active`: Controls which signup step is visible
- `.mypage-accordion-item.active`: Controls accordion expansion
- `.toggle-switch.active`: Memory sharing toggle state (공유중)
- `.share-modal-overlay.active`: Displays confirmation modal
- `.letter-card`: Individual letter card with header, preview, and action button
- `.letter-tab-btn.active`: Active tab in letter page (pink background)
- `.letter-greeting-section`: Header section with person name and icon circle
- `.letter-pattern-box.selected`: Selected letter pattern with pink border and shadow
- `.recipient-tag`: Pink pill-shaped tag with remove button for selected recipients
- `.photo-preview`: Container for uploaded photo with remove button overlay

### Form Validation and Data Processing

**Add/Edit Connection Form (peopleplus.html):**
- Name field: Required (`id="nameInput"`)
- Birthday field: Optional, disabled when "모르겠어요" checkbox is checked (`id="birthdayInput"`, `id="birthdayUnknown"`)
- Contact field: Optional, disabled when "모르겠어요" checkbox is checked (`id="contactInput"`, `id="contactUnknown"`)
- **Connection Type**: Radio buttons for 일반 인연 (person) / 반려동물 (pet) / 추모 인연 (memorial)
  - Defaults to 'person'
  - Pet and memorial types cannot share letters in groups
- Unchecked or empty optional fields save as "정보 없음"
- Edit mode: URL parameters `?mode=edit&index={index}` populate form with existing data

**Join Form (00_join.html):**
- Step 1: Font size selection with slider/radio sync
- Step 2: Name and birthday inputs (both required for progression)
- Step 3: Phone verification with "인증번호 발송" → displays verification code input
- Name from Step 2 is displayed in Step 3 via `displayUserName` element

**Group Creation Form (new_group.html):**
- Group name: Required
- Member selection: Checkbox list from connections, with search filtering
- Selected members displayed as removable tags
- Memory keeper dropdown auto-updates based on selected members
- Submits to localStorage with unique timestamp-based ID

**Group Edit Form (edit_group.html):**
- Pre-populates with existing group data (requires URL parameter with group ID)
- Allows modification of name, members, and memory keeper
- Updates group object in localStorage

## Important Notes

- **Persistence**: Uses localStorage for font preferences, connections list, and groups; survives page refresh
- **No backend**: All data is client-side only
- **Korean language**: All UI text is in Korean
- **Mobile-only**: Designed specifically for 393px viewport (not responsive to larger screens)
- **Separated files**: CSS and JS are external files shared across all pages
- **URL Parameters**: Used for passing connection names (memory page) and edit modes (peopleplus, edit_group)
- **Modal System**: Confirmation modals for destructive actions (공유중→간직중, deleting connections)

## Working with This Codebase

**When making changes:**

1. **Modifying existing pages**: Edit the specific HTML file (e.g., `01_main.html`)
2. **Adding styles**: Edit `styles.css` - styles apply globally to all pages
3. **Adding functionality**: Edit `script.js` - all event handlers must check for element existence before attaching listeners
4. **Navigation**: Use `window.location.href = 'pagename.html'` for page transitions

**Common patterns:**

```javascript
// Always check element existence
const element = document.getElementById('elementId');
if (element) {
    element.addEventListener('click', function() {
        // handler code
    });
}

// Connection list rendering
if (document.getElementById('connectionsList')) {
    renderConnections();
}

// localStorage operations
localStorage.setItem('key', JSON.stringify(data));
const data = JSON.parse(localStorage.getItem('key'));

// URL parameters
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('paramName');

// Deleting from arrays (reverse order to avoid index issues)
const indicesToRemove = [3, 1, 5].sort((a, b) => b - a);
indicesToRemove.forEach(index => {
    array.splice(index, 1);
});
```

**When adding new pages:**
1. Create new HTML file following naming convention (00_pagename.html, 01_pagename.html, or descriptive name like letter.html)
2. Include `<link rel="stylesheet" href="styles.css">` in head
3. Include `<script src="script.js"></script>` before closing body tag
4. Add page-specific event handlers in script.js wrapped in element existence checks
5. Ensure 393px width, include bottom navigation if needed
6. For feature-specific pages (like letter.html), use URL parameters to pass context (e.g., person name)

**Working with tabs:**
- Main page and list_edit page use tab switching (connection vs. group views)
- Tab switching controlled by `.tab-btn[data-tab]` and corresponding content sections
- Only one tab content visible at a time (controlled by `display: none/block`)

**Working with modals:**
- Modal overlays have `.active` class to control visibility
- Click events on overlay background can close modal (check `e.target === this`)
- Used for confirmations and warnings (e.g., share toggle confirmation)

**Working with groups:**
- Groups always include "미소(나)" as a member
- Member tags with `.me` class have special styling for current user
- Group IDs use `Date.now()` for uniqueness
- Memory keeper defaults to "미소" but can be transferred to any group member
- **Group sharing restrictions**: Only 'person' type with contact info can be added
  - Pet/memorial/no-contact members trigger alert and cannot be added
  - Alert explains: "반려동물/추모 인연은 그룹에서 편지를 직접 공유할 수 없습니다"

**Working with letters:**
- Letters are stored per-person using `mynokLetters_{personName}` key
- Letter page accepts `?name={personName}` URL parameter to show person-specific letters
- Two letter types: 'sent' (보낸편지함) and 'received' (받은편지함)
- Letter cards show truncated preview with "편지 보기" button
- Search filters by content and recipient name across all letters
- Letters sorted by createdAt timestamp (newest first)

**Writing letters:**
- Letter write page pre-fills recipient from URL parameter
- Recipient tags can be added via search button or removed via × button
- 6 letter patterns available: hearts (yellow), plain-pink, dots, stripes, flowers, waves
- Pattern selection shows visual preview with border highlight
- Photo upload supports 4 images total (1 main portrait + 3 smaller)
- Photos converted to base64 and stored in letter object
- Form validates recipient, title, and content before submission

## Debug Console Logging

The codebase includes extensive console.log statements for debugging:
- Loading screen transitions: `console.log('현재 화면:', currentScreen)`
- Font slider events: `console.log('슬라이더 이벤트 발생! 값:', value)`
- Button clicks: `console.log('nextStep1 클릭됨!')`
- Connection management: `console.log('인연 목록 렌더링 완료:', connections.length, '명')`
- Group management: `console.log('그룹 목록 렌더링 완료:', groups.length, '개')`
- Memory page: `console.log('추억 페이지 렌더링 완료:', person.name)`
- Letter management: `console.log('편지 목록 렌더링 완료:', filteredLetters.length, '개')`

Open browser DevTools (F12) to monitor these logs during development and debugging.

## New Pages

### 03_letter.html (문장이 있어)
Letter exchange page for sharing written messages with connections. Features dual-tab interface for sent/received letters, search functionality, and letter preview cards.

**Key Features:**
- Person-specific letter storage using URL parameter
- Sent/received letter tabs with separate views
- Live search filtering through letter content
- Letter cards with date, recipient, and content preview
- "편지 쓰기" button navigates to letter_write.html

**Navigation:**
- Accessed from 02_memory.html via "문장이 있어" button
- Back button returns to memory page with person context
- Bottom navigation matches main app structure

### letter_write.html (편지 쓰기)
Letter composition page with recipient selection, pattern customization, and photo attachments. Matches design from reference image with pink/coral theme.

**Key Features:**
- Greeting section with user name and animated envelope icon
- Recipient selection with removable tags and search functionality
- Title and content text fields
- 6 letter pattern options with visual previews
  - Hearts: Yellow hearts on cream background
  - Plain Pink: Gradient pink background
  - Dots: Pink dots on light background
  - Stripes: Diagonal pink stripes
  - Flowers: Circular flower pattern
  - Waves: Vertical wave lines
- Photo upload grid: 1 main portrait + 3 additional squares
- Photo preview with remove button (×)
- Form validation and localStorage persistence

**Navigation:**
- Accessed from 03_letter.html via "+ 편지 쓰기" button
- "뒤로가기" button returns to 03_letter.html
- "보내기" button saves letter and returns to 03_letter.html
- Bottom navigation matches main app structure
