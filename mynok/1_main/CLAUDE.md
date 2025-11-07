# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**마이노크 (MyNock)** is a Korean-language social connection and memory-sharing mobile web application. It's a modular multi-page application built with vanilla JavaScript, HTML, and CSS, optimized for mobile viewing (393px width).

## Application Structure

This version uses a **separated file architecture**:
- **HTML files**: Individual pages (00_loading.html, 00_login.html, 00_join.html, 01_main.html, peopleplus.html)
- **styles.css**: Shared stylesheet for all pages
- **script.js**: Shared JavaScript with event handlers for all pages
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

### File Structure and Page Flow

**Page Navigation Flow:**
```
00_loading.html (4 sequential screens with auto-transition)
    ↓ [시작하기 button]
00_login.html (phone verification)
    ↓ [회원가입 하기 link]
00_join.html (3-step signup: font size → personal info → phone verification)
    ↓ [지금 바로 시작하기 button]
01_main.html (main dashboard with connections list and groups)
    ↓ [+ 인연 추가하기 button]
peopleplus.html (add new connection form)
    ↓ [인연 추가하기 button] → back to 01_main.html
```

### State Management

**localStorage Keys:**
- `fontSize`: User's font size preference ('font-small', 'font-medium', 'font-large', 'font-xlarge')
- `mynokConnections`: JSON array of connection objects

**Connection Data Structure:**
```javascript
{
    name: string,           // Required
    birthday: string,       // "05월 23일" or "정보 없음"
    contact: string,        // Phone number or "정보 없음"
    memories: number,       // Count of shared memories
    avatar: string|null     // Image path or null
}
```

**Default Connections:** 강훈 (47 memories), 할머니 (654 memories), 시월이 (23 memories)

### Key JavaScript Functions (script.js)

**Connection Management:**
- `getConnections()`: Retrieves connections from localStorage, initializes with defaults if empty
- `renderConnections()`: Dynamically generates connection list DOM with 2-line layout (birthday on line 1, memories on line 2)
- `addNewConnection(connectionData)`: Appends new connection to localStorage

**Font Size System:**
- `applyFontSize(fontClass)`: Applies font class to body and saves to localStorage
- Font slider (0-3 range) synced with radio buttons
- Classes: `font-small` (12px), `font-medium` (14px), `font-large` (16px), `font-xlarge` (18px)

**Page-specific Event Handlers:**
- Loading page: Auto-transitions between 4 screens every 2.5 seconds
- Login page: Phone verification flow with "인증번호 발송" and "인증번호 확인" buttons
- Join page: Multi-step form with `nextStep1`, `nextStep2` button handlers and `completeJoin`
- Main page: Tab switching between "소중한 인연" and "소중한 그룹 인연"
- Add connection form: Validates name field, handles "모르겠어요" checkboxes for optional fields

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
- `.next-step-btn`: Fixed positioned button at bottom (z-index: 10000, pointer-events: auto)
- `.loading-screen.active`: Controls which loading screen is visible
- `.join-step.active`: Controls which signup step is visible

### Form Validation and Data Processing

**Add Connection Form (peopleplus.html):**
- Name field: Required (`id="nameInput"`)
- Birthday field: Optional, disabled when "모르겠어요" checkbox is checked (`id="birthdayInput"`, `id="birthdayUnknown"`)
- Contact field: Optional, disabled when "모르겠어요" checkbox is checked (`id="contactInput"`, `id="contactUnknown"`)
- Unchecked or empty optional fields save as "정보 없음"

**Join Form (00_join.html):**
- Step 1: Font size selection with slider/radio sync
- Step 2: Name and birthday inputs (both required for progression)
- Step 3: Phone verification with "인증번호 발송" → displays verification code input
- Name from Step 2 is displayed in Step 3 via `displayUserName` element

## Important Notes

- **Persistence**: Uses localStorage for font preferences and connections list; survives page refresh
- **No backend**: All data is client-side only
- **Korean language**: All UI text is in Korean
- **Mobile-only**: Designed specifically for 393px viewport (not responsive to larger screens)
- **Separated files**: CSS and JS are external files shared across all pages

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
```

**When adding new pages:**
1. Create new HTML file following naming convention (00_pagename.html or 01_pagename.html)
2. Include `<link rel="stylesheet" href="styles.css">` in head
3. Include `<script src="script.js"></script>` before closing body tag
4. Add page-specific event handlers in script.js wrapped in element existence checks
5. Ensure 393px width, include bottom navigation if needed

## Debug Console Logging

The codebase includes extensive console.log statements for debugging:
- Loading screen transitions: `console.log('현재 화면:', currentScreen)`
- Font slider events: `console.log('슬라이더 이벤트 발생! 값:', value)`
- Button clicks: `console.log('nextStep1 클릭됨!')`
- Connection management: `console.log('인연 목록 렌더링 완료:', connections.length, '명')`

Open browser DevTools (F12) to monitor these logs during development and debugging.
