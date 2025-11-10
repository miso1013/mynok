// ==================== 네비게이션 바 초기화 ====================
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = {
        'navHome': {
            pages: ['01_main.html', 'index.html', ''],
            icon: '../img/마이노크 홈 아이콘'
        },
        'navCalendar': {
            pages: ['03_calendar.html', 'calendar_plus.html'],
            icon: '../img/마이노크 캘린더 아이콘'
        },
        'navMypage': {
            pages: ['01_mypage.html'],
            icon: '../img/마이노크 마이페이지 아이콘'
        }
    };

    // 모든 네비게이션 아이템 초기화
    Object.keys(navItems).forEach(navId => {
        const navItem = document.getElementById(navId);
        if (!navItem) return;

        const iconImg = navItem.querySelector('.nav-icon');
        const navInfo = navItems[navId];

        // 현재 페이지에 해당하는지 확인
        const isActive = navInfo.pages.some(page => currentPage === page || (currentPage === '' && page === ''));

        if (isActive) {
            navItem.classList.add('active');
            if (iconImg) iconImg.src = navInfo.icon + '_on.png';
        } else {
            navItem.classList.remove('active');
            if (iconImg) iconImg.src = navInfo.icon + '_off.png';
        }
    });
}

// 샘플 데이터 초기화 함수
function initializeSampleData() {
    // 인연 샘플 데이터 추가 (기존 인연이 없을 때만)
    const existingConnections = localStorage.getItem('mynokConnections');
    let connections = existingConnections ? JSON.parse(existingConnections) : [];

    // 샘플 인연 추가 (이름으로 중복 체크)
    const sampleConnectionNames = ['아빠', '엄마', '할머니', '강훈이'];
    const sampleConnections = [
        {
            name: '아빠',
            birthday: '1975-05-15',
            contact: '010-1234-5678',
            connectionType: 'person',
            memories: 0,
            avatar: null
        },
        {
            name: '엄마',
            birthday: '1977-08-22',
            contact: '010-2345-6789',
            connectionType: 'person',
            memories: 0,
            avatar: null
        },
        {
            name: '할머니',
            birthday: '1950-03-10',
            contact: '010-3456-7890',
            connectionType: 'person',
            memories: 0,
            avatar: null
        },
        {
            name: '강훈이',
            birthday: '2000-11-25',
            contact: '010-4567-8901',
            connectionType: 'person',
            memories: 0,
            avatar: null
        }
    ];

    sampleConnections.forEach(sample => {
        if (!connections.some(c => c.name === sample.name)) {
            connections.push(sample);
        }
    });
    localStorage.setItem('mynokConnections', JSON.stringify(connections));

    // 일정 샘플 데이터 추가 (항상 추가)
    const existingEvents = localStorage.getItem('mynokCalendarEvents');
    let events = existingEvents ? JSON.parse(existingEvents) : [];

    const today = new Date();
    const sampleEvents = [
        {
            id: Date.now() + 1,
            title: '아빠 생신',
            date: '2025-05-15',
            endDate: null,
            content: '아빠 생신 선물 준비하기',
            repeatType: 'yearly',
            alarmTime: 1440,
            shareMethod: 'select',
            sharedWith: ['아빠', '엄마'],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            title: '엄마랑 저녁 약속',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString().split('T')[0],
            endDate: null,
            content: '엄마랑 한식당에서 저녁 식사',
            repeatType: 'none',
            alarmTime: 120,
            shareMethod: 'select',
            sharedWith: ['엄마'],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 3,
            title: '할머니 병원 모시기',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString().split('T')[0],
            endDate: null,
            content: '정기 검진',
            repeatType: 'monthly',
            alarmTime: 1440,
            shareMethod: 'select',
            sharedWith: ['할머니', '엄마'],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 4,
            title: '강훈이랑 영화',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString().split('T')[0],
            endDate: null,
            content: '저녁 7시 CGV',
            repeatType: 'none',
            alarmTime: 60,
            shareMethod: 'select',
            sharedWith: ['강훈이'],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 5,
            title: '가족 여행',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).toISOString().split('T')[0],
            endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 16).toISOString().split('T')[0],
            content: '제주도 2박 3일',
            repeatType: 'none',
            alarmTime: 10080,
            shareMethod: 'all',
            sharedWith: [],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 6,
            title: '개인 일정',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString().split('T')[0],
            endDate: null,
            content: '혼자 조용히 책 읽기',
            repeatType: 'none',
            alarmTime: 0,
            shareMethod: 'private',
            sharedWith: [],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 7,
            title: '크리스마스 파티',
            date: '2025-12-25',
            endDate: null,
            content: '온 가족이 함께 모이는 날',
            repeatType: 'yearly',
            alarmTime: 1440,
            shareMethod: 'all',
            sharedWith: [],
            color: '#FF7474',
            createdAt: new Date().toISOString()
        }
    ];

    // 중복되지 않은 일정만 추가 (제목과 날짜로 체크)
    sampleEvents.forEach(sample => {
        const isDuplicate = events.some(e =>
            e.title === sample.title && e.date === sample.date
        );
        if (!isDuplicate) {
            events.push(sample);
        }
    });

    localStorage.setItem('mynokCalendarEvents', JSON.stringify(events));
    console.log('샘플 데이터 추가 완료:', events.length, '개 일정');
}

// 탭 전환 기능
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 바 초기화
    initializeNavigation();

    // 샘플 데이터 초기화 (최초 실행 시에만)
    initializeSampleData();

    // 저장된 폰트 크기 적용 (기존 클래스 유지하면서)
    const savedFontSize = localStorage.getItem('fontSize') || 'font-medium';
    document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
    document.body.classList.add(savedFontSize);

    const tabButtons = document.querySelectorAll('.tab-btn');
    const connectionTab = document.getElementById('connectionTab');
    const groupTab = document.getElementById('groupTab');

    if (tabButtons.length > 0 && connectionTab && groupTab) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // 모든 탭 버튼 비활성화
                tabButtons.forEach(btn => btn.classList.remove('active'));

                // 클릭된 탭 버튼 활성화
                this.classList.add('active');

                // 탭 콘텐츠 전환
                if (tabName === 'connection') {
                    connectionTab.style.display = 'block';
                    groupTab.style.display = 'none';
                } else if (tabName === 'group') {
                    connectionTab.style.display = 'none';
                    groupTab.style.display = 'block';
                }
            });
        });
    }

    // ==================== 인연 관리 시스템 ====================

    // 기본 인연 데이터 (강훈, 할머니, 시월이)
    const defaultConnections = [
        {
            name: '강훈',
            birthday: '05월 23일',
            contact: '정보 없음',
            memories: 47,
            avatar: '../img/kanghoon/2024.12.30_강훈2.jpg',
            connectionType: 'person' // 'person' | 'pet' | 'memorial'
        },
        {
            name: '할머니',
            birthday: '08월 15일',
            contact: '010-1234-5678',
            memories: 654,
            avatar: null,
            connectionType: 'person'
        },
        {
            name: '시월이',
            birthday: '10월 13일',
            contact: '정보 없음',
            memories: 23,
            avatar: null,
            connectionType: 'pet' // 반려동물
        }
    ];

    // 기본 그룹 데이터
    const defaultGroups = [
        {
            id: '1',
            name: '우리 가족 💕',
            members: [
                { name: '엄마', relation: '가족', profileImage: '' },
                { name: '아빠', relation: '가족', profileImage: '' },
                { name: '미소', relation: '나', profileImage: '' },
                { name: '할머니', relation: '가족', profileImage: '' }
            ],
            memoryKeeper: '미소',
            createdDate: new Date().toISOString(),
            isSharing: true
        },
        {
            id: '2',
            name: '친구들과 함께 🎉',
            members: [
                { name: '지혜', relation: '친구', profileImage: '' },
                { name: '해린', relation: '친구', profileImage: '' },
                { name: '진희', relation: '친구', profileImage: '' },
                { name: '미소', relation: '나', profileImage: '' }
            ],
            memoryKeeper: '미소',
            createdDate: new Date().toISOString(),
            isSharing: true
        }
    ];

    // localStorage에 기본 그룹 데이터 초기화 및 마이그레이션
    const savedGroups = localStorage.getItem('mynokGroups');
    if (!savedGroups) {
        localStorage.setItem('mynokGroups', JSON.stringify(defaultGroups));
    } else {
        // 기존 그룹 데이터를 새 구조로 마이그레이션
        let groups = JSON.parse(savedGroups);
        let updated = false;

        groups = groups.map(group => {
            // id를 문자열로 변환
            if (typeof group.id !== 'string') {
                group.id = String(group.id);
                updated = true;
            }

            // members가 문자열 배열이면 객체 배열로 변환
            if (group.members && group.members.length > 0 && typeof group.members[0] === 'string') {
                group.members = group.members.map(memberName => ({
                    name: memberName.replace('(나)', ''),
                    relation: memberName.includes('미소') ? '나' : '그룹 멤버',
                    profileImage: ''
                }));
                updated = true;
            }

            // createdDate 필드 추가
            if (!group.createdDate && group.createdAt) {
                group.createdDate = group.createdAt;
                updated = true;
            } else if (!group.createdDate) {
                group.createdDate = new Date().toISOString();
                updated = true;
            }

            // isSharing 필드 추가
            if (group.isSharing === undefined) {
                group.isSharing = true;
                updated = true;
            }

            return group;
        });

        if (updated) {
            localStorage.setItem('mynokGroups', JSON.stringify(groups));
            console.log('그룹 데이터 마이그레이션 완료');
        }
    }

    // localStorage에서 인연 데이터 불러오기
    function getConnections() {
        const saved = localStorage.getItem('mynokConnections');
        if (saved) {
            let connections = JSON.parse(saved);
            let updated = false;

            // "강훈이" 자동 제거 (버그 수정)
            const originalLength = connections.length;
            connections = connections.filter(conn => conn.name !== '강훈이');
            if (connections.length !== originalLength) {
                updated = true;
                console.log('"강훈이" 제거됨');
            }

            // 강훈 프로필 이미지 업데이트
            const kanghoon = connections.find(conn => conn.name === '강훈');
            if (kanghoon && kanghoon.avatar !== '../img/kanghoon/2024.12.30_강훈2.jpg') {
                kanghoon.avatar = '../img/kanghoon/2024.12.30_강훈2.jpg';
                updated = true;
                console.log('강훈 프로필 이미지 업데이트됨');
            }

            if (updated) {
                localStorage.setItem('mynokConnections', JSON.stringify(connections));
            }
            return connections;
        }
        // 처음이면 기본 데이터 저장
        localStorage.setItem('mynokConnections', JSON.stringify(defaultConnections));
        return defaultConnections;
    }

    // 인연별 추억 개수 계산
    function calculateMemoriesCount(personName) {
        let totalCount = 0;

        // 1. 장소별 추억 사진 (mynokPlacePhotos)
        const placePhotos = JSON.parse(localStorage.getItem('mynokPlacePhotos') || '[]');
        const sharedPlacePhotos = placePhotos.filter(photo => {
            if (photo.shareMethod === 'all') return true;
            if (photo.shareMethod === 'select' && photo.sharedWith) {
                return photo.sharedWith.includes(personName);
            }
            return false;
        });
        totalCount += sharedPlacePhotos.length;

        // 2. 개인 사진/동영상 (mynokPhotos_${personName})
        const personalPhotosKey = `mynokPhotos_${personName}`;
        const personalPhotos = JSON.parse(localStorage.getItem(personalPhotosKey) || '[]');
        totalCount += personalPhotos.length;

        // 3. 편지 (mynokLetters_${personName})
        const lettersKey = `mynokLetters_${personName}`;
        const letters = JSON.parse(localStorage.getItem(lettersKey) || '[]');
        totalCount += letters.length;

        return totalCount;
    }

    // 인연 목록 렌더링
    function renderConnections() {
        const connectionsList = document.getElementById('connectionsList');
        if (!connectionsList) return;

        const connections = getConnections();

        // 가나다 순으로 정렬
        connections.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        connectionsList.innerHTML = '';

        connections.forEach((connection, index) => {
            const connectionItem = document.createElement('div');
            connectionItem.className = 'connection-item';

            // 아바타 이미지
            let avatarHtml;
            if (connection.avatar) {
                avatarHtml = `<img src="${connection.avatar}" alt="${connection.name}" class="connection-avatar">`;
            } else {
                avatarHtml = `<div class="connection-avatar placeholder"></div>`;
            }

            // 생일 표시 텍스트 (년도 제거)
            let birthdayDisplay = connection.birthday;
            if (connection.birthday !== '정보 없음' && connection.birthday.includes('-')) {
                // YYYY-MM-DD 형식인 경우 MM월 DD일로 변환
                const [year, month, day] = connection.birthday.split('-');
                birthdayDisplay = `${parseInt(month)}월 ${parseInt(day)}일`;
            }
            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : `생일 ${birthdayDisplay}`;

            // 실제 추억 개수 계산
            const memoriesCount = calculateMemoriesCount(connection.name);

            connectionItem.innerHTML = `
                ${avatarHtml}
                <div class="connection-info">
                    <h3 class="connection-name">${connection.name}</h3>
                    <p class="connection-birthday">${birthdayText}</p>
                    <p class="connection-memories">추억 ${memoriesCount}개</p>
                </div>
                <div class="knock-container">
                    <img src="../img/문 아이콘.png" alt="문" class="knock-icon">
                    <button class="knock-btn" data-name="${connection.name}">추억 노크하기</button>
                </div>
            `;

            connectionsList.appendChild(connectionItem);
        });

        // 추억 노크하기 버튼 이벤트
        const knockButtons = document.querySelectorAll('.knock-btn');
        knockButtons.forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                // 모든 인연에 대해 동일한 페이지로 이동 (URL 파라미터로 이름 전달)
                window.location.href = `02_memory.html?name=${encodeURIComponent(name)}`;
            });
        });

        console.log('인연 목록 렌더링 완료:', connections.length, '명');
    }

    // 인연 추가 함수
    function addNewConnection(connectionData) {
        const connections = getConnections();
        connections.push({
            name: connectionData.name,
            birthday: connectionData.birthday,
            memories: 0,
            avatar: connectionData.avatar || null
        });
        localStorage.setItem('mynokConnections', JSON.stringify(connections));
        console.log('새 인연 추가됨:', connectionData.name);
    }

    // 페이지 로드 시 인연 목록 렌더링
    if (document.getElementById('connectionsList')) {
        renderConnections();
    }

    // 메인페이지 프로필 이미지 로드
    const mainProfileImage = document.getElementById('mainProfileImage');
    const mainProfilePlaceholder = document.getElementById('mainProfilePlaceholder');
    if (mainProfileImage && mainProfilePlaceholder) {
        const userProfile = JSON.parse(localStorage.getItem('mynokUserProfile') || '{}');
        if (userProfile.profilePhoto) {
            mainProfileImage.src = userProfile.profilePhoto;
            mainProfileImage.style.display = 'block';
            mainProfilePlaceholder.style.display = 'none';
            mainProfileImage.onerror = null; // onerror 제거하여 저장된 이미지 유지
        }
    }

    // 그룹 목록 렌더링 함수
    function renderGroups() {
        const groupsList = document.getElementById('groupsList');
        if (!groupsList) return;

        const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
        groupsList.innerHTML = '';

        if (groups.length === 0) {
            groupsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">아직 생성된 그룹이 없습니다.<br>새 그룹을 만들어보세요!</p>';
            return;
        }

        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';

            const members = group.members || [];
            const memberCount = members.length;

            // 멤버 태그 생성 (최대 3명까지만 표시)
            let memberTagsHtml = '';
            const maxDisplay = 3;
            const displayMembers = members.slice(0, maxDisplay);

            displayMembers.forEach(member => {
                // 새 구조(객체)와 기존 구조(문자열) 모두 지원
                const memberName = typeof member === 'string' ? member : member.name;
                const isMe = memberName === '미소(나)' || memberName === '미소';
                const memberClass = isMe ? 'member-tag me' : 'member-tag';
                const displayName = memberName === '미소' ? '미소(나)' : memberName;
                memberTagsHtml += `<span class="${memberClass}">${displayName}</span>`;
            });

            // 나머지 인원이 있으면 +숫자로 표시
            if (members.length > maxDisplay) {
                const remaining = members.length - maxDisplay;
                memberTagsHtml += `<span class="member-tag member-more">+${remaining}</span>`;
            }

            groupCard.innerHTML = `
                <div class="group-info">
                    <div class="group-header">
                        <h3 class="group-name">${group.name}</h3>
                        <span class="member-count">${memberCount}명</span>
                    </div>
                    <div class="group-members">
                        ${memberTagsHtml}
                    </div>
                </div>
                <div class="group-knock-container">
                    <img src="../img/문 아이콘.png" alt="문" class="group-knock-icon">
                    <button class="group-knock-btn" data-group-id="${group.id}">추억 노크하기</button>
                </div>
            `;

            groupsList.appendChild(groupCard);
        });

        // 그룹 노크하기 버튼 이벤트
        const groupKnockButtons = groupsList.querySelectorAll('.group-knock-btn');
        groupKnockButtons.forEach(button => {
            button.addEventListener('click', function() {
                const groupId = this.getAttribute('data-group-id');
                // 그룹 추억 페이지로 이동
                window.location.href = `02_groupmemory.html?groupId=${encodeURIComponent(groupId)}`;
            });
        });

        console.log('그룹 목록 렌더링 완료:', groups.length, '개');
    }

    // 페이지 로드 시 그룹 목록 렌더링
    if (document.getElementById('groupsList')) {
        renderGroups();
    }

    // 검색 기능 (추후 구현 가능)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const connections = document.querySelectorAll('.connection-item');

            connections.forEach(connection => {
                const name = connection.querySelector('.connection-name').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    connection.style.display = 'flex';
                } else {
                    connection.style.display = 'none';
                }
            });
        });
    }

    // 추억 노크하기 버튼 클릭
    const knockButtons = document.querySelectorAll('.knock-btn');
    if (knockButtons.length > 0) {
        knockButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 추억 노크하기 기능 (팝업 제거됨)
                // 필요시 여기에 다른 동작 추가 가능
            });
        });
    }

    // 인연 추가하기 버튼
    const addConnectionBtn = document.querySelector('.add-connection-btn');
    if (addConnectionBtn) {
        addConnectionBtn.addEventListener('click', function() {
            window.location.href = 'peopleplus.html';
        });
    }

    // 선물하러 가기 버튼
    const giftBtn = document.querySelector('.gift-btn');
    if (giftBtn) {
        giftBtn.addEventListener('click', function() {
            window.location.href = '05_gift.html';
        });
    }

    // ==================== 추억 선물하기 페이지 기능 ====================

    // 뒤로가기 버튼
    const backFromGift = document.getElementById('backFromGift');
    if (backFromGift) {
        backFromGift.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 선물 내역 보러가기 링크
    const giftHistoryLink = document.getElementById('giftHistoryLink');
    if (giftHistoryLink) {
        giftHistoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('선물 내역 페이지는 준비중입니다.');
        });
    }

    // 키링 선물하기 버튼
    const giftKeyringBtn = document.getElementById('giftKeyringBtn');
    if (giftKeyringBtn) {
        giftKeyringBtn.addEventListener('click', function() {
            window.location.href = 'keyring.html';
        });
    }

    // 액자 선물하기 버튼
    const giftFrameBtn = document.getElementById('giftFrameBtn');
    if (giftFrameBtn) {
        giftFrameBtn.addEventListener('click', function() {
            window.location.href = 'frame.html';
        });
    }

    // 하단 네비게이션
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                const navLabel = this.querySelector('.nav-label').textContent;
                console.log(`${navLabel} 클릭`);
            });
        });
    }

    // 인연 추가 페이지 기능
    // 뒤로가기 버튼
    const backToMain = document.getElementById('backToMain');
    if (backToMain) {
        backToMain.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 프로필 이미지 업로드
    const profileImageInput = document.getElementById('profileImage');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadIcon = document.getElementById('uploadIcon');
    let uploadedImageData = null;

    if (profileImageInput && uploadPreview && uploadIcon) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        // 이미지 리사이징 (최대 600x600, 품질 0.6)
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        const maxWidth = 600;
                        const maxHeight = 600;

                        // 비율 유지하면서 리사이징
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // JPEG 품질을 낮춰서 압축
                        const resizedImage = canvas.toDataURL('image/jpeg', 0.6);

                        uploadedImageData = resizedImage;
                        uploadPreview.src = resizedImage;
                        uploadPreview.style.display = 'block';
                        uploadIcon.style.display = 'none';
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 생년월일 드롭다운 초기화
    const birthYear = document.getElementById('birthYear');
    const birthMonth = document.getElementById('birthMonth');
    const birthDay = document.getElementById('birthDay');
    const birthdayUnknown = document.getElementById('birthdayUnknown');

    if (birthYear && birthMonth && birthDay) {
        // 년도 옵션 생성 (1920년 ~ 현재 년도)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1920; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '년';
            birthYear.appendChild(option);
        }

        // 월 옵션 생성
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month + '월';
            birthMonth.appendChild(option);
        }

        // 일 옵션 생성
        for (let day = 1; day <= 31; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '일';
            birthDay.appendChild(option);
        }

        // 생년월일 체크박스 처리
        if (birthdayUnknown) {
            birthdayUnknown.addEventListener('change', function() {
                const disabled = this.checked;
                birthYear.disabled = disabled;
                birthMonth.disabled = disabled;
                birthDay.disabled = disabled;
                if (disabled) {
                    birthYear.style.backgroundColor = '#f5f5f5';
                    birthMonth.style.backgroundColor = '#f5f5f5';
                    birthDay.style.backgroundColor = '#f5f5f5';
                    birthYear.value = '';
                    birthMonth.value = '';
                    birthDay.value = '';
                } else {
                    birthYear.style.backgroundColor = 'white';
                    birthMonth.style.backgroundColor = 'white';
                    birthDay.style.backgroundColor = 'white';
                }
            });
        }
    }

    // 연락처 체크박스
    const contactUnknown = document.getElementById('contactUnknown');
    const contactInput = document.getElementById('contactInput');
    if (contactUnknown && contactInput) {
        contactUnknown.addEventListener('change', function() {
            if (this.checked) {
                contactInput.disabled = true;
                contactInput.style.backgroundColor = '#f5f5f5';
                contactInput.value = '';
            } else {
                contactInput.disabled = false;
                contactInput.style.backgroundColor = 'white';
            }
        });
    }

    // 토글 버튼 (추억 공유 여부)
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // 인연 추가/수정 폼
    const addConnectionForm = document.querySelector('.add-connection-form');
    if (addConnectionForm) {
        // URL 파라미터 확인 (수정 모드 체크)
        const urlParams = new URLSearchParams(window.location.search);
        const editMode = urlParams.get('mode') === 'edit';
        const editName = editMode ? urlParams.get('name') : null;

        // 수정 모드일 경우 폼 데이터 채우기
        if (editMode && editName) {
            const connections = getConnections();
            const connection = connections.find(conn => conn.name === editName);

            if (connection) {
                const nameInput = document.getElementById('nameInput');
                const birthdayInput = document.getElementById('birthdayInput');
                const birthdayUnknown = document.getElementById('birthdayUnknown');
                const contactInput = document.getElementById('contactInput');
                const contactUnknown = document.getElementById('contactUnknown');

                // 페이지 제목 변경
                const pageTitle = document.querySelector('.page-title');
                if (pageTitle) {
                    pageTitle.textContent = '인연 수정하기';
                }

                // 제출 버튼 텍스트 변경
                const submitBtn = addConnectionForm.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.textContent = '수정 완료';
                }

                // 폼에 데이터 채우기
                if (nameInput) nameInput.value = connection.name;

                // 프로필 이미지 채우기
                if (connection.avatar && uploadPreview && uploadIcon) {
                    uploadedImageData = connection.avatar;
                    uploadPreview.src = connection.avatar;
                    uploadPreview.style.display = 'block';
                    uploadIcon.style.display = 'none';
                }

                // 생년월일 채우기
                if (connection.birthday === '정보 없음') {
                    if (birthdayUnknown) {
                        birthdayUnknown.checked = true;
                        // 드롭다운 비활성화
                        if (birthYear) birthYear.disabled = true;
                        if (birthMonth) birthMonth.disabled = true;
                        if (birthDay) birthDay.disabled = true;
                    }
                } else {
                    // YYYY-MM-DD 또는 MM월 DD일 형식 파싱
                    let year, month, day;
                    if (connection.birthday.includes('-')) {
                        [year, month, day] = connection.birthday.split('-');
                    } else if (connection.birthday.includes('월')) {
                        const match = connection.birthday.match(/(\d+)월\s*(\d+)일/);
                        if (match) {
                            month = match[1];
                            day = match[2];
                        }
                    }
                    if (year && birthYear) birthYear.value = year;
                    if (month && birthMonth) birthMonth.value = parseInt(month);
                    if (day && birthDay) birthDay.value = parseInt(day);
                }

                if (connection.contact === '정보 없음') {
                    if (contactUnknown) contactUnknown.checked = true;
                    if (contactInput) contactInput.disabled = true;
                } else if (contactInput) {
                    contactInput.value = connection.contact;
                }

                // 인연 유형 선택
                const connectionType = connection.connectionType || 'person';
                const typeRadio = document.querySelector(`input[name="connectionType"][value="${connectionType}"]`);
                if (typeRadio) {
                    typeRadio.checked = true;
                }
            }
        }

        addConnectionForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 폼 데이터 수집
            const nameInput = document.getElementById('nameInput');
            const birthdayInput = document.getElementById('birthdayInput');
            const birthdayUnknown = document.getElementById('birthdayUnknown');
            const contactInput = document.getElementById('contactInput');
            const contactUnknown = document.getElementById('contactUnknown');

            console.log('폼 제출 시도 - 이름 입력값:', nameInput ? nameInput.value : 'nameInput 없음');

            // 이름 필수 체크
            if (!nameInput || !nameInput.value.trim()) {
                alert('이름을 입력해주세요.');
                return;
            }

            // 생년월일 처리
            let birthday = '정보 없음';
            if (birthdayUnknown && birthdayUnknown.checked) {
                birthday = '정보 없음';
            } else if (birthYear && birthMonth && birthDay) {
                const year = birthYear.value;
                const month = birthMonth.value;
                const day = birthDay.value;

                if (year && month && day) {
                    // MM월 DD일 형식으로 저장 (년도 제외)
                    birthday = `${parseInt(month)}월 ${parseInt(day)}일`;
                }
            }

            // 연락처 처리
            let contact = '정보 없음';
            if (contactUnknown && contactUnknown.checked) {
                contact = '정보 없음';
            } else if (contactInput && contactInput.value.trim()) {
                contact = contactInput.value.trim();
            }

            // 인연 유형 처리
            const connectionTypeRadio = document.querySelector('input[name="connectionType"]:checked');
            const connectionType = connectionTypeRadio ? connectionTypeRadio.value : 'person';

            const connections = getConnections();

            if (editMode && editName) {
                // 수정 모드
                const connectionIndex = connections.findIndex(conn => conn.name === editName);

                if (connectionIndex !== -1) {
                    connections[connectionIndex] = {
                        ...connections[connectionIndex],
                        name: nameInput.value.trim(),
                        birthday: birthday,
                        contact: contact,
                        connectionType: connectionType,
                        avatar: uploadedImageData || connections[connectionIndex].avatar
                    };

                    localStorage.setItem('mynokConnections', JSON.stringify(connections));

                    console.log('인연 수정:', connections[connectionIndex]);
                    alert(`${connections[connectionIndex].name}님의 정보가 수정되었습니다!`);
                    window.location.href = '01_main.html';
                } else {
                    alert('수정할 인연을 찾을 수 없습니다.');
                }
            } else {
                // 추가 모드
                const newConnection = {
                    name: nameInput.value.trim(),
                    birthday: birthday,
                    contact: contact,
                    memories: 0,
                    avatar: uploadedImageData,
                    connectionType: connectionType
                };

                connections.push(newConnection);
                localStorage.setItem('mynokConnections', JSON.stringify(connections));

                console.log('새 인연 추가:', newConnection);
                alert(`${newConnection.name}님이 인연 목록에 추가되었습니다!`);
                window.location.href = '01_main.html';
            }
        });
    }

    // 로딩 페이지 화면 전환
    const loadingScreens = document.querySelectorAll('.loading-screen');
    console.log('로딩 화면 개수:', loadingScreens.length);

    if (loadingScreens.length > 0) {
        let currentScreen = 0;
        const totalScreens = 4;
        const screenDuration = 2500; // 2.5초

        // 화면 전환 함수
        function showNextScreen() {
            console.log('현재 화면:', currentScreen);

            if (currentScreen < totalScreens - 1) {
                // 현재 화면 숨기기
                loadingScreens[currentScreen].classList.remove('active');

                // 다음 화면 보여주기
                currentScreen++;
                loadingScreens[currentScreen].classList.add('active');

                console.log('다음 화면으로 전환:', currentScreen);

                // 마지막 화면이 아니면 계속 전환
                if (currentScreen < totalScreens - 1) {
                    setTimeout(showNextScreen, screenDuration);
                }
            }
        }

        // 첫 화면 확인 및 표시
        loadingScreens[0].classList.add('active');
        console.log('첫 화면 표시됨');

        // 자동 전환 시작
        setTimeout(showNextScreen, screenDuration);

        // 시작하기 버튼
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            console.log('시작하기 버튼 찾음');
            startBtn.addEventListener('click', function() {
                console.log('시작하기 버튼 클릭됨');
                window.location.href = '00_login.html';
            });
        }
    } else {
        console.log('로딩 화면을 찾을 수 없습니다.');
    }

    // 로그인 페이지 기능
    const backFromLogin = document.getElementById('backFromLogin');
    if (backFromLogin) {
        backFromLogin.addEventListener('click', function() {
            window.location.href = '00_loading.html';
        });
    }

    const sendVerifyBtn = document.getElementById('sendVerifyBtn');
    if (sendVerifyBtn) {
        sendVerifyBtn.addEventListener('click', function() {
            const phone = document.getElementById('loginPhone').value;
            if (phone) {
                alert('인증번호가 발송되었습니다.');
                document.getElementById('checkVerifyBtn').style.backgroundColor = '#FF7474';
                document.getElementById('checkVerifyBtn').style.color = 'white';
            } else {
                alert('연락처를 입력해주세요.');
            }
        });
    }

    const checkVerifyBtn = document.getElementById('checkVerifyBtn');
    if (checkVerifyBtn) {
        checkVerifyBtn.addEventListener('click', function() {
            const code = document.getElementById('verifyCode').value;
            if (code) {
                alert('인증이 완료되었습니다.');
            } else {
                alert('인증번호를 입력해주세요.');
            }
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 회원가입 페이지 기능
    const backFromJoin = document.getElementById('backFromJoin');
    if (backFromJoin) {
        backFromJoin.addEventListener('click', function() {
            const currentStep = document.querySelector('.join-step.active');
            if (currentStep && currentStep.id === 'joinStep1') {
                window.location.href = '00_login.html';
            } else {
                // 이전 단계로
                const stepId = currentStep.id;
                if (stepId === 'joinStep2') {
                    currentStep.classList.remove('active');
                    document.getElementById('joinStep1').classList.add('active');
                } else if (stepId === 'joinStep3') {
                    currentStep.classList.remove('active');
                    document.getElementById('joinStep2').classList.add('active');
                }
            }
        });
    }

    // 폰트 슬라이더와 라디오 버튼 연동
    const fontSlider = document.getElementById('fontSlider');
    const fontRadios = document.querySelectorAll('input[name="fontSize"]');
    const fontSizeMap = ['font-small', 'font-medium', 'font-large', 'font-xlarge'];
    const radioValueMap = ['small', 'medium', 'large', 'xlarge'];

    // 폰트 크기 적용 함수
    function applyFontSize(fontClass) {
        // 기존 폰트 클래스 제거
        document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
        // 새 폰트 클래스 추가
        document.body.classList.add(fontClass);
        // localStorage에 저장
        localStorage.setItem('fontSize', fontClass);
        console.log('폰트 크기 적용:', fontClass);
    }

    // 페이지 로드 시 저장된 폰트 크기로 슬라이더/라디오 설정
    const savedIndex = fontSizeMap.indexOf(savedFontSize);
    if (fontSlider && savedIndex !== -1) {
        fontSlider.value = savedIndex;
    }
    if (fontRadios.length > 0 && savedIndex !== -1) {
        fontRadios.forEach((radio, index) => {
            if (index === savedIndex) {
                radio.checked = true;
                const label = radio.nextElementSibling;
                label.classList.add('font-selected');
            }
        });
    }

    if (fontSlider) {
        fontSlider.addEventListener('input', function(e) {
            const value = parseInt(e.target.value);
            const fontClass = fontSizeMap[value];

            console.log('슬라이더 이벤트 발생! 값:', value, '폰트:', fontClass);

            // 폰트 크기 즉시 적용
            applyFontSize(fontClass);

            // 라디오 버튼 명확하게 동기화
            for (let i = 0; i < fontRadios.length; i++) {
                if (i === value) {
                    fontRadios[i].checked = true;
                    fontRadios[i].nextElementSibling.classList.add('font-selected');
                    console.log('라디오 버튼', i, '선택됨');
                } else {
                    fontRadios[i].checked = false;
                    fontRadios[i].nextElementSibling.classList.remove('font-selected');
                }
            }
        });
        console.log('슬라이더 이벤트 리스너 등록됨');
    }

    if (fontRadios.length > 0) {
        fontRadios.forEach((radio, index) => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    const fontClass = fontSizeMap[index];

                    console.log('라디오 선택:', index, '폰트 클래스:', fontClass);

                    // 폰트 크기 적용
                    applyFontSize(fontClass);

                    // 슬라이더 동기화
                    if (fontSlider) {
                        fontSlider.value = index;
                    }

                    // 라벨 스타일 업데이트
                    fontRadios.forEach((r, i) => {
                        const label = r.nextElementSibling;
                        if (i === index) {
                            label.classList.add('font-selected');
                        } else {
                            label.classList.remove('font-selected');
                        }
                    });
                }
            });
        });
    }

    // 회원가입 단계 1 - 다음 단계
    const nextStep1 = document.getElementById('nextStep1');
    if (nextStep1) {
        console.log('nextStep1 버튼 찾음!');

        nextStep1.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('nextStep1 클릭됨!');

            const step1 = document.getElementById('joinStep1');
            const step2 = document.getElementById('joinStep2');

            console.log('step1:', step1, 'step2:', step2);

            if (step1 && step2) {
                step1.classList.remove('active');
                step2.classList.add('active');
                console.log('단계 1 -> 2 전환 완료');
                window.scrollTo(0, 0);
            }
        });

        nextStep1.addEventListener('touchstart', function(e) {
            console.log('터치 시작');
        });
    } else {
        console.log('nextStep1 버튼을 찾을 수 없음');
    }

    // 회원가입 단계 2 - 다음 단계
    const nextStep2 = document.getElementById('nextStep2');
    const userNameInput = document.getElementById('userName');
    const userBirthdayInput = document.getElementById('userBirthday');

    if (nextStep2) {
        console.log('nextStep2 버튼 찾음!');

        nextStep2.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('nextStep2 클릭됨!');

            if (userNameInput && userBirthdayInput) {
                if (userNameInput.value && userBirthdayInput.value) {
                    const step2 = document.getElementById('joinStep2');
                    const step3 = document.getElementById('joinStep3');
                    const displayName = document.getElementById('displayUserName');

                    console.log('step2:', step2, 'step3:', step3);

                    if (step2 && step3) {
                        step2.classList.remove('active');
                        step3.classList.add('active');
                        if (displayName) {
                            displayName.textContent = userNameInput.value;
                        }
                        console.log('단계 2 -> 3 전환 완료');
                        window.scrollTo(0, 0);
                    }
                } else {
                    alert('이름과 생년월일을 모두 입력해주세요.');
                }
            }
        });
    } else {
        console.log('nextStep2 버튼을 찾을 수 없음');
    }

    // 회원가입 단계 3 - 인증번호 발송
    const sendJoinVerifyBtn = document.getElementById('sendJoinVerifyBtn');
    const verifyNotice = document.getElementById('verifyNotice');

    if (sendJoinVerifyBtn) {
        sendJoinVerifyBtn.addEventListener('click', function() {
            const phone = document.getElementById('joinPhone').value;
            if (phone) {
                alert('인증번호가 발송되었습니다.');
                if (verifyNotice) {
                    verifyNotice.style.display = 'block';
                }
            } else {
                alert('연락처를 입력해주세요.');
            }
        });
    }

    // 회원가입 완료
    const completeJoin = document.getElementById('completeJoin');
    if (completeJoin) {
        completeJoin.addEventListener('click', function() {
            const phone = document.getElementById('joinPhone').value;
            const code = document.getElementById('joinVerifyCode').value;

            if (phone && code) {
                alert('회원가입이 완료되었습니다!');
                window.location.href = '01_main.html';
            } else {
                alert('모든 정보를 입력해주세요.');
            }
        });
    }

    // ==================== 마이페이지 기능 ====================

    // 마이페이지 뒤로가기
    const backFromMypage = document.getElementById('backFromMypage');
    if (backFromMypage) {
        backFromMypage.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 아코디언 토글 기능
    const accordionHeaders = document.querySelectorAll('.mypage-accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const parentItem = this.closest('.mypage-accordion-item');
                const isActive = parentItem.classList.contains('active');

                // 모든 아코디언 닫기
                document.querySelectorAll('.mypage-accordion-item').forEach(item => {
                    item.classList.remove('active');
                });

                // 클릭한 아코디언 열기 (이미 열려있었다면 닫기)
                if (!isActive) {
                    parentItem.classList.add('active');
                }
            });
        });

        console.log('마이페이지 아코디언 이벤트 리스너 등록 완료');
    }

    // 네비게이션 바 - 마이페이지
    const navMypage = document.getElementById('navMypage');
    if (navMypage) {
        navMypage.addEventListener('click', function() {
            window.location.href = '01_mypage.html';
        });
    }

    // 마이페이지 - 추억 인연 수정하기 버튼
    const editMemoryBtn = document.getElementById('editMemoryBtn');
    if (editMemoryBtn) {
        editMemoryBtn.addEventListener('click', function() {
            window.location.href = '01_list_edit.html';
        });
    }

    // 마이페이지 - 인연 추가하기 버튼
    const mypageAddConnectionBtn = document.getElementById('addConnectionBtn');
    if (mypageAddConnectionBtn) {
        mypageAddConnectionBtn.addEventListener('click', function() {
            window.location.href = 'peopleplus.html';
        });
    }

    // 마이페이지 - 프로필 사진 수정 기능
    const mypageProfileImage = document.querySelector('.mypage-profile-image');
    const mypageProfilePlaceholder = document.querySelector('.mypage-profile-placeholder');
    const mypageEditProfileBtn = document.querySelector('.mypage-edit-profile-btn');
    const mypageProfileImageInput = document.getElementById('mypageProfileImageInput');

    // 저장된 프로필 사진 불러오기
    if (mypageProfileImage && mypageProfilePlaceholder) {
        const userProfile = JSON.parse(localStorage.getItem('mynokUserProfile') || '{}');
        if (userProfile.profilePhoto) {
            mypageProfileImage.src = userProfile.profilePhoto;
            mypageProfileImage.style.display = 'block';
            mypageProfilePlaceholder.style.display = 'none';
            mypageProfileImage.onerror = null; // onerror 제거하여 저장된 이미지 유지
        }
    }

    // 프로필 사진 수정 버튼 클릭
    if (mypageEditProfileBtn && mypageProfileImageInput) {
        mypageEditProfileBtn.addEventListener('click', function() {
            mypageProfileImageInput.click();
        });
    }

    // 프로필 사진 업로드 처리
    if (mypageProfileImageInput && mypageProfileImage && mypageProfilePlaceholder) {
        mypageProfileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        // 이미지 리사이징 (최대 600x600, 품질 0.6)
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        const maxWidth = 600;
                        const maxHeight = 600;

                        // 비율 유지하면서 리사이징
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // JPEG 품질을 낮춰서 압축
                        const resizedImage = canvas.toDataURL('image/jpeg', 0.6);

                        // 프로필 이미지 업데이트
                        mypageProfileImage.src = resizedImage;
                        mypageProfileImage.style.display = 'block';
                        mypageProfilePlaceholder.style.display = 'none';

                        // localStorage에 저장
                        const userProfile = JSON.parse(localStorage.getItem('mynokUserProfile') || '{}');
                        userProfile.profilePhoto = resizedImage;
                        localStorage.setItem('mynokUserProfile', JSON.stringify(userProfile));

                        console.log('마이페이지 프로필 사진 저장 완료');
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 네비게이션 바 - 마이노크홈
    const navHome = document.getElementById('navHome');
    if (navHome) {
        navHome.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 네비게이션 바 - 캘린더
    const navCalendar = document.getElementById('navCalendar');
    if (navCalendar) {
        navCalendar.addEventListener('click', function() {
            window.location.href = '03_calendar.html';
        });
    }

    // ==================== 추억 지우기 페이지 기능 ====================

    // 추억 지우기 페이지 뒤로가기
    const backFromRemove = document.getElementById('backFromRemove');
    if (backFromRemove) {
        backFromRemove.addEventListener('click', function() {
            window.location.href = '01_mypage.html';
        });
    }

    // 추억 지우기 페이지 인연 목록 렌더링
    const removeConnectionsList = document.getElementById('removeConnectionsList');
    if (removeConnectionsList) {
        const connections = getConnections();

        // 가나다 순으로 정렬
        connections.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        connections.forEach((connection, index) => {
            const removeItem = document.createElement('div');
            removeItem.className = 'remove-connection-item';
            removeItem.dataset.index = index;

            // 아바타 이미지
            let avatarHtml;
            if (connection.avatar) {
                avatarHtml = `<img src="${connection.avatar}" alt="${connection.name}" class="remove-connection-avatar">`;
            } else {
                avatarHtml = `<div class="remove-connection-avatar placeholder"></div>`;
            }

            // 생일 텍스트
            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : `생일 ${connection.birthday}`;

            // 추억 개수 계산
            const memoriesCount = calculateMemoriesCount(connection.name);

            removeItem.innerHTML = `
                <div class="remove-checkbox-container">
                    <input type="checkbox" class="remove-checkbox" data-index="${index}">
                </div>
                <div class="remove-connection-content">
                    ${avatarHtml}
                    <div class="remove-connection-info">
                        <h3 class="remove-connection-name">${connection.name}</h3>
                        <p class="remove-connection-details">${birthdayText} · 추억 ${memoriesCount}개</p>
                    </div>
                </div>
            `;

            removeConnectionsList.appendChild(removeItem);
        });

        // 체크박스 선택 이벤트
        const checkboxes = document.querySelectorAll('.remove-checkbox');
        const removeSubmitBtn = document.getElementById('removeSubmitBtn');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const item = this.closest('.remove-connection-item');
                if (this.checked) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }

                // 버튼 활성화/비활성화
                const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                if (removeSubmitBtn) {
                    removeSubmitBtn.disabled = !anyChecked;
                }
            });
        });

        // 초기 버튼 비활성화
        if (removeSubmitBtn) {
            removeSubmitBtn.disabled = true;
        }

        console.log('추억 지우기 페이지 렌더링 완료:', connections.length, '명');
    }

    // 삭제 버튼 클릭 이벤트
    const removeSubmitBtn = document.getElementById('removeSubmitBtn');
    if (removeSubmitBtn) {
        removeSubmitBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.remove-checkbox:checked');

            if (checkboxes.length === 0) {
                alert('목록에서 정리할 인연을 선택해주세요.');
                return;
            }

            // 선택된 인연 이름 목록
            const selectedNames = Array.from(checkboxes).map(cb => {
                const index = parseInt(cb.dataset.index);
                const connections = getConnections();
                return connections[index].name;
            }).join(', ');

            // 확인 메시지
            const confirmed = confirm(`${selectedNames} 님을 목록에서 정리하시겠습니까?\n\n언제든 다시 추가하실 수 있습니다.`);

            if (confirmed) {
                // 삭제할 인덱스 수집 (큰 것부터 삭제해야 인덱스 꼬임 방지)
                const indicesToRemove = Array.from(checkboxes)
                    .map(cb => parseInt(cb.dataset.index))
                    .sort((a, b) => b - a);

                // localStorage에서 삭제
                const connections = getConnections();
                indicesToRemove.forEach(index => {
                    connections.splice(index, 1);
                });
                localStorage.setItem('mynokConnections', JSON.stringify(connections));

                console.log('삭제 완료:', indicesToRemove.length, '명');
                alert('목록에서 정리되었습니다.');
                window.location.href = '01_main.html';
            }
        });
    }

    // ==================== 추억 페이지 기능 ====================

    // 추억 페이지 동적 렌더링
    const headerName = document.getElementById('headerName');
    if (headerName) {
        // URL 파라미터에서 이름 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const personName = urlParams.get('name');

        if (personName) {
            // localStorage에서 해당 인연 정보 찾기
            const connections = getConnections();
            const person = connections.find(c => c.name === personName);

            if (person) {
                // 페이지 타이틀
                document.getElementById('pageTitle').textContent = `${person.name} - 마이노크`;

                // 헤더 이름
                document.getElementById('headerName').textContent = person.name;

                // 배너 이름
                document.getElementById('bannerName').textContent = person.name;

                // 배너 추억 개수 (실제 사진, 동영상, 편지 개수)
                const memoriesCount = calculateMemoriesCount(person.name);
                document.getElementById('bannerDays').textContent = `${memoriesCount}개`;

                // 초기 상태 텍스트 설정
                // 반려동물, 추모 인연, 또는 연락처 없는 경우 간직중으로 표시
                const shareToggleElement = document.getElementById('shareToggle');
                const isShareable = person.connectionType === 'person' && person.contact !== '정보 없음';

                if (isShareable) {
                    // 공유 가능 - 공유중으로 초기화
                    document.getElementById('bannerStatus').textContent = '공유중이에요';
                    if (shareToggleElement) {
                        shareToggleElement.classList.add('active');
                    }

                    // share-label 텍스트 업데이트
                    const shareLabel = document.querySelector('.share-label');
                    if (shareLabel) {
                        shareLabel.textContent = '공유중';
                        shareLabel.style.color = '#FF7474';
                    }
                } else {
                    // 공유 불가 - 간직중으로 초기화
                    document.getElementById('bannerStatus').textContent = '간직중이에요';
                    if (shareToggleElement) {
                        shareToggleElement.classList.remove('active');
                    }

                    // share-label 텍스트 업데이트
                    const shareLabel = document.querySelector('.share-label');
                    if (shareLabel) {
                        shareLabel.textContent = '간직중';
                        shareLabel.style.color = '#999';
                    }

                    // 토글 비활성화
                    if (shareToggleElement) {
                        shareToggleElement.style.opacity = '0.5';
                        shareToggleElement.style.cursor = 'not-allowed';
                        shareToggleElement.title = person.connectionType === 'pet'
                            ? '반려동물과의 추억은 마음으로 간직해요 🐾'
                            : '추억을 소중히 간직하고 있어요 💝';
                    }
                }

                // 프로필 이미지
                const profileImg = document.getElementById('profileImg');
                if (person.avatar) {
                    profileImg.src = person.avatar;
                } else {
                    // 기본 이미지 설정 (없으면 placeholder)
                    profileImg.src = '../img/00_로고.png';
                    profileImg.style.objectFit = 'contain';
                    profileImg.style.padding = '20px';
                }
                profileImg.alt = person.name;

                // 추억 타입 타이틀
                document.getElementById('memoryTypesTitle').textContent = `나와 ${person.name}의 추억에는`;

                console.log('추억 페이지 렌더링 완료:', person.name);
            } else {
                alert('해당 인연을 찾을 수 없습니다.');
                window.location.href = '01_main.html';
            }
        } else {
            alert('잘못된 접근입니다.');
            window.location.href = '01_main.html';
        }
    }

    // 추억 페이지 뒤로가기
    const backFromMemory = document.getElementById('backFromMemory');
    if (backFromMemory) {
        backFromMemory.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 공유 토글 스위치
    const shareToggle = document.getElementById('shareToggle');
    const shareModalOverlay = document.getElementById('shareModalOverlay');
    const modalBtnYes = document.getElementById('modalBtnYes'); // 아니요 (취소)
    const modalBtnNo = document.getElementById('modalBtnNo'); // 네 (확인)

    if (shareToggle) {
        shareToggle.addEventListener('click', function() {
            // 공유 불가 인연인 경우 클릭 무시
            if (this.style.cursor === 'not-allowed') {
                return;
            }

            // 공유중 → 간직중으로 변경하려는 경우 모달 표시
            if (this.classList.contains('active')) {
                shareModalOverlay.classList.add('active');
            } else {
                // 간직중 → 공유중으로 변경 (바로 변경)
                this.classList.add('active');
                const shareLabel = document.querySelector('.share-label');
                shareLabel.textContent = '공유중';
                shareLabel.style.color = '#FF7474';

                // 배너 상태 텍스트 업데이트
                const bannerStatus = document.getElementById('bannerStatus');
                if (bannerStatus) {
                    bannerStatus.textContent = '공유중이에요';
                }
            }
        });

        console.log('추억 페이지 토글 스위치 등록 완료');
    }

    // 모달 - "네" 버튼 (간직중으로 변경)
    if (modalBtnNo) {
        modalBtnNo.addEventListener('click', function() {
            shareToggle.classList.remove('active');
            const shareLabel = document.querySelector('.share-label');
            shareLabel.textContent = '간직중';
            shareLabel.style.color = '#999';
            shareModalOverlay.classList.remove('active');

            // 배너 상태 텍스트 업데이트
            const bannerStatus = document.getElementById('bannerStatus');
            if (bannerStatus) {
                bannerStatus.textContent = '간직중이에요';
            }
        });
    }

    // 모달 - "아니요" 버튼 (취소)
    if (modalBtnYes) {
        modalBtnYes.addEventListener('click', function() {
            shareModalOverlay.classList.remove('active');
        });
    }

    // 모달 오버레이 클릭 시 닫기
    if (shareModalOverlay) {
        shareModalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }

    // ===== 그룹 만들기 기능 =====

    // 메인 페이지에서 새 그룹 만들기 버튼 클릭
    const addGroupBtn = document.getElementById('addGroupBtn');
    if (addGroupBtn) {
        addGroupBtn.addEventListener('click', function() {
            window.location.href = 'new_group.html';
        });
    }

    // 그룹 만들기 페이지 - 뒤로 가기 버튼
    const backFromNewGroup = document.getElementById('backFromNewGroup');
    if (backFromNewGroup) {
        backFromNewGroup.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 그룹 만들기 페이지 로직
    const memberSelectionList = document.getElementById('memberSelectionList');
    const memberSearch = document.getElementById('memberSearch');
    const selectedMembersContainer = document.getElementById('selectedMembersContainer');
    const selectedCount = document.getElementById('selectedCount');
    const memoryKeeperSelect = document.getElementById('memoryKeeper');
    const newGroupForm = document.getElementById('newGroupForm');

    let selectedMembers = []; // 선택된 멤버 ID 목록

    // 멤버 선택 리스트 렌더링
    function renderMemberSelectionList(searchQuery = '') {
        if (!memberSelectionList) return;

        const connections = getConnections();
        memberSelectionList.innerHTML = '';

        // 검색 필터링
        const filteredConnections = connections.filter(conn =>
            conn.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredConnections.length === 0) {
            memberSelectionList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">검색 결과가 없습니다.</p>';
            return;
        }

        // 가나다 순으로 정렬
        filteredConnections.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        filteredConnections.forEach((connection, index) => {
            const item = document.createElement('div');
            item.className = 'member-checkbox-item';
            if (selectedMembers.includes(connection.name)) {
                item.classList.add('selected');
            }

            const avatarHtml = connection.avatar
                ? `<div class="member-checkbox-avatar"><img src="${connection.avatar}" alt="${connection.name}"></div>`
                : `<div class="member-checkbox-avatar placeholder"></div>`;

            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : connection.birthday;

            item.innerHTML = `
                <input type="checkbox" class="member-checkbox" data-name="${connection.name}" ${selectedMembers.includes(connection.name) ? 'checked' : ''}>
                ${avatarHtml}
                <div class="member-checkbox-info">
                    <div class="member-checkbox-name">${connection.name}</div>
                    <div class="member-checkbox-detail">${birthdayText}</div>
                </div>
            `;

            // 체크박스 및 아이템 클릭 이벤트
            const checkbox = item.querySelector('.member-checkbox');

            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                toggleMemberSelection(connection.name, checkbox.checked);
            });

            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMemberSelection(connection.name, this.checked);
            });

            memberSelectionList.appendChild(item);
        });
    }

    // 멤버 선택/해제 토글
    function toggleMemberSelection(memberName, isSelected) {
        if (isSelected) {
            // 공유 불가 인연인지 확인
            const connections = getConnections();
            const connection = connections.find(c => c.name === memberName);

            if (connection) {
                const isShareable = connection.connectionType === 'person' && connection.contact !== '정보 없음';

                if (!isShareable) {
                    // 공유 불가 인연 - 경고 메시지 표시
                    let message = '';
                    if (connection.connectionType === 'pet') {
                        message = `${memberName}님과의 추억은 개인적으로 소중히 간직하시는 걸 추천드려요 🐾`;
                    } else {
                        message = `${memberName}님과의 추억은 개인적으로 소중히 간직하시는 걸 추천드려요 💝\n\n그룹 편지 공유를 원하시면 연락처를 추가해주세요.`;
                    }

                    alert(message);

                    // 체크박스 해제
                    const items = memberSelectionList.querySelectorAll('.member-checkbox-item');
                    items.forEach(item => {
                        const checkbox = item.querySelector('.member-checkbox');
                        if (checkbox.dataset.name === memberName) {
                            checkbox.checked = false;
                        }
                    });

                    return;
                }
            }

            if (!selectedMembers.includes(memberName)) {
                selectedMembers.push(memberName);
            }
        } else {
            selectedMembers = selectedMembers.filter(name => name !== memberName);
        }

        updateSelectedMembersDisplay();
        updateMemoryKeeperDropdown();

        // 아이템 스타일 업데이트
        const items = memberSelectionList.querySelectorAll('.member-checkbox-item');
        items.forEach(item => {
            const checkbox = item.querySelector('.member-checkbox');
            if (checkbox.dataset.name === memberName) {
                if (isSelected) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            }
        });
    }

    // 선택된 멤버 표시 업데이트
    function updateSelectedMembersDisplay() {
        if (!selectedMembersContainer || !selectedCount) return;

        selectedCount.textContent = selectedMembers.length;

        if (selectedMembers.length === 0) {
            selectedMembersContainer.innerHTML = '<p class="empty-message">선택된 멤버가 없습니다</p>';
            return;
        }

        selectedMembersContainer.innerHTML = '';
        selectedMembers.forEach(memberName => {
            const tag = document.createElement('div');
            tag.className = 'selected-member-tag';
            tag.innerHTML = `
                ${memberName}
                <button type="button" class="selected-member-remove" data-name="${memberName}">×</button>
            `;

            const removeBtn = tag.querySelector('.selected-member-remove');
            removeBtn.addEventListener('click', function() {
                const name = this.dataset.name;
                selectedMembers = selectedMembers.filter(n => n !== name);

                // 체크박스도 해제
                const checkbox = memberSelectionList.querySelector(`input[data-name="${name}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    checkbox.closest('.member-checkbox-item').classList.remove('selected');
                }

                updateSelectedMembersDisplay();
                updateMemoryKeeperDropdown();
            });

            selectedMembersContainer.appendChild(tag);
        });
    }

    // 추억장 드롭다운 업데이트
    function updateMemoryKeeperDropdown() {
        if (!memoryKeeperSelect) return;

        // 현재 선택된 값 저장
        const currentValue = memoryKeeperSelect.value;

        // 드롭다운 초기화
        memoryKeeperSelect.innerHTML = '<option value="me">나 (미소)</option>';

        // 선택된 멤버들 추가
        selectedMembers.forEach(memberName => {
            const option = document.createElement('option');
            option.value = memberName;
            option.textContent = memberName;
            memoryKeeperSelect.appendChild(option);
        });

        // 이전 선택값이 여전히 유효하면 복원
        if (currentValue !== 'me' && selectedMembers.includes(currentValue)) {
            memoryKeeperSelect.value = currentValue;
        }
    }

    // 멤버 검색
    if (memberSearch) {
        memberSearch.addEventListener('input', function() {
            renderMemberSelectionList(this.value);
        });
    }

    // 페이지 로드 시 멤버 리스트 렌더링
    if (memberSelectionList) {
        renderMemberSelectionList();
    }

    // 그룹 생성 폼 제출
    if (newGroupForm) {
        newGroupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const groupNameInput = document.getElementById('groupName');
            const groupName = groupNameInput.value.trim();

            if (!groupName) {
                alert('그룹 이름을 입력해주세요.');
                return;
            }

            const memoryKeeper = memoryKeeperSelect.value;

            // 그룹 데이터 생성
            const newGroup = {
                id: Date.now(),
                name: groupName,
                members: selectedMembers.length > 0 ? [...selectedMembers, '미소(나)'] : ['미소(나)'],
                memoryKeeper: memoryKeeper === 'me' ? '미소' : memoryKeeper,
                createdAt: new Date().toISOString()
            };

            // localStorage에 그룹 저장
            let groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
            groups.push(newGroup);
            localStorage.setItem('mynokGroups', JSON.stringify(groups));

            alert(`"${groupName}" 그룹이 생성되었습니다!`);
            window.location.href = '01_main.html';
        });
    }

    // ===== 추억 인연 수정하기 페이지 기능 =====

    // 뒤로 가기 버튼
    const backFromEdit = document.getElementById('backFromEdit');
    if (backFromEdit) {
        backFromEdit.addEventListener('click', function() {
            window.location.href = '01_mypage.html';
        });
    }

    // 탭 전환 기능
    const editConnectionTab = document.getElementById('connectionEditTab');
    const editGroupTab = document.getElementById('groupEditTab');
    const editInfoText = document.getElementById('editInfoText');

    if (document.getElementById('editConnectionsList') || document.getElementById('editGroupsList')) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');

                // 탭 버튼 활성화 상태 변경
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // 탭 내용 전환
                if (tab === 'connection') {
                    editConnectionTab.style.display = 'block';
                    editGroupTab.style.display = 'none';
                    editInfoText.textContent = '수정하거나 정리할 인연을 선택해주세요';
                } else if (tab === 'group') {
                    editConnectionTab.style.display = 'none';
                    editGroupTab.style.display = 'block';
                    editInfoText.textContent = '수정하거나 정리할 그룹을 선택해주세요';
                }

                // 선택 초기화
                selectedEditItems = [];
                updateEditButtons();
            });
        });
    }

    let selectedEditItems = []; // 선택된 항목 배열 { type: 'connection'|'group', id: ... }

    // 인연 목록 렌더링 (수정 페이지)
    function renderEditConnections() {
        const editConnectionsList = document.getElementById('editConnectionsList');
        if (!editConnectionsList) return;

        const connections = getConnections();
        editConnectionsList.innerHTML = '';

        if (connections.length === 0) {
            editConnectionsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">등록된 인연이 없습니다.</p>';
            return;
        }

        // 가나다 순으로 정렬
        connections.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        connections.forEach((connection, index) => {
            const item = document.createElement('div');
            item.className = 'remove-connection-item';
            item.dataset.name = connection.name;
            item.dataset.type = 'connection';

            // 아바타 이미지
            let avatarHtml;
            if (connection.avatar) {
                avatarHtml = `<img src="${connection.avatar}" alt="${connection.name}" class="remove-connection-avatar">`;
            } else {
                avatarHtml = `<div class="remove-connection-avatar placeholder"></div>`;
            }

            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : connection.birthday;

            // 추억 개수 계산
            const memoriesCount = calculateMemoriesCount(connection.name);

            item.innerHTML = `
                <input type="checkbox" class="remove-checkbox" data-name="${connection.name}" data-type="connection">
                ${avatarHtml}
                <div class="remove-connection-info">
                    <div class="remove-connection-name">${connection.name}</div>
                    <div class="remove-connection-details">${birthdayText} • 추억 ${memoriesCount}개</div>
                </div>
            `;

            const checkbox = item.querySelector('.remove-checkbox');

            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                toggleEditSelection(item, checkbox.checked, 'connection', connection.name);
            });

            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleEditSelection(item, this.checked, 'connection', connection.name);
            });

            editConnectionsList.appendChild(item);
        });
    }

    // 그룹 목록 렌더링 (수정 페이지)
    function renderEditGroups() {
        const editGroupsList = document.getElementById('editGroupsList');
        if (!editGroupsList) return;

        const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
        editGroupsList.innerHTML = '';

        if (groups.length === 0) {
            editGroupsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">등록된 그룹이 없습니다.</p>';
            return;
        }

        groups.forEach((group, index) => {
            const item = document.createElement('div');
            item.className = 'remove-connection-item';
            item.dataset.name = group.name;
            item.dataset.type = 'group';

            item.innerHTML = `
                <input type="checkbox" class="remove-checkbox" data-name="${group.name}" data-type="group">
                <div class="remove-connection-avatar">👥</div>
                <div class="remove-connection-info">
                    <div class="remove-connection-name">${group.name}</div>
                    <div class="remove-connection-details">멤버 ${group.members.length}명 • 추억장: ${group.memoryKeeper}</div>
                </div>
            `;

            const checkbox = item.querySelector('.remove-checkbox');

            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                toggleEditSelection(item, checkbox.checked, 'group', group.name);
            });

            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleEditSelection(item, this.checked, 'group', group.name);
            });

            editGroupsList.appendChild(item);
        });
    }

    // 선택 토글
    function toggleEditSelection(item, isSelected, type, name) {
        if (isSelected) {
            item.classList.add('selected');
            if (!selectedEditItems.find(i => i.type === type && i.name === name)) {
                selectedEditItems.push({ type, name });
            }
        } else {
            item.classList.remove('selected');
            selectedEditItems = selectedEditItems.filter(i => !(i.type === type && i.name === name));
        }

        updateEditButtons();
    }

    // 버튼 활성화 상태 업데이트
    function updateEditButtons() {
        const editBtn = document.getElementById('editSubmitBtn');
        const deleteBtn = document.getElementById('deleteSubmitBtn');

        if (!editBtn || !deleteBtn) return;

        // 정확히 하나만 선택되었을 때만 수정 버튼 활성화
        if (selectedEditItems.length === 1) {
            editBtn.disabled = false;
        } else {
            editBtn.disabled = true;
        }

        // 하나 이상 선택되었을 때 삭제 버튼 활성화
        if (selectedEditItems.length > 0) {
            deleteBtn.disabled = false;
        } else {
            deleteBtn.disabled = true;
        }
    }

    // 페이지 로드 시 목록 렌더링
    if (document.getElementById('editConnectionsList')) {
        renderEditConnections();
        renderEditGroups();
        updateEditButtons();
    }

    // 수정 버튼 클릭
    const editSubmitBtn = document.getElementById('editSubmitBtn');
    if (editSubmitBtn) {
        editSubmitBtn.addEventListener('click', function() {
            if (selectedEditItems.length !== 1) {
                alert('수정할 항목을 하나만 선택해주세요.');
                return;
            }

            const item = selectedEditItems[0];

            if (item.type === 'connection') {
                // 인연 수정 - peopleplus.html로 이동
                const connections = getConnections();
                const connection = connections.find(conn => conn.name === item.name);

                if (!connection) {
                    alert('해당 인연을 찾을 수 없습니다.');
                    return;
                }

                // URL 파라미터로 수정 모드와 데이터 전달
                const params = new URLSearchParams({
                    mode: 'edit',
                    name: connection.name,
                    birthday: connection.birthday,
                    contact: connection.contact || '',
                    memories: connection.memories
                });

                window.location.href = `peopleplus.html?${params.toString()}`;
            } else if (item.type === 'group') {
                // 그룹 수정 - edit_group.html로 이동
                window.location.href = `edit_group.html?name=${encodeURIComponent(item.name)}`;
            }
        });
    }

    // 삭제 버튼 클릭
    const deleteSubmitBtn = document.getElementById('deleteSubmitBtn');
    if (deleteSubmitBtn) {
        deleteSubmitBtn.addEventListener('click', function() {
            if (selectedEditItems.length === 0) {
                alert('목록에서 정리할 항목을 선택해주세요.');
                return;
            }

            const confirmMsg = selectedEditItems.length === 1
                ? '선택한 항목을 목록에서 정리하시겠습니까?\n\n언제든 다시 추가하실 수 있습니다.'
                : `선택한 ${selectedEditItems.length}개 항목을 목록에서 정리하시겠습니까?\n\n언제든 다시 추가하실 수 있습니다.`;

            if (!confirm(confirmMsg)) {
                return;
            }

            // 인연 삭제
            const connectionNames = selectedEditItems
                .filter(item => item.type === 'connection')
                .map(item => item.name);

            console.log('삭제할 인연 이름들:', connectionNames);

            if (connectionNames.length > 0) {
                const connections = getConnections();
                console.log('삭제 전 인연 목록:', connections.map(c => c.name));
                const updatedConnections = connections.filter(conn => !connectionNames.includes(conn.name));
                console.log('삭제 후 인연 목록:', updatedConnections.map(c => c.name));
                localStorage.setItem('mynokConnections', JSON.stringify(updatedConnections));
            }

            // 그룹 삭제
            const groupNames = selectedEditItems
                .filter(item => item.type === 'group')
                .map(item => item.name);

            if (groupNames.length > 0) {
                const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
                const updatedGroups = groups.filter(group => !groupNames.includes(group.name));
                localStorage.setItem('mynokGroups', JSON.stringify(updatedGroups));
            }

            alert('목록에서 정리되었습니다.');
            window.location.href = '01_main.html';
        });
    }

    // ===== 그룹 수정 페이지 기능 =====

    // 뒤로 가기 버튼
    const backFromEditGroup = document.getElementById('backFromEditGroup');
    if (backFromEditGroup) {
        backFromEditGroup.addEventListener('click', function() {
            window.location.href = '01_list_edit.html';
        });
    }

    const editGroupForm = document.getElementById('editGroupForm');
    const editGroupName = document.getElementById('editGroupName');
    const editMemberSearch = document.getElementById('editMemberSearch');
    const editMemberSelectionList = document.getElementById('editMemberSelectionList');
    const editSelectedMembersContainer = document.getElementById('editSelectedMembersContainer');
    const editSelectedCount = document.getElementById('editSelectedCount');
    const editMemoryKeeper = document.getElementById('editMemoryKeeper');
    const editGroupProfileImage = document.getElementById('editGroupProfileImage');
    const editGroupUploadPreview = document.getElementById('editGroupUploadPreview');
    const editGroupUploadIcon = document.getElementById('editGroupUploadIcon');

    let editingGroupName = null;
    let editSelectedMembers = [];
    let editGroupProfileImageData = null;

    // URL에서 그룹 이름 가져오기 및 데이터 로드
    if (editGroupForm) {
        const urlParams = new URLSearchParams(window.location.search);
        editingGroupName = urlParams.get('name');

        if (editingGroupName) {
            const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
            const group = groups.find(g => g.name === editingGroupName);

            if (group) {
                // 폼에 기존 데이터 채우기
                editGroupName.value = group.name;

                // 기존 프로필 이미지 표시
                if (group.profileImage && editGroupUploadPreview && editGroupUploadIcon) {
                    editGroupUploadPreview.src = group.profileImage;
                    editGroupUploadPreview.style.display = 'block';
                    editGroupUploadIcon.style.display = 'none';
                    editGroupProfileImageData = group.profileImage;
                }

                // 멤버 리스트에서 '미소(나)' 제외하고 초기화
                // 새 구조(객체)와 기존 구조(문자열) 모두 지원
                editSelectedMembers = group.members
                    .filter(m => {
                        const memberName = typeof m === 'string' ? m : m.name;
                        return memberName !== '미소(나)' && memberName !== '미소';
                    })
                    .map(m => typeof m === 'string' ? m : m.name);

                // 멤버 선택 리스트 렌더링
                renderEditMemberSelectionList();

                // 선택된 멤버 표시 업데이트
                updateEditSelectedMembersDisplay();

                // 추억장 드롭다운 업데이트
                updateEditMemoryKeeperDropdown();

                // 현재 추억장 설정
                if (group.memoryKeeper === '미소') {
                    editMemoryKeeper.value = 'me';
                } else if (editSelectedMembers.includes(group.memoryKeeper)) {
                    editMemoryKeeper.value = group.memoryKeeper;
                }
            }
        }
    }

    // 멤버 선택 리스트 렌더링 (수정 모드)
    function renderEditMemberSelectionList(searchQuery = '') {
        if (!editMemberSelectionList) return;

        const connections = getConnections();
        editMemberSelectionList.innerHTML = '';

        const filteredConnections = connections.filter(conn =>
            conn.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredConnections.length === 0) {
            editMemberSelectionList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">검색 결과가 없습니다.</p>';
            return;
        }

        // 가나다 순으로 정렬
        filteredConnections.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        filteredConnections.forEach((connection) => {
            const item = document.createElement('div');
            item.className = 'member-checkbox-item';
            if (editSelectedMembers.includes(connection.name)) {
                item.classList.add('selected');
            }

            const avatarHtml = connection.avatar
                ? `<div class="member-checkbox-avatar"><img src="${connection.avatar}" alt="${connection.name}"></div>`
                : `<div class="member-checkbox-avatar placeholder"></div>`;

            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : connection.birthday;

            item.innerHTML = `
                <input type="checkbox" class="member-checkbox" data-name="${connection.name}" ${editSelectedMembers.includes(connection.name) ? 'checked' : ''}>
                ${avatarHtml}
                <div class="member-checkbox-info">
                    <div class="member-checkbox-name">${connection.name}</div>
                    <div class="member-checkbox-detail">${birthdayText}</div>
                </div>
            `;

            const checkbox = item.querySelector('.member-checkbox');

            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                toggleEditMemberSelection(connection.name, checkbox.checked);
            });

            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleEditMemberSelection(connection.name, this.checked);
            });

            editMemberSelectionList.appendChild(item);
        });
    }

    // 멤버 선택/해제 토글 (수정 모드)
    function toggleEditMemberSelection(memberName, isSelected) {
        if (isSelected) {
            // 공유 불가 인연인지 확인
            const connections = getConnections();
            const connection = connections.find(c => c.name === memberName);

            if (connection) {
                const isShareable = connection.connectionType === 'person' && connection.contact !== '정보 없음';

                if (!isShareable) {
                    // 공유 불가 인연 - 경고 메시지 표시
                    let message = '';
                    if (connection.connectionType === 'pet') {
                        message = `${memberName}님과의 추억은 개인적으로 소중히 간직하시는 걸 추천드려요 🐾`;
                    } else {
                        message = `${memberName}님과의 추억은 개인적으로 소중히 간직하시는 걸 추천드려요 💝\n\n그룹 편지 공유를 원하시면 연락처를 추가해주세요.`;
                    }

                    alert(message);

                    // 체크박스 해제
                    const items = editMemberSelectionList.querySelectorAll('.member-checkbox-item');
                    items.forEach(item => {
                        const checkbox = item.querySelector('.member-checkbox');
                        if (checkbox.dataset.name === memberName) {
                            checkbox.checked = false;
                        }
                    });

                    return;
                }
            }

            if (!editSelectedMembers.includes(memberName)) {
                editSelectedMembers.push(memberName);
            }
        } else {
            editSelectedMembers = editSelectedMembers.filter(name => name !== memberName);
        }

        updateEditSelectedMembersDisplay();
        updateEditMemoryKeeperDropdown();

        // 아이템 스타일 업데이트
        const items = editMemberSelectionList.querySelectorAll('.member-checkbox-item');
        items.forEach(item => {
            const checkbox = item.querySelector('.member-checkbox');
            if (checkbox.dataset.name === memberName) {
                if (isSelected) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            }
        });
    }

    // 선택된 멤버 표시 업데이트 (수정 모드)
    function updateEditSelectedMembersDisplay() {
        if (!editSelectedMembersContainer || !editSelectedCount) return;

        editSelectedCount.textContent = editSelectedMembers.length;

        if (editSelectedMembers.length === 0) {
            editSelectedMembersContainer.innerHTML = '<p class="empty-message">선택된 멤버가 없습니다</p>';
            return;
        }

        editSelectedMembersContainer.innerHTML = '';
        editSelectedMembers.forEach(memberName => {
            const tag = document.createElement('div');
            tag.className = 'selected-member-tag';
            tag.innerHTML = `
                ${memberName}
                <button type="button" class="selected-member-remove" data-name="${memberName}">×</button>
            `;

            const removeBtn = tag.querySelector('.selected-member-remove');
            removeBtn.addEventListener('click', function() {
                const name = this.dataset.name;
                editSelectedMembers = editSelectedMembers.filter(n => n !== name);

                const checkbox = editMemberSelectionList.querySelector(`input[data-name="${name}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    checkbox.closest('.member-checkbox-item').classList.remove('selected');
                }

                updateEditSelectedMembersDisplay();
                updateEditMemoryKeeperDropdown();
            });

            editSelectedMembersContainer.appendChild(tag);
        });
    }

    // 추억장 드롭다운 업데이트 (수정 모드)
    function updateEditMemoryKeeperDropdown() {
        if (!editMemoryKeeper) return;

        const currentValue = editMemoryKeeper.value;

        editMemoryKeeper.innerHTML = '<option value="me">나 (미소)</option>';

        editSelectedMembers.forEach(memberName => {
            const option = document.createElement('option');
            option.value = memberName;
            option.textContent = memberName;
            editMemoryKeeper.appendChild(option);
        });

        // 이전 선택값이 여전히 유효하면 복원
        if (currentValue !== 'me' && editSelectedMembers.includes(currentValue)) {
            editMemoryKeeper.value = currentValue;
        }
    }

    // 그룹 프로필 이미지 업로드 (수정 모드)
    if (editGroupProfileImage && editGroupUploadPreview && editGroupUploadIcon) {
        editGroupProfileImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        // 이미지 리사이징
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        const maxWidth = 600;
                        const maxHeight = 600;

                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        const resizedImage = canvas.toDataURL('image/jpeg', 0.6);

                        // 미리보기 표시
                        editGroupUploadPreview.src = resizedImage;
                        editGroupUploadPreview.style.display = 'block';
                        editGroupUploadIcon.style.display = 'none';

                        // 데이터 저장
                        editGroupProfileImageData = resizedImage;
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 멤버 검색 (수정 모드)
    if (editMemberSearch) {
        editMemberSearch.addEventListener('input', function() {
            renderEditMemberSelectionList(this.value);
        });
    }

    // 그룹 수정 폼 제출
    if (editGroupForm) {
        editGroupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const groupName = editGroupName.value.trim();

            if (!groupName) {
                alert('그룹 이름을 입력해주세요.');
                return;
            }

            const memoryKeeper = editMemoryKeeper.value;

            // 그룹 데이터 업데이트
            const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
            const groupIndex = groups.findIndex(g => g.name === editingGroupName);

            if (groupIndex !== -1) {
                // 멤버를 객체 배열로 변환
                const membersArray = editSelectedMembers.map(name => ({
                    name: name,
                    relation: '그룹 멤버',
                    profileImage: ''
                }));

                // 나(미소) 추가
                membersArray.push({
                    name: '미소',
                    relation: '나',
                    profileImage: ''
                });

                groups[groupIndex] = {
                    ...groups[groupIndex],
                    name: groupName,
                    members: membersArray,
                    memoryKeeper: memoryKeeper === 'me' ? '미소' : memoryKeeper,
                    profileImage: editGroupProfileImageData || groups[groupIndex].profileImage || '',
                    updatedAt: new Date().toISOString()
                };

                localStorage.setItem('mynokGroups', JSON.stringify(groups));

                alert(`"${groupName}" 그룹이 수정되었습니다!`);
                window.location.href = '01_main.html';
            } else {
                alert('그룹을 찾을 수 없습니다.');
            }
        });
    }

    // ==================== 문장이 있어 (Letter) 페이지 기능 ====================

    // 02_memory.html에서 "문장이 있어" 버튼 클릭
    const memoryTypeItems = document.querySelectorAll('.memory-type-item');
    if (memoryTypeItems.length > 0) {
        memoryTypeItems.forEach(item => {
            const label = item.querySelector('.memory-type-label');
            if (label && label.textContent === '문장이 있어') {
                item.addEventListener('click', function() {
                    // URL 파라미터에서 이름 가져오기
                    const urlParams = new URLSearchParams(window.location.search);
                    const personName = urlParams.get('name');

                    if (personName) {
                        window.location.href = `03_letter.html?name=${encodeURIComponent(personName)}`;
                    } else {
                        window.location.href = '03_letter.html';
                    }
                });
            }

            // "소리가 있어" 버튼 클릭
            if (label && label.textContent === '소리가 있어') {
                item.addEventListener('click', function() {
                    // URL 파라미터에서 이름 가져오기
                    const urlParams = new URLSearchParams(window.location.search);
                    const personName = urlParams.get('name');

                    if (personName) {
                        window.location.href = `04_voice.html?name=${encodeURIComponent(personName)}`;
                    } else {
                        window.location.href = '04_voice.html';
                    }
                });
            }

            // "사진이 있어" 버튼 클릭
            if (label && label.textContent === '사진이 있어') {
                item.addEventListener('click', function() {
                    // URL 파라미터에서 이름 가져오기
                    const urlParams = new URLSearchParams(window.location.search);
                    const personName = urlParams.get('name');

                    if (personName) {
                        window.location.href = `03_photo.html?name=${encodeURIComponent(personName)}`;
                    } else {
                        window.location.href = '03_photo.html';
                    }
                });
            }
        });
    }

    // 02_memory.html에서 "캘린더" 카드 클릭
    const memoryFeatureCards = document.querySelectorAll('.memory-feature-card');
    if (memoryFeatureCards.length > 0) {
        memoryFeatureCards.forEach(card => {
            const title = card.querySelector('.feature-card-title');
            if (title && title.textContent.trim() === '캘린더') {
                card.addEventListener('click', function() {
                    window.location.href = '03_calendar.html';
                });
            }
            // 장소별 추억 확인 카드 클릭
            if (title && (title.textContent.includes('장소별') || title.textContent.includes('추억 확인'))) {
                card.addEventListener('click', function() {
                    // URL 파라미터에서 인연 이름 가져오기
                    const urlParams = new URLSearchParams(window.location.search);
                    const connectionName = urlParams.get('name');

                    if (connectionName) {
                        window.location.href = `04_placephoto.html?connection=${encodeURIComponent(connectionName)}`;
                    } else {
                        alert('인연 정보를 찾을 수 없습니다.');
                        window.location.href = '02_memory.html';
                    }
                });
            }
        });
    }

    // letter.html 페이지 초기화
    const letterPersonName = document.getElementById('letterPersonName');
    if (letterPersonName) {
        // URL 파라미터에서 이름 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const personName = urlParams.get('name');

        if (personName) {
            letterPersonName.textContent = `${personName} 님과`;
        } else {
            letterPersonName.textContent = '소중한 인연과';
        }

        // localStorage 키 설정
        const letterStorageKey = personName ? `mynokLetters_${personName}` : 'mynokLetters';

        // 기본 편지 데이터 (샘플)
        const defaultLetters = [
            {
                id: 1,
                type: 'sent',
                recipient: personName || '강훈',
                date: '2025.03.15',
                title: '함께한 소중한 시간',
                content: '오늘은 날씨가 정말 좋았어. 함께 산책하며 이야기했던 시간들이 소중해. 너무 즐겁고 행복했어. 앞으로도 이런 추억들을 많이 만들어가고 싶어요. 오늘도 고마워요. 💙',
                pattern: 'hearts',
                photos: [],
                createdAt: new Date('2025-03-15').toISOString()
            },
            {
                id: 2,
                type: 'sent',
                recipient: personName || '강훈',
                date: '2024.12.25',
                title: '메리 크리스마스',
                content: '메리 크리스마스! 올해도 너와 함께 크리스마스를 보낼 수 있어서 그 다음 페이지 계속 많이 행복했어. 내년에도 우리 앞으로도 우리 같이 행복 보내보자. ✨',
                pattern: 'plain-pink',
                photos: [],
                createdAt: new Date('2024-12-25').toISOString()
            }
        ];

        // localStorage에서 편지 데이터 불러오기
        function getLetters() {
            const saved = localStorage.getItem(letterStorageKey);
            if (saved) {
                return JSON.parse(saved);
            }
            // 처음이면 기본 데이터 저장
            localStorage.setItem(letterStorageKey, JSON.stringify(defaultLetters));
            return defaultLetters;
        }

        // 편지 목록 렌더링
        function renderLetters(filterType = 'sent', searchQuery = '') {
            const letters = getLetters();
            const sentLetterList = document.getElementById('sentLetterList');
            const receivedLetterList = document.getElementById('receivedLetterList');

            // 필터링된 편지
            const filteredLetters = letters.filter(letter => {
                const matchesType = letter.type === filterType;
                const matchesSearch = !searchQuery ||
                    letter.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    letter.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (letter.title && letter.title.toLowerCase().includes(searchQuery.toLowerCase()));
                return matchesType && matchesSearch;
            });

            // 날짜순 정렬 (최신순)
            filteredLetters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // 해당 탭의 리스트 컨테이너
            const targetList = filterType === 'sent' ? sentLetterList : receivedLetterList;

            if (!targetList) return;

            targetList.innerHTML = '';

            if (filteredLetters.length === 0) {
                targetList.innerHTML = '<div class="letter-empty-message">아직 편지가 없습니다.<br>첫 편지를 작성해보세요!</div>';
                return;
            }

            filteredLetters.forEach(letter => {
                const letterCard = document.createElement('div');
                letterCard.className = 'letter-card';

                // 제목이 있으면 제목 표시, 없으면 내용만 표시
                const titleHtml = letter.title ? `<h4 class="letter-title">${letter.title}</h4>` : '';

                letterCard.innerHTML = `
                    <div class="letter-card-header">
                        <h3 class="letter-recipient">${letter.recipient}에게</h3>
                        <span class="letter-date">${letter.date}</span>
                    </div>
                    ${titleHtml}
                    <p class="letter-preview">${letter.content}</p>
                    <button class="letter-view-btn" data-letter-id="${letter.id}">편지 보기</button>
                `;

                targetList.appendChild(letterCard);
            });

            // 편지 보기 버튼 이벤트
            const viewButtons = targetList.querySelectorAll('.letter-view-btn');
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const letterId = this.getAttribute('data-letter-id');
                    alert(`편지 상세보기 기능은 추후 구현 예정입니다. (편지 ID: ${letterId})`);
                });
            });

            console.log('편지 목록 렌더링 완료:', filteredLetters.length, '개');
        }

        // 초기 렌더링
        renderLetters('sent');

        // 탭 전환
        const letterTabButtons = document.querySelectorAll('.letter-tab-btn');
        const sentLetterTab = document.getElementById('sentLetterTab');
        const receivedLetterTab = document.getElementById('receivedLetterTab');

        if (letterTabButtons.length > 0) {
            letterTabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabType = this.getAttribute('data-tab');

                    // 모든 탭 버튼 비활성화
                    letterTabButtons.forEach(btn => btn.classList.remove('active'));

                    // 클릭된 탭 버튼 활성화
                    this.classList.add('active');

                    // 탭 콘텐츠 전환
                    if (tabType === 'sent') {
                        sentLetterTab.style.display = 'block';
                        receivedLetterTab.style.display = 'none';
                        renderLetters('sent');
                    } else if (tabType === 'received') {
                        sentLetterTab.style.display = 'none';
                        receivedLetterTab.style.display = 'block';
                        renderLetters('received');
                    }
                });
            });
        }

        // 검색 기능
        const letterSearchInput = document.getElementById('letterSearchInput');
        if (letterSearchInput) {
            letterSearchInput.addEventListener('input', function() {
                const searchQuery = this.value;
                const activeTab = document.querySelector('.letter-tab-btn.active');
                const tabType = activeTab ? activeTab.getAttribute('data-tab') : 'sent';
                renderLetters(tabType, searchQuery);
            });
        }

        // 편지 쓰기 버튼
        const writeLetterBtn = document.getElementById('writeLetterBtn');
        if (writeLetterBtn) {
            writeLetterBtn.addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const personName = urlParams.get('name');

                if (personName) {
                    window.location.href = `letter_write.html?name=${encodeURIComponent(personName)}`;
                } else {
                    window.location.href = 'letter_write.html';
                }
            });
        }
    }

    // letter.html 뒤로가기 버튼
    const backFromLetter = document.getElementById('backFromLetter');
    if (backFromLetter) {
        backFromLetter.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const personName = urlParams.get('name');

            if (personName) {
                window.location.href = `02_memory.html?name=${encodeURIComponent(personName)}`;
            } else {
                window.location.href = '01_main.html';
            }
        });
    }

    // ==================== 편지 쓰기 (Letter Write) 페이지 기능 ====================

    const letterWriteForm = document.getElementById('letterWriteForm');
    if (letterWriteForm) {
        // URL 파라미터에서 이름 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const personName = urlParams.get('name');

        // 받는이 태그 렌더링
        const recipientTags = document.getElementById('recipientTags');
        let selectedRecipients = [];

        if (personName && recipientTags) {
            selectedRecipients = [personName];
            renderRecipientTags();
        }

        function renderRecipientTags() {
            if (!recipientTags) return;

            recipientTags.innerHTML = '';

            if (selectedRecipients.length === 0) {
                recipientTags.innerHTML = '<span style="color: #999; font-size: 14px;">받는이를 선택하세요</span>';
                return;
            }

            selectedRecipients.forEach((name, index) => {
                const tag = document.createElement('div');
                tag.className = 'recipient-tag';
                tag.innerHTML = `
                    ${name}
                    <button type="button" class="recipient-tag-remove" data-index="${index}">×</button>
                `;

                const removeBtn = tag.querySelector('.recipient-tag-remove');
                removeBtn.addEventListener('click', function() {
                    selectedRecipients.splice(index, 1);
                    renderRecipientTags();
                });

                recipientTags.appendChild(tag);
            });
        }

        // 받는이 검색 버튼
        const recipientSearchBtn = document.getElementById('recipientSearchBtn');
        if (recipientSearchBtn) {
            recipientSearchBtn.addEventListener('click', function() {
                const connections = getConnections();
                if (connections.length === 0) {
                    alert('추가된 인연이 없습니다.');
                    return;
                }

                // 간단한 선택 방식 (실제로는 모달이나 별도 페이지로 구현 가능)
                const names = connections.map(c => c.name).join('\n');
                const selected = prompt(`받는이를 선택하세요:\n\n${names}\n\n이름을 입력해주세요:`);

                if (selected && connections.some(c => c.name === selected)) {
                    if (!selectedRecipients.includes(selected)) {
                        selectedRecipients.push(selected);
                        renderRecipientTags();
                    }
                } else if (selected) {
                    alert('해당 인연을 찾을 수 없습니다.');
                }
            });
        }

        // 편지지 패턴 선택
        const patternBoxes = document.querySelectorAll('.letter-pattern-box');
        let selectedPattern = 'hearts'; // 기본 선택

        if (patternBoxes.length > 0) {
            // 첫 번째 패턴 기본 선택
            patternBoxes[0].classList.add('selected');

            patternBoxes.forEach(box => {
                box.addEventListener('click', function() {
                    // 모든 패턴 선택 해제
                    patternBoxes.forEach(b => b.classList.remove('selected'));

                    // 클릭한 패턴 선택
                    this.classList.add('selected');
                    selectedPattern = this.getAttribute('data-pattern');

                    console.log('선택된 패턴:', selectedPattern);
                });
            });
        }

        // 사진 업로드 기능
        const photoInputs = document.querySelectorAll('.photo-input');
        const uploadedPhotos = [];

        photoInputs.forEach((input, index) => {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onload = function(event) {
                        const photoPreview = document.getElementById(`photoPreview${index}`);
                        const photoLabel = input.parentElement.querySelector('.photo-label');

                        if (photoPreview && photoLabel) {
                            const img = photoPreview.querySelector('img');
                            img.src = event.target.result;
                            photoLabel.style.display = 'none';
                            photoPreview.style.display = 'block';

                            uploadedPhotos[index] = event.target.result;
                            console.log(`사진 ${index + 1} 업로드 완료`);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            });
        });

        // 사진 삭제 버튼
        const photoRemoveBtns = document.querySelectorAll('.photo-remove');
        photoRemoveBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const photoInput = document.getElementById(`photoInput${index}`);
                const photoPreview = document.getElementById(`photoPreview${index}`);
                const photoLabel = photoInput.parentElement.querySelector('.photo-label');

                if (photoInput && photoPreview && photoLabel) {
                    photoInput.value = '';
                    photoPreview.style.display = 'none';
                    photoLabel.style.display = 'flex';
                    uploadedPhotos[index] = null;

                    console.log(`사진 ${index + 1} 삭제`);
                }
            });
        });

        // 뒤로가기 버튼
        const letterCancelBtn = document.getElementById('letterCancelBtn');
        if (letterCancelBtn) {
            letterCancelBtn.addEventListener('click', function() {
                if (personName) {
                    window.location.href = `03_letter.html?name=${encodeURIComponent(personName)}`;
                } else {
                    window.location.href = '03_letter.html';
                }
            });
        }

        // 폼 제출 (편지 보내기)
        letterWriteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('letterTitle').value.trim();
            const content = document.getElementById('letterContent').value.trim();

            // 유효성 검사
            if (selectedRecipients.length === 0) {
                alert('받는이를 선택해주세요.');
                return;
            }

            if (!title) {
                alert('제목을 입력해주세요.');
                return;
            }

            if (!content) {
                alert('편지 내용을 입력해주세요.');
                return;
            }

            // 편지 데이터 생성
            const newLetter = {
                id: Date.now(),
                type: 'sent',
                recipient: selectedRecipients[0], // 첫 번째 받는이
                date: new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\. /g, '.').replace('.', '.'),
                title: title,
                content: content,
                pattern: selectedPattern,
                photos: uploadedPhotos.filter(p => p !== null && p !== undefined),
                createdAt: new Date().toISOString()
            };

            // localStorage에 저장
            const letterStorageKey = personName ? `mynokLetters_${personName}` : 'mynokLetters';
            let letters = JSON.parse(localStorage.getItem(letterStorageKey) || '[]');
            letters.push(newLetter);
            localStorage.setItem(letterStorageKey, JSON.stringify(letters));

            console.log('편지 저장 완료:', newLetter);

            alert(`${selectedRecipients[0]}님께 편지를 보냈습니다!`);

            // 편지 목록으로 이동
            if (personName) {
                window.location.href = `03_letter.html?name=${encodeURIComponent(personName)}`;
            } else {
                window.location.href = '03_letter.html';
            }
        });
    }

    // letter_write.html 뒤로가기 버튼
    const backFromLetterWrite = document.getElementById('backFromLetterWrite');
    if (backFromLetterWrite) {
        backFromLetterWrite.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const personName = urlParams.get('name');

            if (personName) {
                window.location.href = `03_letter.html?name=${encodeURIComponent(personName)}`;
            } else {
                window.location.href = '03_letter.html';
            }
        });
    }

    // ==================== 소리가 있어 페이지 기능 ====================

    // URL 파라미터에서 이름 가져오기
    const voicePageContainer = document.querySelector('.voice-greeting-section');
    if (voicePageContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const personName = urlParams.get('name');

        if (!personName) {
            alert('잘못된 접근입니다.');
            window.location.href = '01_main.html';
            return;
        }

        const connections = getConnections();
        const person = connections.find(c => c.name === personName);

        if (!person) {
            alert('인연을 찾을 수 없습니다.');
            window.location.href = '01_main.html';
            return;
        }

        // 프로필 이미지 설정
        const userProfileImage = document.getElementById('userProfileImage');
        const connectionProfileImage = document.getElementById('connectionProfileImage');
        const connectionProfileName = document.getElementById('connectionProfileName');

        // 미소 프로필 이미지 로드
        const voiceUserProfileImg = document.getElementById('voiceUserProfileImg');
        const voiceProfilePlaceholder = userProfileImage?.querySelector('.voice-profile-placeholder');
        if (voiceUserProfileImg && voiceProfilePlaceholder) {
            const userProfile = JSON.parse(localStorage.getItem('mynokUserProfile') || '{}');
            if (userProfile.profilePhoto) {
                voiceUserProfileImg.src = userProfile.profilePhoto;
                voiceUserProfileImg.style.display = 'block';
                voiceProfilePlaceholder.style.display = 'none';
                voiceUserProfileImg.onerror = null; // onerror 제거하여 저장된 이미지 유지
            }
        }

        // 상대방 프로필 설정
        if (person.avatar) {
            connectionProfileImage.style.backgroundImage = `url(${person.avatar})`;
        } else {
            connectionProfileImage.style.backgroundColor = '#f5f5f5';
        }

        if (connectionProfileName) {
            connectionProfileName.textContent = person.name;
        }

        // 반려동물인 경우 받은 음성함 탭 숨기기
        const receivedTab = document.getElementById('receivedTab');
        const sentTab = document.getElementById('sentTab');
        const receivedVoiceTab = document.getElementById('receivedVoiceTab');
        const sentVoiceTab = document.getElementById('sentVoiceTab');

        if (person.connectionType === 'pet') {
            // 받은 음성함 탭 숨기기
            if (receivedTab) {
                receivedTab.style.display = 'none';
            }
            // 보낸 음성함을 기본으로 표시
            if (sentTab) {
                sentTab.classList.add('active');
            }
            if (receivedVoiceTab) {
                receivedVoiceTab.style.display = 'none';
            }
            if (sentVoiceTab) {
                sentVoiceTab.style.display = 'block';
            }
        }

        // 음성 데이터 관리
        function getVoices() {
            const storageKey = `mynokVoices_${personName}`;
            const storedVoices = localStorage.getItem(storageKey);

            if (storedVoices) {
                return JSON.parse(storedVoices);
            }

            // 기본 음성 데이터
            const defaultVoices = [
                {
                    id: 1,
                    type: 'received',
                    sender: personName,
                    date: '2025.05.28',
                    duration: '24분 47초',
                    subject: '잘 안을 때 들어 미소야 😊',
                    message: '미소야 잘 안을 때 들어.\n동화책 읽어줄거야 무려 25분 짜리야 ㅋㅋㅋ',
                    createdAt: '2025-05-28T10:00:00'
                },
                {
                    id: 2,
                    type: 'sent',
                    sender: '미소',
                    date: '2025.06.03',
                    duration: '03분 47초',
                    subject: '오빠랑 같이 대통령 선거 투표...',
                    message: '오빠랑 같이 대통령 선거 투표하러 갔어',
                    createdAt: '2025-06-03T14:30:00'
                }
            ];

            localStorage.setItem(storageKey, JSON.stringify(defaultVoices));
            return defaultVoices;
        }

        function saveVoices(voices) {
            const storageKey = `mynokVoices_${personName}`;
            localStorage.setItem(storageKey, JSON.stringify(voices));
        }

        // 음성 리스트 렌더링
        function renderVoices(filterType = 'received', searchQuery = '') {
            const voices = getVoices();
            const filteredVoices = voices.filter(voice => {
                const matchesType = voice.type === filterType;
                const matchesSearch = !searchQuery ||
                    voice.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voice.message.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            });

            // 날짜순 정렬 (최신순)
            filteredVoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const listContainer = filterType === 'received'
                ? document.getElementById('receivedVoiceList')
                : document.getElementById('sentVoiceList');

            if (!listContainer) return;

            listContainer.innerHTML = '';

            if (filteredVoices.length === 0) {
                listContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">음성이 없습니다.</p>';
                return;
            }

            filteredVoices.forEach(voice => {
                const voiceCard = document.createElement('div');
                voiceCard.className = 'voice-card';

                const avatarStyle = person.avatar
                    ? `background-image: url(${person.avatar})`
                    : 'background-color: #f5f5f5';

                voiceCard.innerHTML = `
                    <div class="voice-card-avatar" style="${avatarStyle}"></div>
                    <div class="voice-card-info">
                        <h3 class="voice-card-name">${voice.sender}</h3>
                        <p class="voice-card-date">${voice.date}</p>
                        <p class="voice-card-preview">${voice.duration} | ${voice.subject}</p>
                    </div>
                    <div class="voice-card-actions">
                        <div class="voice-card-icon">👂</div>
                        <button class="voice-listen-btn" data-voice-id="${voice.id}">음성 듣기</button>
                    </div>
                `;

                listContainer.appendChild(voiceCard);
            });

            // 음성 듣기 버튼 이벤트
            const listenButtons = listContainer.querySelectorAll('.voice-listen-btn');
            listenButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const voiceId = parseInt(this.getAttribute('data-voice-id'));
                    openPlayerModal(voiceId);
                });
            });
        }

        // 탭 전환
        const voiceTabButtons = document.querySelectorAll('.voice-tab-btn');
        voiceTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');

                voiceTabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                if (tab === 'received') {
                    receivedVoiceTab.style.display = 'block';
                    sentVoiceTab.style.display = 'none';
                    renderVoices('received');
                } else {
                    receivedVoiceTab.style.display = 'none';
                    sentVoiceTab.style.display = 'block';
                    renderVoices('sent');
                }
            });
        });

        // 검색 기능
        const voiceSearchInput = document.getElementById('voiceSearchInput');
        if (voiceSearchInput) {
            voiceSearchInput.addEventListener('input', function() {
                const searchQuery = this.value;
                const activeTab = document.querySelector('.voice-tab-btn.active');
                const filterType = activeTab ? activeTab.getAttribute('data-tab') : 'received';
                renderVoices(filterType, searchQuery);
            });
        }

        // 음성 듣기 모달
        const voicePlayerModal = document.getElementById('voicePlayerModal');
        const closePlayerModal = document.getElementById('closePlayerModal');
        const playPauseBtn = document.getElementById('playPauseBtn');

        let isPlaying = false;
        let playInterval = null;
        let currentVoiceDuration = 0;
        let currentPlayTime = 0;
        let currentAudio = null;
        let currentVoiceData = null;

        function parseDuration(durationStr) {
            // "24분 47초" -> 총 초로 변환
            const minuteMatch = durationStr.match(/(\d+)분/);
            const secondMatch = durationStr.match(/(\d+)초/);

            const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
            const seconds = secondMatch ? parseInt(secondMatch[1]) : 0;

            return minutes * 60 + seconds;
        }

        function formatPlayTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        function updatePlayerProgress() {
            if (currentVoiceDuration > 0) {
                const progress = (currentPlayTime / currentVoiceDuration) * 100;
                document.getElementById('playerProgressFill').style.width = `${progress}%`;
                document.getElementById('playerProgressHandle').style.left = `${progress}%`;
            }
        }

        function startPlaying() {
            isPlaying = true;
            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="#FF7474">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            `;

            // 실제 오디오 재생
            if (currentAudio && currentVoiceData?.audioData) {
                currentAudio.play();
            } else {
                // 오디오 데이터가 없으면 시뮬레이션
                playInterval = setInterval(() => {
                    currentPlayTime++;
                    document.getElementById('playerTime').textContent = formatPlayTime(currentPlayTime);
                    updatePlayerProgress();

                    // 재생 완료
                    if (currentPlayTime >= currentVoiceDuration) {
                        stopPlaying();
                        currentPlayTime = 0;
                        document.getElementById('playerTime').textContent = formatPlayTime(0);
                        updatePlayerProgress();
                    }
                }, 1000);
            }
        }

        function stopPlaying() {
            isPlaying = false;
            if (playInterval) {
                clearInterval(playInterval);
                playInterval = null;
            }

            // 실제 오디오 정지
            if (currentAudio) {
                currentAudio.pause();
            }

            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="#FF7474">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
        }

        function resetPlayer() {
            stopPlaying();
            currentPlayTime = 0;
            document.getElementById('playerTime').textContent = '00:00:00';
            document.getElementById('playerProgressFill').style.width = '0%';
            document.getElementById('playerProgressHandle').style.left = '0%';

            // 오디오 정리
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
            }
        }

        function openPlayerModal(voiceId) {
            const voices = getVoices();
            const voice = voices.find(v => v.id === voiceId);

            if (!voice) return;

            currentVoiceData = voice;
            document.getElementById('playerSubject').textContent = voice.subject;
            document.getElementById('playerMessage').textContent = voice.message;

            // 음성 길이 설정
            currentVoiceDuration = parseDuration(voice.duration);
            resetPlayer();

            // 실제 녹음된 오디오가 있으면 Audio 객체 생성
            if (voice.audioData) {
                currentAudio = new Audio(voice.audioData);

                // 오디오 재생 시간 업데이트
                currentAudio.addEventListener('timeupdate', () => {
                    if (currentAudio) {
                        currentPlayTime = Math.floor(currentAudio.currentTime);
                        document.getElementById('playerTime').textContent = formatPlayTime(currentPlayTime);
                        updatePlayerProgress();
                    }
                });

                // 오디오 재생 완료
                currentAudio.addEventListener('ended', () => {
                    stopPlaying();
                    currentPlayTime = 0;
                    document.getElementById('playerTime').textContent = formatPlayTime(0);
                    updatePlayerProgress();
                });

                // 실제 오디오 길이로 업데이트
                currentAudio.addEventListener('loadedmetadata', () => {
                    if (currentAudio && currentAudio.duration && !isNaN(currentAudio.duration)) {
                        currentVoiceDuration = Math.floor(currentAudio.duration);
                    }
                });
            }

            voicePlayerModal.classList.add('active');
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                if (isPlaying) {
                    stopPlaying();
                } else {
                    startPlaying();
                }
            });
        }

        if (closePlayerModal) {
            closePlayerModal.addEventListener('click', function() {
                voicePlayerModal.classList.remove('active');
                resetPlayer();
            });
        }

        // 모달 외부 클릭 시 닫기
        if (voicePlayerModal) {
            voicePlayerModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    resetPlayer();
                }
            });
        }

        // 음성 보내기 모달
        const voiceSendModal = document.getElementById('voiceSendModal');
        const sendVoiceBtn = document.getElementById('sendVoiceBtn');
        const recordVoiceBtn = document.getElementById('recordVoiceBtn');
        const closeSendModal = document.getElementById('closeSendModal');
        const recordButton = document.getElementById('recordButton');
        const recordIcon = document.getElementById('recordIcon');
        const sendActions = document.getElementById('sendActions');
        const retryRecordBtn = document.getElementById('retryRecordBtn');
        const submitVoiceBtn = document.getElementById('submitVoiceBtn');

        let isRecording = false;
        let recordingStartTime = null;
        let recordingInterval = null;
        let mediaRecorder = null;
        let audioChunks = [];
        let audioBlob = null;
        let audioUrl = null;

        // 녹음하기 버튼 클릭
        if (recordVoiceBtn) {
            recordVoiceBtn.addEventListener('click', function() {
                voiceSendModal.classList.add('active');
                resetRecordModal();
            });
        }

        // 음성 가져오기 버튼 클릭
        const importVoiceBtn = document.getElementById('importVoiceBtn');
        const voiceFileInput = document.getElementById('voiceFileInput');

        if (importVoiceBtn && voiceFileInput) {
            importVoiceBtn.addEventListener('click', function() {
                voiceFileInput.click();
            });

            voiceFileInput.addEventListener('change', async function(e) {
                const file = e.target.files[0];
                if (!file) return;

                // 오디오 파일인지 확인
                if (!file.type.startsWith('audio/')) {
                    alert('오디오 파일만 선택할 수 있습니다.');
                    return;
                }

                try {
                    // 파일을 Blob으로 변환
                    audioBlob = file;
                    audioUrl = URL.createObjectURL(audioBlob);

                    // Audio 객체로 길이 계산
                    const audio = new Audio(audioUrl);

                    audio.addEventListener('loadedmetadata', () => {
                        const durationSeconds = Math.floor(audio.duration);
                        const hours = Math.floor(durationSeconds / 3600);
                        const minutes = Math.floor((durationSeconds % 3600) / 60);
                        const seconds = durationSeconds % 60;
                        const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

                        // 모달 열기
                        voiceSendModal.classList.add('active');
                        resetRecordModal();

                        // 시간 표시
                        document.getElementById('recordTime').textContent = formattedDuration;

                        // 진행바 100%로 설정
                        document.getElementById('recordProgressFill').style.width = '100%';
                        document.getElementById('recordProgressHandle').style.left = '100%';

                        // 액션 버튼 표시
                        sendActions.style.display = 'flex';

                        // 파일 입력 초기화
                        voiceFileInput.value = '';
                    });

                    audio.addEventListener('error', () => {
                        alert('오디오 파일을 불러올 수 없습니다.');
                        cleanupRecording();
                        voiceFileInput.value = '';
                    });

                } catch (error) {
                    console.error('오디오 파일 처리 오류:', error);
                    alert('오디오 파일을 처리하는 중 오류가 발생했습니다.');
                    cleanupRecording();
                    voiceFileInput.value = '';
                }
            });
        }

        // 음성 보내기 버튼 클릭 (deprecated - importVoiceBtn으로 대체)
        if (sendVoiceBtn) {
            sendVoiceBtn.addEventListener('click', function() {
                voiceSendModal.classList.add('active');
                resetRecordModal();
            });
        }

        if (closeSendModal) {
            closeSendModal.addEventListener('click', function() {
                voiceSendModal.classList.remove('active');
                stopRecording();
                cleanupRecording();
            });
        }

        if (voiceSendModal) {
            voiceSendModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    stopRecording();
                    cleanupRecording();
                }
            });
        }

        function resetRecordModal() {
            document.getElementById('voiceSubjectInput').value = '';
            document.getElementById('voiceMessageInput').value = '';
            document.getElementById('recordTime').textContent = '00:00:00';
            document.getElementById('recordProgressFill').style.width = '0%';
            document.getElementById('recordProgressHandle').style.left = '0%';
            sendActions.style.display = 'none';
            recordButton.classList.remove('recording');
            isRecording = false;
            cleanupRecording();
        }

        function cleanupRecording() {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
                audioUrl = null;
            }
            audioChunks = [];
            audioBlob = null;
            mediaRecorder = null;
        }

        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        async function startRecording() {
            try {
                // 마이크 권한 요청
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                // MediaRecorder 초기화
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                // 데이터 수집
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                // 녹음 완료 시
                mediaRecorder.addEventListener('stop', () => {
                    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    audioUrl = URL.createObjectURL(audioBlob);

                    // 스트림 정리
                    stream.getTracks().forEach(track => track.stop());
                });

                // 녹음 시작
                mediaRecorder.start();
                isRecording = true;
                recordingStartTime = Date.now();
                recordButton.classList.add('recording');

                // 타이머 시작
                recordingInterval = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
                    document.getElementById('recordTime').textContent = formatTime(elapsed);

                    // 진행 바 업데이트 (최대 5분)
                    const progress = Math.min((elapsed / 300) * 100, 100);
                    document.getElementById('recordProgressFill').style.width = `${progress}%`;
                    document.getElementById('recordProgressHandle').style.left = `${progress}%`;

                    // 5분 경과 시 자동 정지
                    if (elapsed >= 300) {
                        stopRecording();
                    }
                }, 1000);

            } catch (error) {
                console.error('마이크 접근 오류:', error);
                alert('마이크 권한을 허용해주세요.\n\n설정에서 브라우저의 마이크 권한을 확인해주세요.');
            }
        }

        function stopRecording() {
            if (!isRecording) return;

            isRecording = false;
            recordButton.classList.remove('recording');
            clearInterval(recordingInterval);

            // MediaRecorder 정지
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }

            sendActions.style.display = 'flex';
        }

        if (recordButton) {
            recordButton.addEventListener('click', function() {
                if (!isRecording) {
                    startRecording();
                } else {
                    stopRecording();
                }
            });
        }

        if (retryRecordBtn) {
            retryRecordBtn.addEventListener('click', function() {
                resetRecordModal();
            });
        }

        if (submitVoiceBtn) {
            submitVoiceBtn.addEventListener('click', async function() {
                const subject = document.getElementById('voiceSubjectInput').value.trim();
                const message = document.getElementById('voiceMessageInput').value.trim();
                const duration = document.getElementById('recordTime').textContent;

                if (!subject) {
                    alert('음성 제목을 입력해주세요.');
                    return;
                }

                if (!message) {
                    alert('메시지를 입력해주세요.');
                    return;
                }

                if (duration === '00:00:00') {
                    alert('음성을 녹음해주세요.');
                    return;
                }

                if (!audioBlob) {
                    alert('녹음된 음성이 없습니다.');
                    return;
                }

                // Blob을 base64로 변환
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = function() {
                    const base64Audio = reader.result;

                    // 새 음성 저장
                    const voices = getVoices();
                    const newVoice = {
                        id: Date.now(),
                        type: 'sent',
                        sender: '미소',
                        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', ''),
                        duration: duration.split(':').slice(1).join(':'),
                        subject: subject,
                        message: message,
                        audioData: base64Audio,
                        createdAt: new Date().toISOString()
                    };

                    voices.push(newVoice);
                    saveVoices(voices);

                    voiceSendModal.classList.remove('active');

                    // 보낸 음성함으로 전환하고 렌더링
                    const sentTab = document.getElementById('sentTab');
                    if (sentTab) {
                        sentTab.click();
                    }

                    alert('음성이 전송되었습니다.');
                    cleanupRecording();
                };
            });
        }

        // 공유하기 버튼
        const voiceShareBtn = document.getElementById('voiceShareBtn');
        if (voiceShareBtn) {
            voiceShareBtn.addEventListener('click', function() {
                alert('음성 공유 기능은 준비중입니다.');
            });
        }

        // 뒤로가기 버튼
        const backFromVoice = document.getElementById('backFromVoice');
        if (backFromVoice) {
            backFromVoice.addEventListener('click', function() {
                window.location.href = `02_memory.html?name=${encodeURIComponent(personName)}`;
            });
        }

        // 초기 렌더링
        if (person.connectionType === 'pet') {
            renderVoices('sent');
        } else {
            renderVoices('received');
        }
    }

    // ==================== 사진이 있어 페이지 ====================
    if (document.getElementById('backFromPhoto')) {
        console.log('사진 페이지 초기화 시작');

        // URL 파라미터에서 person 정보 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const personName = urlParams.get('name');

        if (!personName) {
            console.error('사진 페이지: 인연 이름이 없습니다');
            window.location.href = '01_main.html';
            return;
        }

        const connections = getConnections();
        const person = connections.find(conn => conn.name === personName);

        if (!person) {
            console.error('사진 페이지: 인연을 찾을 수 없습니다:', personName);
            window.location.href = '01_main.html';
            return;
        }

        // 프로필 정보 렌더링
        document.getElementById('photoPersonName').textContent = personName;
        const photoProfileImage = document.getElementById('photoProfileImage');
        if (person.avatar) {
            photoProfileImage.src = person.avatar;
        }

        // localStorage 키 (person별 데이터 저장)
        const PHOTOS_KEY = `mynokPhotos_${personName}`;

        // 사진/동영상 데이터 가져오기
        function getPhotos() {
            const stored = localStorage.getItem(PHOTOS_KEY);
            if (stored) {
                return JSON.parse(stored);
            }

            // 샘플 데이터
            return [
                {
                    id: 1,
                    type: 'photo',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFE5E6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E📷%3C/text%3E%3C/svg%3E',
                    date: '2024.01.15',
                    favorite: true,
                    createdAt: new Date('2024-01-15').toISOString()
                },
                {
                    id: 2,
                    type: 'photo',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFD4D6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E📸%3C/text%3E%3C/svg%3E',
                    date: '2024.02.20',
                    favorite: true,
                    createdAt: new Date('2024-02-20').toISOString()
                },
                {
                    id: 3,
                    type: 'video',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFC4C6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E🎥%3C/text%3E%3C/svg%3E',
                    date: '2024.03.10',
                    favorite: true,
                    createdAt: new Date('2024-03-10').toISOString()
                },
                {
                    id: 4,
                    type: 'photo',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFE5E6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E🌸%3C/text%3E%3C/svg%3E',
                    date: '2024.04.05',
                    favorite: false,
                    createdAt: new Date('2024-04-05').toISOString()
                },
                {
                    id: 5,
                    type: 'photo',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFD4D6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E🎨%3C/text%3E%3C/svg%3E',
                    date: '2024.05.12',
                    favorite: false,
                    createdAt: new Date('2024-05-12').toISOString()
                },
                {
                    id: 6,
                    type: 'video',
                    url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFC4C6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%23FF7474"%3E📹%3C/text%3E%3C/svg%3E',
                    date: '2024.06.18',
                    favorite: false,
                    createdAt: new Date('2024-06-18').toISOString()
                }
            ];
        }

        // 사진/동영상 저장
        function savePhotos(photos) {
            localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
        }

        // 통계 업데이트
        function updateStats() {
            const photos = getPhotos();
            const photoCount = photos.filter(p => p.type === 'photo').length;
            const videoCount = photos.filter(p => p.type === 'video').length;

            document.getElementById('photoCount').textContent = photoCount;
            document.getElementById('videoCount').textContent = videoCount;
        }

        // 사진 아이템 HTML 생성
        function createPhotoItemHTML(photo) {
            const iconHTML = photo.favorite ? '<div class="photo-item-icon">♥</div>' : '';
            const videoClass = photo.type === 'video' ? ' video' : '';

            return `
                <div class="photo-item${videoClass}" data-id="${photo.id}">
                    <img src="${photo.url}" alt="사진">
                    ${iconHTML}
                </div>
            `;
        }

        // 사진 렌더링
        function renderPhotos(filterType = 'all', searchQuery = '') {
            let photos = getPhotos();

            // 검색 필터링
            if (searchQuery) {
                photos = photos.filter(photo =>
                    photo.date.includes(searchQuery)
                );
            }

            // 타입 필터링
            if (filterType === 'favorites') {
                photos = photos.filter(p => p.favorite);
            }

            // 최신순 정렬
            photos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // 즐겨찾는 사진 (최대 3개)
            const favoritePhotos = photos.filter(p => p.favorite && p.type === 'photo').slice(0, 3);
            const favoritePhotosGrid = document.getElementById('favoritePhotosGrid');
            if (favoritePhotosGrid) {
                favoritePhotosGrid.innerHTML = favoritePhotos.length > 0
                    ? favoritePhotos.map(photo => createPhotoItemHTML(photo)).join('')
                    : '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 0;">즐겨찾는 사진이 없습니다</p>';
            }

            // 최신 사진 (6개)
            const recentPhotos = photos.filter(p => p.type === 'photo').slice(0, 6);
            const recentPhotosGrid = document.getElementById('recentPhotosGrid');
            if (recentPhotosGrid) {
                recentPhotosGrid.innerHTML = recentPhotos.length > 0
                    ? recentPhotos.map(photo => createPhotoItemHTML(photo)).join('')
                    : '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 0;">사진이 없습니다</p>';
            }

            // 최신 동영상 (6개)
            const recentVideos = photos.filter(p => p.type === 'video').slice(0, 6);
            const recentVideosGrid = document.getElementById('recentVideosGrid');
            if (recentVideosGrid) {
                recentVideosGrid.innerHTML = recentVideos.length > 0
                    ? recentVideos.map(photo => createPhotoItemHTML(photo)).join('')
                    : '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 0;">동영상이 없습니다</p>';
            }

            // 하이라이트 렌더링 (favorites 탭)
            if (filterType === 'favorites') {
                renderHighlights(photos);
            }

            // 클릭 이벤트 추가
            document.querySelectorAll('.photo-item').forEach(item => {
                item.addEventListener('click', function() {
                    const photoId = parseInt(this.getAttribute('data-id'));
                    openPhotoDetail(photoId);
                });
            });

            updateStats();
        }

        // 하이라이트 렌더링 함수
        function renderHighlights(photos) {
            // 하이라이트 인연 이름 업데이트
            const highlightConnectionNameEl = document.getElementById('highlightConnectionName');
            if (highlightConnectionNameEl) {
                highlightConnectionNameEl.textContent = personName;
            }

            // 사진 하이라이트 (가장 많이 본 사진 6개)
            const photoHighlights = photos.filter(p => p.type === 'photo').slice(0, 6);
            const highlightPhotosGrid = document.getElementById('highlightPhotosGrid');

            if (highlightPhotosGrid) {
                if (photoHighlights.length > 0) {
                    highlightPhotosGrid.innerHTML = photoHighlights.map(photo => `
                        <div class="highlight-photo-item" data-id="${photo.id}">
                            ${photo.url ? `<img src="${photo.url}" alt="하이라이트 사진">` : ''}
                        </div>
                    `).join('');
                } else {
                    highlightPhotosGrid.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">사진이 없습니다</p>';
                }
            }

            // 영상 하이라이트 (가장 최근 영상 1개)
            const videoHighlight = photos.filter(p => p.type === 'video')[0];
            const highlightVideoCard = document.getElementById('highlightVideoCard');

            if (highlightVideoCard) {
                if (videoHighlight) {
                    const videoDate = new Date(videoHighlight.createdAt || videoHighlight.date);
                    const formattedDate = `${videoDate.getFullYear()}년 ${videoDate.getMonth() + 1}월 ${videoDate.getDate()}일`;

                    highlightVideoCard.innerHTML = `
                        <div class="highlight-video-item" data-id="${videoHighlight.id}">
                            ${videoHighlight.url ? `<img src="${videoHighlight.url}" alt="하이라이트 영상">` : ''}
                            <div class="highlight-video-date">${formattedDate}</div>
                        </div>
                    `;
                } else {
                    highlightVideoCard.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">영상이 없습니다</p>';
                }
            }

            // 하이라이트 아이템 클릭 이벤트
            document.querySelectorAll('.highlight-photo-item, .highlight-video-item').forEach(item => {
                item.addEventListener('click', function() {
                    const photoId = parseInt(this.getAttribute('data-id'));
                    openPhotoDetail(photoId);
                });
            });
        }

        // 탭 전환
        const photoTabs = document.querySelectorAll('.photo-tab-btn');
        const photoTabContents = document.querySelectorAll('.photo-tab-content');

        photoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabType = this.getAttribute('data-tab');

                // 탭 활성화 및 아이콘 변경
                photoTabs.forEach(t => {
                    t.classList.remove('active');
                    const icon = t.querySelector('.photo-tab-icon');
                    if (icon) {
                        const currentTab = t.getAttribute('data-tab');
                        if (currentTab === 'photos') {
                            icon.src = '../img/마이노크 갤러리 아이콘_off.png';
                        } else if (currentTab === 'videos') {
                            icon.src = '../img/마이노크 동영상 아이콘_off.png';
                        } else if (currentTab === 'favorites') {
                            icon.src = '../img/마이노크 하트 아이콘_off.png';
                        }
                    }
                });

                this.classList.add('active');
                const activeIcon = this.querySelector('.photo-tab-icon');
                if (activeIcon) {
                    if (tabType === 'photos') {
                        activeIcon.src = '../img/마이노크 갤러리 아이콘_on.png';
                    } else if (tabType === 'videos') {
                        activeIcon.src = '../img/마이노크 동영상 아이콘_on.png';
                    } else if (tabType === 'favorites') {
                        activeIcon.src = '../img/마이노크 하트 아이콘_on.png';
                    }
                }

                // 콘텐츠 표시
                photoTabContents.forEach(content => {
                    content.style.display = 'none';
                });
                const targetContent = document.getElementById(`photo-tab-${tabType}`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }

                renderPhotos(tabType);
            });
        });

        // 검색
        const photoSearchInput = document.getElementById('photoSearchInput');
        if (photoSearchInput) {
            photoSearchInput.addEventListener('input', function() {
                const currentTab = document.querySelector('.photo-tab-btn.active').getAttribute('data-tab');
                renderPhotos(currentTab, this.value);
            });
        }

        // 사진 상세 모달
        const photoDetailModal = document.getElementById('photoDetailModal');
        const closePhotoModal = document.getElementById('closePhotoModal');
        const photoDetailImage = document.getElementById('photoDetailImage');
        const photoDetailDate = document.getElementById('photoDetailDate');
        const toggleFavoriteBtn = document.getElementById('toggleFavoriteBtn');
        const deletePhotoBtn = document.getElementById('deletePhotoBtn');
        const downloadPhotoBtn = document.getElementById('downloadPhotoBtn');

        let currentPhotoId = null;

        function openPhotoDetail(photoId) {
            const photos = getPhotos();
            const photo = photos.find(p => p.id === photoId);

            if (!photo) return;

            currentPhotoId = photoId;
            photoDetailImage.src = photo.url;
            photoDetailDate.textContent = photo.date;

            // 즐겨찾기 버튼 상태
            if (photo.favorite) {
                toggleFavoriteBtn.classList.add('active');
                toggleFavoriteBtn.querySelector('svg').style.fill = 'white';
            } else {
                toggleFavoriteBtn.classList.remove('active');
                toggleFavoriteBtn.querySelector('svg').style.fill = 'none';
            }

            photoDetailModal.classList.add('active');
        }

        if (closePhotoModal) {
            closePhotoModal.addEventListener('click', function() {
                photoDetailModal.classList.remove('active');
                currentPhotoId = null;
            });
        }

        if (photoDetailModal) {
            photoDetailModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    currentPhotoId = null;
                }
            });
        }

        // 즐겨찾기 토글
        if (toggleFavoriteBtn) {
            toggleFavoriteBtn.addEventListener('click', function() {
                if (currentPhotoId === null) return;

                const photos = getPhotos();
                const photo = photos.find(p => p.id === currentPhotoId);

                if (photo) {
                    photo.favorite = !photo.favorite;
                    savePhotos(photos);

                    // 버튼 상태 업데이트
                    if (photo.favorite) {
                        this.classList.add('active');
                        this.querySelector('svg').style.fill = 'white';
                    } else {
                        this.classList.remove('active');
                        this.querySelector('svg').style.fill = 'none';
                    }

                    // 리스트 다시 렌더링
                    const currentTab = document.querySelector('.photo-tab-btn.active').getAttribute('data-tab');
                    renderPhotos(currentTab);
                }
            });
        }

        // 사진 삭제
        if (deletePhotoBtn) {
            deletePhotoBtn.addEventListener('click', function() {
                if (currentPhotoId === null) return;

                if (confirm('정말 이 사진을 삭제하시겠어요?')) {
                    let photos = getPhotos();
                    photos = photos.filter(p => p.id !== currentPhotoId);
                    savePhotos(photos);

                    photoDetailModal.classList.remove('active');
                    currentPhotoId = null;

                    const currentTab = document.querySelector('.photo-tab-btn.active').getAttribute('data-tab');
                    renderPhotos(currentTab);
                    alert('사진이 삭제되었습니다.');
                }
            });
        }

        // 사진 다운로드
        if (downloadPhotoBtn) {
            downloadPhotoBtn.addEventListener('click', function() {
                if (currentPhotoId === null) return;

                const photos = getPhotos();
                const photo = photos.find(p => p.id === currentPhotoId);

                if (photo) {
                    // 다운로드 링크 생성
                    const link = document.createElement('a');
                    link.href = photo.url;
                    link.download = `mynok_photo_${photo.date}.jpg`;
                    link.click();
                    alert('사진을 다운로드했습니다.');
                }
            });
        }

        // 사진 업로드
        const photoUploadBtn = document.getElementById('photoUploadBtn');
        const photoFileInput = document.getElementById('photoFileInput');

        if (photoUploadBtn && photoFileInput) {
            photoUploadBtn.addEventListener('click', function() {
                photoFileInput.click();
            });

            photoFileInput.addEventListener('change', function(e) {
                const files = e.target.files;
                if (!files || files.length === 0) return;

                const photos = getPhotos();
                let newPhotosCount = 0;

                Array.from(files).forEach(file => {
                    const reader = new FileReader();

                    reader.onload = function(event) {
                        const newPhoto = {
                            id: Date.now() + Math.random(),
                            type: file.type.startsWith('video/') ? 'video' : 'photo',
                            url: event.target.result,
                            date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
                            favorite: false,
                            createdAt: new Date().toISOString()
                        };

                        photos.push(newPhoto);
                        newPhotosCount++;

                        if (newPhotosCount === files.length) {
                            savePhotos(photos);
                            const currentTab = document.querySelector('.photo-tab-btn.active').getAttribute('data-tab');
                            renderPhotos(currentTab);
                            alert(`${files.length}개의 파일이 업로드되었습니다.`);
                        }
                    };

                    reader.readAsDataURL(file);
                });

                photoFileInput.value = '';
            });
        }

        // 뒤로가기 버튼
        const backFromPhoto = document.getElementById('backFromPhoto');
        if (backFromPhoto) {
            backFromPhoto.addEventListener('click', function() {
                window.location.href = `02_memory.html?name=${encodeURIComponent(personName)}`;
            });
        }

        // 초기 렌더링
        updateStats();
        renderPhotos('photos');
    }

    // ==================== 캘린더 페이지 ====================
    if (document.getElementById('backFromCalendar')) {
        console.log('캘린더 페이지 초기화 시작');

        // localStorage 키
        const EVENTS_KEY = 'mynokCalendarEvents';

        // 현재 날짜
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();
        let selectedDate = null;
        let selectedEventColor = '#FF7474';
        let editingEventId = null;

        // 필터 및 검색 상태
        let currentFilter = 'all'; // all, personal, shared, connection:name
        let searchQuery = '';
        let selectedDateForFilter = null; // 선택된 날짜 필터

        // 공휴일 데이터 (2025년)
        const holidays = {
            '2025-01-01': '신정',
            '2025-01-28': '설날 연휴',
            '2025-01-29': '설날',
            '2025-01-30': '설날 연휴',
            '2025-03-01': '삼일절',
            '2025-03-03': '대체공휴일',
            '2025-05-05': '어린이날',
            '2025-05-06': '석가탄신일',
            '2025-06-06': '현충일',
            '2025-08-15': '광복절',
            '2025-10-03': '개천절',
            '2025-10-05': '추석 연휴',
            '2025-10-06': '추석',
            '2025-10-07': '추석 연휴',
            '2025-10-08': '대체공휴일',
            '2025-10-09': '한글날',
            '2025-12-25': '크리스마스'
        };

        // 이벤트 데이터 가져오기
        function getEvents() {
            const stored = localStorage.getItem(EVENTS_KEY);
            if (stored) {
                return JSON.parse(stored);
            }

            // 샘플 데이터
            return [
                {
                    id: 1,
                    date: '2025-01-01',
                    time: '00:00',
                    title: '새해 첫날',
                    memo: '새해 복 많이 받으세요!',
                    color: '#FF7474',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    date: '2025-01-15',
                    time: '14:00',
                    title: '미소 생일',
                    memo: '생일 축하해!',
                    color: '#FFB4B6',
                    createdAt: new Date().toISOString()
                }
            ];
        }

        // 이벤트 저장
        function saveEvents(events) {
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
        }

        // 이벤트 필터링 함수
        function filterEvents(events) {
            let filtered = events;

            // 검색어 필터링
            if (searchQuery) {
                filtered = filtered.filter(event =>
                    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (event.content && event.content.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }

            // 타입별 필터링
            if (currentFilter === 'personal') {
                filtered = filtered.filter(event => event.shareMethod === 'private');
            } else if (currentFilter === 'shared') {
                filtered = filtered.filter(event => event.shareMethod !== 'private');
            } else if (currentFilter.startsWith('connection:')) {
                const connectionName = currentFilter.split(':')[1];
                filtered = filtered.filter(event =>
                    event.sharedWith && event.sharedWith.includes(connectionName)
                );
            }

            return filtered;
        }

        // 캘린더 렌더링
        function renderCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const calendarMonth = document.getElementById('calendarMonth');

            // 월 표시
            calendarMonth.textContent = `${currentYear}년 ${currentMonth + 1}월`;

            // 첫날과 마지막날
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const prevLastDay = new Date(currentYear, currentMonth, 0);

            const firstDayOfWeek = firstDay.getDay();
            const lastDate = lastDay.getDate();
            const prevLastDate = prevLastDay.getDate();

            // 그리드 초기화
            calendarGrid.innerHTML = '';

            // 요일 헤더
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            days.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // 이전 달 날짜
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day disabled';
                dayCell.textContent = prevLastDate - i;
                calendarGrid.appendChild(dayCell);
            }

            // 현재 달 날짜
            const today = new Date();
            const allEvents = getEvents();
            const events = filterEvents(allEvents);

            for (let date = 1; date <= lastDate; date++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';

                const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                const currentDate = new Date(currentYear, currentMonth, date);
                const dayOfWeek = currentDate.getDay();

                // 공휴일 체크
                const holidayName = holidays[dateString];

                // 주말 또는 공휴일이면 빨간색
                if (dayOfWeek === 0 || dayOfWeek === 6 || holidayName) {
                    dayCell.classList.add('weekend-holiday');
                }

                // 날짜만 표시
                dayCell.textContent = date;

                // 오늘 표시
                if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && date === today.getDate()) {
                    dayCell.classList.add('today');
                }

                // 이벤트 있는 날짜 표시
                const hasEvent = events.some(event => event.date === dateString);
                if (hasEvent) {
                    dayCell.classList.add('event');
                }

                // 선택된 날짜 표시
                if (selectedDate === dateString) {
                    dayCell.classList.add('selected');
                }

                // 클릭 이벤트 (해당 날짜 일정만 필터링)
                dayCell.addEventListener('click', function() {
                    selectedDate = dateString;
                    selectedDateForFilter = dateString;
                    renderCalendar();
                });

                calendarGrid.appendChild(dayCell);
            }

            // 다음 달 날짜
            const remainingCells = 42 - (firstDayOfWeek + lastDate);
            for (let date = 1; date <= remainingCells; date++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day disabled';
                dayCell.textContent = date;
                calendarGrid.appendChild(dayCell);
            }

            // 이번 달 공휴일 리스트 렌더링
            renderHolidaysList();

            // 이번 달 일정 리스트 렌더링
            renderMonthlyEventsList();
        }

        // 이번 달 공휴일 리스트 렌더링
        function renderHolidaysList() {
            const holidaysList = document.getElementById('holidaysList');
            const holidaysSection = document.getElementById('holidaysSection');

            if (!holidaysList || !holidaysSection) return;

            // 이번 달의 공휴일 필터링
            const monthHolidays = [];
            for (const [dateString, holidayName] of Object.entries(holidays)) {
                const holidayDate = new Date(dateString);
                if (holidayDate.getFullYear() === currentYear && holidayDate.getMonth() === currentMonth) {
                    monthHolidays.push({
                        date: holidayDate.getDate(),
                        name: holidayName,
                        dateString: dateString
                    });
                }
            }

            // 공휴일이 있으면 표시
            if (monthHolidays.length > 0) {
                holidaysSection.style.display = 'block';

                // 날짜순 정렬
                monthHolidays.sort((a, b) => a.date - b.date);

                // 리스트 렌더링
                holidaysList.innerHTML = monthHolidays.map(holiday => `
                    <div class="calendar-holiday-item">
                        <span class="calendar-holiday-date">${holiday.date}일</span>
                        <span class="calendar-holiday-name-text">${holiday.name}</span>
                    </div>
                `).join('');
            } else {
                holidaysSection.style.display = 'none';
            }
        }

        // 이번 달 일정 리스트 렌더링
        function renderMonthlyEventsList() {
            const monthlyEventsList = document.getElementById('monthlyEventsList');
            const monthlyEventsSection = document.getElementById('monthlyEventsSection');
            const selectedDateHeader = document.getElementById('selectedDateHeader');
            const selectedDateText = document.getElementById('selectedDateText');

            if (!monthlyEventsList || !monthlyEventsSection) return;

            // 선택된 날짜 헤더 표시/숨김
            if (selectedDateForFilter && selectedDateHeader) {
                const date = new Date(selectedDateForFilter);
                const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
                selectedDateText.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]})`;
                selectedDateHeader.style.display = 'flex';
            } else if (selectedDateHeader) {
                selectedDateHeader.style.display = 'none';
            }

            // 이번 달의 일정 필터링
            const allEvents = getEvents();
            const filteredEvents = filterEvents(allEvents);
            const monthEvents = [];

            for (const event of filteredEvents) {
                const eventDate = new Date(event.date);

                // 선택된 날짜 필터가 있으면 해당 날짜만
                if (selectedDateForFilter) {
                    // 날짜 범위가 있는 일정의 경우 범위 내에 포함되는지 확인
                    if (event.endDate) {
                        if (selectedDateForFilter >= event.date && selectedDateForFilter <= event.endDate) {
                            monthEvents.push({
                                ...event,
                                dateObj: eventDate
                            });
                        }
                    } else if (event.date === selectedDateForFilter) {
                        monthEvents.push({
                            ...event,
                            dateObj: eventDate
                        });
                    }
                } else {
                    // 전체 일정 모드: 이번 달의 모든 일정
                    if (eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth) {
                        monthEvents.push({
                            ...event,
                            dateObj: eventDate
                        });
                    }
                }
            }

            // 일정이 있으면 표시
            if (monthEvents.length > 0) {
                monthlyEventsSection.style.display = 'block';

                // 날짜순 정렬
                monthEvents.sort((a, b) => a.dateObj - b.dateObj);

                // 반복 타입 한글 변환
                const getRepeatText = (repeatType) => {
                    const repeatMap = {
                        'none': '반복 안함',
                        'daily': '매일',
                        'monthly': '매달',
                        'weekly': '매주',
                        'yearly': '매년',
                        'custom': '사용자화'
                    };
                    return repeatMap[repeatType] || '반복 안함';
                };

                // 알람 시간 한글 변환
                const getAlarmText = (alarmTime) => {
                    const alarmMap = {
                        0: '알람 안함',
                        5: '5분 전',
                        10: '10분 전',
                        30: '30분 전',
                        60: '1시간 전',
                        120: '두시간 전',
                        1440: '하루 전',
                        2880: '이틀 전',
                        10080: '일주일 전'
                    };
                    return alarmMap[alarmTime] || '알람 안함';
                };

                // 공유 방법 텍스트
                const getShareText = (shareMethod) => {
                    const shareMap = {
                        'select': '선택공유',
                        'private': '개인일',
                        'public': '전체보기'
                    };
                    return shareMap[shareMethod] || '개인일';
                };

                // 리스트 렌더링
                monthlyEventsList.innerHTML = monthEvents.map(event => `
                    <div class="calendar-monthly-event-card" data-event-id="${event.id}" style="cursor: pointer;">
                        <div class="calendar-monthly-event-date">
                            ${event.dateObj.getMonth() + 1}월 ${event.dateObj.getDate()}일
                        </div>
                        <div class="calendar-monthly-event-content">
                            <div class="calendar-monthly-event-title">${event.title}</div>
                            <div class="calendar-monthly-event-subtitle">${event.content || '일정 내용 없음'}</div>
                            <div class="calendar-monthly-event-tags">
                                <span class="calendar-monthly-event-tag">⚠️ ${getAlarmText(event.alarmTime)}</span>
                                <span class="calendar-monthly-event-tag-divider">|</span>
                                <span class="calendar-monthly-event-tag">📅 ${getRepeatText(event.repeatType)}</span>
                            </div>
                        </div>
                        <div class="calendar-monthly-event-share">
                            ${getShareText(event.shareMethod)}
                        </div>
                    </div>
                `).join('');

                // 카드 클릭 이벤트 추가
                document.querySelectorAll('.calendar-monthly-event-card').forEach(card => {
                    card.addEventListener('click', function() {
                        const eventId = this.getAttribute('data-event-id');
                        window.location.href = `calendar_plus.html?eventId=${eventId}`;
                    });
                });
            } else {
                monthlyEventsSection.style.display = 'none';
            }
        }

        // 네비게이션
        const prevYear = document.getElementById('prevYear');
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');
        const nextYear = document.getElementById('nextYear');

        if (prevYear) {
            prevYear.addEventListener('click', function() {
                currentYear--;
                renderCalendar();
            });
        }

        if (nextYear) {
            nextYear.addEventListener('click', function() {
                currentYear++;
                renderCalendar();
            });
        }

        if (prevMonth) {
            prevMonth.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            });
        }

        if (nextMonth) {
            nextMonth.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            });
        }

        // 뒤로가기 버튼
        const backFromCalendar = document.getElementById('backFromCalendar');
        if (backFromCalendar) {
            backFromCalendar.addEventListener('click', function() {
                window.history.back();
            });
        }

        // FAB 버튼 - 일정 추가 페이지로 이동
        const calendarAddFab = document.getElementById('calendarAddFab');
        if (calendarAddFab) {
            calendarAddFab.addEventListener('click', function() {
                // 선택된 날짜가 있으면 해당 날짜로, 없으면 기본 페이지로
                if (selectedDateForFilter) {
                    window.location.href = `calendar_plus.html?date=${selectedDateForFilter}`;
                } else {
                    window.location.href = 'calendar_plus.html';
                }
            });
        }

        // 검색 기능
        const calendarSearchInput = document.getElementById('calendarSearchInput');
        if (calendarSearchInput) {
            calendarSearchInput.addEventListener('input', function() {
                searchQuery = this.value.trim();
                renderCalendar();
            });
        }

        // 필터 드롭다운 토글
        const filterToggleBtn = document.getElementById('filterToggleBtn');
        const filterDropdown = document.getElementById('filterDropdown');

        if (filterToggleBtn) {
            filterToggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                filterDropdown.classList.toggle('active');
                this.classList.toggle('active');
            });
        }

        // 필터 옵션 클릭
        if (filterDropdown) {
            filterDropdown.addEventListener('click', function(e) {
                const filterItem = e.target.closest('.calendar-filter-item');
                if (filterItem) {
                    // 활성 상태 변경
                    document.querySelectorAll('.calendar-filter-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    filterItem.classList.add('active');

                    // 필터 값 설정
                    const filterValue = filterItem.getAttribute('data-filter');
                    currentFilter = filterValue;

                    // 레이블 업데이트
                    const filterLabel = document.getElementById('filterLabel');
                    filterLabel.textContent = filterItem.textContent;

                    // 드롭다운 닫기
                    filterDropdown.classList.remove('active');
                    filterToggleBtn.classList.remove('active');

                    // 캘린더 다시 렌더링
                    renderCalendar();
                }
            });
        }

        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', function(e) {
            if (filterDropdown && !e.target.closest('.calendar-filter-wrapper')) {
                filterDropdown.classList.remove('active');
                if (filterToggleBtn) {
                    filterToggleBtn.classList.remove('active');
                }
            }
        });

        // 인연 필터 목록 로드
        function loadConnectionFilters() {
            const connectionFilterList = document.getElementById('connectionFilterList');
            if (!connectionFilterList) return;

            const connections = JSON.parse(localStorage.getItem('mynokConnections') || '[]');

            if (connections.length > 0) {
                connectionFilterList.innerHTML = connections.map(conn => `
                    <div class="calendar-filter-item" data-filter="connection:${conn.name}">
                        ${conn.name}
                    </div>
                `).join('');
            } else {
                connectionFilterList.innerHTML = '<div style="padding: 10px 16px; font-size: 13px; color: #999;">인연이 없습니다</div>';
            }
        }

        loadConnectionFilters();

        // 전체 일정 보기 버튼 이벤트
        const showAllEventsBtn = document.getElementById('showAllEventsBtn');
        if (showAllEventsBtn) {
            showAllEventsBtn.addEventListener('click', function() {
                selectedDateForFilter = null;
                selectedDate = null;
                renderCalendar();
            });
        }

        // 초기 렌더링
        renderCalendar();
    }

    // ==================== 장소별 추억 페이지 (04_placephoto.html) ====================
    if (document.getElementById('backFromPlace')) {
        // URL에서 connection 파라미터 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const connectionName = urlParams.get('connection');

        if (!connectionName) {
            alert('잘못된 접근입니다.');
            window.location.href = '02_memory.html';
            return;
        }

        // 배너에 인연 이름 표시
        const placeBannerName = document.getElementById('placeBannerName');
        if (placeBannerName) {
            placeBannerName.textContent = connectionName;
        }

        // 뒤로가기 버튼
        const backBtn = document.getElementById('backFromPlace');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.history.back();
            });
        }

        const PHOTOS_KEY = 'mynokPlacePhotos';
        const FAVORITES_KEY = 'mynokPlaceFavorites';

        let currentSeason = 'spring';
        let searchQuery = '';

        // localStorage에서 즐겨찾기 정보 불러오기
        function getFavorites() {
            return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        }

        // 즐겨찾기 저장
        function saveFavorites(favorites) {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }

        // 지역별로 추억 데이터 그룹화 (해당 인연과 공유된 것만)
        function groupPhotosByLocation() {
            const allPhotos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');

            // 해당 인연과 공유된 사진만 필터링
            const photos = allPhotos.filter(photo => {
                // SVG 샘플 데이터 제외
                const isSample = photo.thumbnail && photo.thumbnail.includes('data:image/svg+xml');
                if (isSample) return false;

                if (photo.shareMethod === 'all') {
                    return true; // 전체보기는 모두 포함
                } else if (photo.shareMethod === 'select' && photo.sharedWith) {
                    return photo.sharedWith.includes(connectionName); // 선택공유는 해당 인연이 포함되어 있는지 확인
                }
                return false; // 비공개는 제외
            });

            const grouped = {};
            const favorites = getFavorites();

            photos.forEach(photo => {
                const location = photo.location;
                if (!grouped[location]) {
                    grouped[location] = {
                        location: location,
                        seasons: {},
                        favorite: favorites.includes(location),
                        totalCount: 0
                    };
                }

                const season = photo.season;
                if (!grouped[location].seasons[season]) {
                    grouped[location].seasons[season] = [];
                }
                grouped[location].seasons[season].push(photo);
                grouped[location].totalCount++;
            });

            return grouped;
        }

        // 기본 이미지 URL (추억에 이미지가 없을 경우 사용)
        const defaultImages = {
            'spring': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
            'summer': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            'fall': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'winter': 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400'
        };

        // 지역 카드 렌더링
        function renderLocationCards() {
            const cardsList = document.getElementById('placeCardsList');
            if (!cardsList) return;

            const groupedPhotos = groupPhotosByLocation();

            // 필터링: 현재 계절에 해당하는 지역만 표시
            let filtered = Object.values(groupedPhotos).filter(loc => {
                const hasPhotosInSeason = loc.seasons[currentSeason] && loc.seasons[currentSeason].length > 0;
                const matchesSearch = searchQuery === '' || loc.location.toLowerCase().includes(searchQuery.toLowerCase());
                return hasPhotosInSeason && matchesSearch;
            });

            if (filtered.length === 0) {
                cardsList.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
                        <div>해당하는 지역이 없습니다</div>
                        <div style="font-size: 14px; margin-top: 8px;">+ 버튼을 눌러 추억을 추가해보세요</div>
                    </div>
                `;
                return;
            }

            cardsList.innerHTML = filtered.map((loc, index) => {
                const photoCount = loc.seasons[currentSeason].length;

                // 해당 계절의 가장 최근 사진 찾기
                const seasonPhotos = loc.seasons[currentSeason];
                const latestPhoto = seasonPhotos.reduce((latest, photo) => {
                    if (!latest) return photo;
                    return new Date(photo.createdAt) > new Date(latest.createdAt) ? photo : latest;
                }, null);

                // 썸네일이 있으면 사용, 없으면 기본 이미지
                const imageUrl = (latestPhoto && latestPhoto.thumbnail)
                    ? latestPhoto.thumbnail
                    : defaultImages[currentSeason];

                return `
                    <div class="place-card" data-location="${loc.location}">
                        <img src="${imageUrl}" alt="${loc.location}" class="place-card-image">
                        <div class="place-card-overlay">
                            <div class="place-card-location">${loc.location}</div>
                            <div style="font-size: 12px; margin-top: 4px; opacity: 0.9;">추억 ${photoCount}개</div>
                        </div>
                        <button class="place-card-favorite ${loc.favorite ? 'active' : ''}" data-location="${loc.location}">
                            ♥
                        </button>
                    </div>
                `;
            }).join('');

            // 즐겨찾기 버튼 이벤트
            document.querySelectorAll('.place-card-favorite').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const location = this.getAttribute('data-location');
                    let favorites = getFavorites();

                    if (favorites.includes(location)) {
                        favorites = favorites.filter(f => f !== location);
                        this.classList.remove('active');
                    } else {
                        favorites.push(location);
                        this.classList.add('active');
                    }

                    saveFavorites(favorites);
                });
            });

            // 카드 클릭 이벤트
            document.querySelectorAll('.place-card').forEach(card => {
                card.addEventListener('click', function() {
                    const location = this.getAttribute('data-location');
                    // place_detail.html로 이동 (location과 connection을 URL 파라미터로 전달)
                    window.location.href = `place_detail.html?location=${encodeURIComponent(location)}&connection=${encodeURIComponent(connectionName)}`;
                });
            });
        }

        // 배너 통계 업데이트
        function updateBannerStats() {
            const allPhotos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');
            // SVG 샘플 데이터 제외
            const photos = allPhotos.filter(photo => {
                const isSample = photo.thumbnail && photo.thumbnail.includes('data:image/svg+xml');
                return !isSample;
            });

            const groupedPhotos = groupPhotosByLocation();

            // 총 지역 수
            const totalPlaceCount = Object.keys(groupedPhotos).length;
            const totalPlaceCountEl = document.getElementById('totalPlaceCount');
            if (totalPlaceCountEl) {
                totalPlaceCountEl.textContent = totalPlaceCount;
            }

            // 계절별 추억 개수
            const seasonCounts = {
                spring: 0,
                summer: 0,
                fall: 0,
                winter: 0
            };

            photos.forEach(photo => {
                if (seasonCounts.hasOwnProperty(photo.season)) {
                    seasonCounts[photo.season]++;
                }
            });

            const springCountEl = document.getElementById('springCount');
            const summerCountEl = document.getElementById('summerCount');
            const fallCountEl = document.getElementById('fallCount');
            const winterCountEl = document.getElementById('winterCount');

            if (springCountEl) springCountEl.textContent = seasonCounts.spring;
            if (summerCountEl) summerCountEl.textContent = seasonCounts.summer;
            if (fallCountEl) fallCountEl.textContent = seasonCounts.fall;
            if (winterCountEl) winterCountEl.textContent = seasonCounts.winter;
        }

        // 계절 탭 이벤트
        const seasonTabs = document.querySelectorAll('.place-season-tab');
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                seasonTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentSeason = this.getAttribute('data-season');
                renderLocationCards();
            });
        });

        // 검색 기능
        const searchInput = document.getElementById('placeSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchQuery = this.value.trim();
                renderLocationCards();
            });
        }

        // FAB 버튼 이벤트
        const favoriteFab = document.getElementById('favoriteFab');
        if (favoriteFab) {
            favoriteFab.addEventListener('click', function() {
                alert('즐겨찾기 지역만 보기');
            });
        }

        const addPlaceFab = document.getElementById('addPlaceFab');
        if (addPlaceFab) {
            addPlaceFab.addEventListener('click', function() {
                window.location.href = `photo_plus.html?connection=${encodeURIComponent(connectionName)}`;
            });
        }

        // 초기 렌더링
        updateBannerStats();
        renderLocationCards();

        // 하단 네비게이션
        const navHome = document.getElementById('navHome');
        const navCalendar = document.getElementById('navCalendar');
        const navMypage = document.getElementById('navMypage');

        if (navHome) {
            navHome.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        if (navCalendar) {
            navCalendar.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        if (navMypage) {
            navMypage.addEventListener('click', function() {
                window.location.href = '01_mypage.html';
            });
        }
    }

    // ==================== 일정 추가 페이지 (calendar_plus.html) ====================
    if (document.getElementById('backFromCalendarPlus')) {
        console.log('일정 추가 페이지 초기화 시작');

        // localStorage 키
        const EVENTS_KEY = 'mynokCalendarEvents';

        // 이벤트 데이터 가져오기
        function getEvents() {
            const stored = localStorage.getItem(EVENTS_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
            return [];
        }

        // URL 파라미터에서 eventId, date 확인
        const urlParams = new URLSearchParams(window.location.search);
        const editingEventId = urlParams.get('eventId');
        const selectedDateParam = urlParams.get('date'); // 날짜 클릭 시 전달된 날짜
        let editingEvent = null;

        if (editingEventId) {
            const events = getEvents();
            editingEvent = events.find(e => e.id == editingEventId);

            // 페이지 타이틀 변경
            const modalTitle = document.querySelector('.header-title');
            const pageTitle = document.querySelector('.event-header-title');
            if (modalTitle) modalTitle.textContent = '일정 수정';
            if (pageTitle) pageTitle.textContent = '일정 수정';

            // 삭제 버튼 표시
            const deleteBtn = document.getElementById('deleteEventBtn');
            if (deleteBtn) {
                deleteBtn.style.display = 'block';
            }
        }

        let repeatType = editingEvent ? editingEvent.repeatType : 'none';
        let alarmTime = editingEvent ? editingEvent.alarmTime : 0;
        let shareMethod = editingEvent ? editingEvent.shareMethod : 'select';

        // 날짜 포맷 함수
        function formatDateKorean(dateString) {
            const date = new Date(dateString);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
            return `${month}월 ${day}일 (${dayOfWeek})`;
        }

        // 뒤로가기 버튼
        const backFromCalendarPlus = document.getElementById('backFromCalendarPlus');
        if (backFromCalendarPlus) {
            backFromCalendarPlus.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        // 날짜 입력 처리
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const startDateText = document.getElementById('startDateText');
        const endDateText = document.getElementById('endDateText');

        // 날짜 초기화 (수정 모드일 경우 기존 날짜, 날짜 클릭 시 해당 날짜 사용)
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const initialStartDate = editingEvent ? editingEvent.date : (selectedDateParam || todayString);
        const initialEndDate = editingEvent ? (editingEvent.endDate || editingEvent.date) : (selectedDateParam || todayString);

        startDateInput.value = initialStartDate;
        endDateInput.value = initialEndDate;
        startDateText.textContent = formatDateKorean(initialStartDate);
        endDateText.textContent = formatDateKorean(initialEndDate);

        // 제목과 내용 초기화 (수정 모드일 경우)
        if (editingEvent) {
            const eventTitleInput = document.getElementById('eventTitle');
            const eventContentInput = document.getElementById('eventContent');
            if (eventTitleInput) eventTitleInput.value = editingEvent.title || '';
            if (eventContentInput) eventContentInput.value = editingEvent.content || '';
        }

        startDateInput.addEventListener('change', function() {
            if (this.value) {
                startDateText.textContent = formatDateKorean(this.value);
                if (endDateInput.value < this.value) {
                    endDateInput.value = this.value;
                    endDateText.textContent = formatDateKorean(this.value);
                }
            }
        });

        endDateInput.addEventListener('change', function() {
            if (this.value) {
                endDateText.textContent = formatDateKorean(this.value);
                if (this.value < startDateInput.value) {
                    this.value = startDateInput.value;
                    endDateText.textContent = formatDateKorean(startDateInput.value);
                }
            }
        });

        // 날짜 카드 클릭 시 input 트리거
        const startDateCard = document.querySelectorAll('.event-date-card')[0];
        const endDateCard = document.querySelectorAll('.event-date-card')[1];

        if (startDateCard) {
            startDateCard.addEventListener('click', function(e) {
                if (e.target !== startDateInput) {
                    startDateInput.showPicker ? startDateInput.showPicker() : startDateInput.click();
                }
            });
        }

        if (endDateCard) {
            endDateCard.addEventListener('click', function(e) {
                if (e.target !== endDateInput) {
                    endDateInput.showPicker ? endDateInput.showPicker() : endDateInput.click();
                }
            });
        }

        // 반복 드롭다운
        const repeatSelect = document.getElementById('repeatSelect');
        const repeatDropdown = document.getElementById('repeatDropdown');
        const repeatSelected = document.getElementById('repeatSelected');

        // 수정 모드일 경우 기존 값 표시
        if (editingEvent) {
            const repeatTextMap = {
                'none': '반복 안함',
                'daily': '매일',
                'monthly': '매달',
                'weekly': '매주',
                'yearly': '매년',
                'custom': '사용자화'
            };
            repeatSelected.textContent = repeatTextMap[editingEvent.repeatType] || '반복 안함';
        }

        repeatSelect.addEventListener('click', function() {
            repeatDropdown.classList.toggle('active');
            const alarmDropdown = document.getElementById('alarmDropdown');
            if (alarmDropdown) alarmDropdown.classList.remove('active');
        });

        const repeatItems = repeatDropdown.querySelectorAll('.event-dropdown-item');
        repeatItems.forEach(item => {
            item.addEventListener('click', function() {
                repeatType = this.getAttribute('data-value');
                repeatSelected.textContent = this.textContent;
                repeatDropdown.classList.remove('active');
            });
        });

        // 알람 드롭다운
        const alarmSelect = document.getElementById('alarmSelect');
        const alarmDropdown = document.getElementById('alarmDropdown');
        const alarmSelected = document.getElementById('alarmSelected');

        // 수정 모드일 경우 기존 값 표시
        if (editingEvent) {
            const alarmTextMap = {
                0: '알람 안함',
                5: '5분 전',
                10: '10분 전',
                30: '30분 전',
                60: '1시간 전',
                120: '두시간 전',
                1440: '하루 전',
                2880: '이틀 전',
                10080: '일주일 전'
            };
            alarmSelected.textContent = alarmTextMap[editingEvent.alarmTime] || '알람 안함';
        }

        alarmSelect.addEventListener('click', function() {
            alarmDropdown.classList.toggle('active');
            repeatDropdown.classList.remove('active');
        });

        const alarmItems = alarmDropdown.querySelectorAll('.event-dropdown-item');
        alarmItems.forEach(item => {
            item.addEventListener('click', function() {
                alarmTime = parseInt(this.getAttribute('data-value'));
                alarmSelected.textContent = this.textContent;
                alarmDropdown.classList.remove('active');
            });
        });

        // 공유 방법 탭
        const shareBtn1 = document.getElementById('shareBtn1');
        const shareBtn2 = document.getElementById('shareBtn2');
        const shareBtn3 = document.getElementById('shareBtn3');
        const searchWrapper = document.querySelector('.event-search-wrapper');
        let selectedConnections = [];

        // 수정 모드일 경우 공유 방법 및 선택된 인연 초기화
        if (editingEvent) {
            if (editingEvent.shareMethod === 'select') {
                shareBtn1.classList.add('active');
                shareBtn2.classList.remove('active');
                shareBtn3.classList.remove('active');
            } else if (editingEvent.shareMethod === 'private') {
                shareBtn2.classList.add('active');
                shareBtn1.classList.remove('active');
                shareBtn3.classList.remove('active');
            } else if (editingEvent.shareMethod === 'all') {
                shareBtn3.classList.add('active');
                shareBtn1.classList.remove('active');
                shareBtn2.classList.remove('active');
            }

            // 선택된 인연 로드
            if (editingEvent.sharedWith && editingEvent.sharedWith.length > 0) {
                const allConnections = JSON.parse(localStorage.getItem('mynokConnections') || '[]');
                selectedConnections = editingEvent.sharedWith.map(name => {
                    return allConnections.find(c => c.name === name);
                }).filter(c => c);
            }
        }

        // 선택공유일 때만 검색창 표시
        function updateSearchVisibility() {
            if (shareMethod === 'select') {
                searchWrapper.style.display = 'block';
            } else {
                searchWrapper.style.display = 'none';
            }
        }

        shareBtn1.addEventListener('click', function() {
            shareMethod = 'select';
            shareBtn1.classList.add('active');
            shareBtn2.classList.remove('active');
            shareBtn3.classList.remove('active');
            updateSearchVisibility();
        });

        shareBtn2.addEventListener('click', function() {
            shareMethod = 'private';
            shareBtn2.classList.add('active');
            shareBtn1.classList.remove('active');
            shareBtn3.classList.remove('active');
            updateSearchVisibility();
        });

        shareBtn3.addEventListener('click', function() {
            shareMethod = 'all';
            shareBtn3.classList.add('active');
            shareBtn1.classList.remove('active');
            shareBtn2.classList.remove('active');
            updateSearchVisibility();
        });

        // 초기 상태 설정 (선택공유가 기본값)
        updateSearchVisibility();

        // 인연 검색 기능
        const searchMembers = document.getElementById('searchMembers');

        // 검색 결과 표시를 위한 드롭다운 생성
        const searchResultsDiv = document.createElement('div');
        searchResultsDiv.className = 'event-search-results';
        searchWrapper.appendChild(searchResultsDiv);

        // 선택된 인연 표시를 위한 영역 생성
        const selectedMembersDiv = document.createElement('div');
        selectedMembersDiv.className = 'event-selected-members';
        searchWrapper.appendChild(selectedMembersDiv);

        searchMembers.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            if (searchTerm === '') {
                searchResultsDiv.innerHTML = '';
                searchResultsDiv.style.display = 'none';
                return;
            }

            // localStorage에서 인연 목록 가져오기
            const connections = JSON.parse(localStorage.getItem('mynokConnections') || '[]');

            // 검색어로 필터링
            const filtered = connections.filter(conn =>
                conn.name.toLowerCase().includes(searchTerm) &&
                !selectedConnections.some(selected => selected.name === conn.name)
            );

            if (filtered.length > 0) {
                searchResultsDiv.style.display = 'block';
                searchResultsDiv.innerHTML = filtered.map(conn => `
                    <div class="event-search-result-item" data-name="${conn.name}">
                        <span>${conn.name}</span>
                        <span class="event-add-icon">+</span>
                    </div>
                `).join('');

                // 검색 결과 클릭 이벤트
                searchResultsDiv.querySelectorAll('.event-search-result-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const name = this.getAttribute('data-name');
                        const connection = connections.find(c => c.name === name);

                        if (connection && !selectedConnections.some(s => s.name === name)) {
                            selectedConnections.push(connection);
                            renderSelectedMembers();
                            searchMembers.value = '';
                            searchResultsDiv.innerHTML = '';
                            searchResultsDiv.style.display = 'none';
                        }
                    });
                });
            } else {
                searchResultsDiv.innerHTML = '<div class="event-search-no-result">검색 결과가 없습니다</div>';
                searchResultsDiv.style.display = 'block';
            }
        });

        // 선택된 인연 렌더링
        function renderSelectedMembers() {
            if (selectedConnections.length > 0) {
                selectedMembersDiv.style.display = 'flex';
                selectedMembersDiv.innerHTML = selectedConnections.map(conn => `
                    <div class="event-selected-member-tag" data-name="${conn.name}">
                        <span>${conn.name}</span>
                        <button class="event-remove-member" type="button">×</button>
                    </div>
                `).join('');

                // 제거 버튼 이벤트
                selectedMembersDiv.querySelectorAll('.event-remove-member').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const tag = this.closest('.event-selected-member-tag');
                        const name = tag.getAttribute('data-name');
                        selectedConnections = selectedConnections.filter(c => c.name !== name);
                        renderSelectedMembers();
                    });
                });
            } else {
                selectedMembersDiv.style.display = 'none';
                selectedMembersDiv.innerHTML = '';
            }
        }

        // 외부 클릭 시 검색 결과 닫기
        document.addEventListener('click', function(e) {
            if (!searchWrapper.contains(e.target)) {
                searchResultsDiv.style.display = 'none';
            }
        });

        // 수정 모드일 경우 선택된 인연 표시
        if (editingEvent && selectedConnections.length > 0) {
            renderSelectedMembers();
        }

        // 취소 버튼
        const cancelBtn = document.getElementById('cancelBtn');
        cancelBtn.addEventListener('click', function() {
            window.location.href = '03_calendar.html';
        });

        // 저장 버튼
        const saveEventBtn = document.getElementById('saveEventBtn');
        saveEventBtn.addEventListener('click', function() {
            const title = document.getElementById('eventTitle').value.trim();
            const startDate = startDateInput.value;
            const endDate = endDateInput.value;
            const content = document.getElementById('eventContent').value.trim();

            if (!title) {
                alert('일정 제목을 입력해주세요.');
                return;
            }

            if (!startDate) {
                alert('날짜를 선택해주세요.');
                return;
            }

            // 일정 저장
            const events = getEvents();

            if (editingEventId && editingEvent) {
                // 수정 모드 - 기존 일정 업데이트
                const eventIndex = events.findIndex(e => e.id == editingEventId);
                if (eventIndex !== -1) {
                    events[eventIndex] = {
                        ...events[eventIndex],
                        title: title,
                        date: startDate,
                        endDate: endDate !== startDate ? endDate : null,
                        content: content,
                        repeatType: repeatType,
                        alarmTime: alarmTime,
                        shareMethod: shareMethod,
                        sharedWith: shareMethod === 'select' ? selectedConnections.map(c => c.name) : [],
                        updatedAt: new Date().toISOString()
                    };

                    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
                    alert('일정이 수정되었습니다! 💕');
                    window.location.href = '03_calendar.html';
                }
            } else {
                // 추가 모드 - 새 일정 생성
                const newEvent = {
                    id: Date.now(),
                    title: title,
                    date: startDate,
                    endDate: endDate !== startDate ? endDate : null,
                    content: content,
                    repeatType: repeatType,
                    alarmTime: alarmTime,
                    shareMethod: shareMethod,
                    sharedWith: shareMethod === 'select' ? selectedConnections.map(c => c.name) : [],
                    color: '#FF7474',
                    createdAt: new Date().toISOString()
                };

                events.push(newEvent);
                localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

                alert('일정이 추가되었습니다! 💕');
                window.location.href = '03_calendar.html';
            }
        });

        // 삭제 버튼
        const deleteEventBtn = document.getElementById('deleteEventBtn');
        if (deleteEventBtn) {
            deleteEventBtn.addEventListener('click', function() {
                if (confirm('정말 이 일정을 삭제하시겠습니까?')) {
                    const events = getEvents();
                    const eventIndex = events.findIndex(e => e.id == editingEventId);

                    if (eventIndex !== -1) {
                        events.splice(eventIndex, 1);
                        localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
                        alert('일정이 삭제되었습니다.');
                        window.location.href = '03_calendar.html';
                    } else {
                        alert('일정을 찾을 수 없습니다.');
                    }
                }
            });
        }

        console.log('일정 추가 페이지 초기화 완료');
    }

    // ========================================
    // 사진 추가 페이지 (photo_plus.html)
    // ========================================
    if (document.getElementById('backFromPhotoPlus')) {
        console.log('사진 추가 페이지 초기화 중...');

        // URL에서 connection 파라미터 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const connectionName = urlParams.get('connection');

        if (!connectionName) {
            alert('잘못된 접근입니다.');
            window.location.href = '02_memory.html';
            return;
        }

        // 대한민국 지역 데이터
        const koreaLocations = {
            '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
            '부산광역시': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
            '대구광역시': ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
            '인천광역시': ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'],
            '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
            '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
            '울산광역시': ['남구', '동구', '북구', '울주군', '중구'],
            '세종특별자치시': ['세종시'],
            '경기도': ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
            '강원도': ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
            '충청북도': ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시', '충주시'],
            '충청남도': ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'],
            '전라북도': ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
            '전라남도': ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
            '경상북도': ['경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'],
            '경상남도': ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
            '제주특별자치도': ['서귀포시', '제주시']
        };

        // 상태 변수
        let selectedLocation = null;
        let selectedMembers = [];
        let selectedFiles = [];

        // 뒤로가기 버튼
        const backFromPhotoPlus = document.getElementById('backFromPhotoPlus');
        if (backFromPhotoPlus) {
            backFromPhotoPlus.addEventListener('click', function() {
                window.location.href = `04_placephoto.html?connection=${encodeURIComponent(connectionName)}`;
            });
        }

        // 지역 검색 기능
        const locationSearchInput = document.getElementById('locationSearchInput');
        const locationSearchResults = document.getElementById('locationSearchResults');
        const locationSelected = document.getElementById('locationSelected');

        if (locationSearchInput && locationSearchResults) {
            locationSearchInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();

                if (query === '') {
                    locationSearchResults.classList.remove('active');
                    locationSearchResults.innerHTML = '';
                    return;
                }

                // 검색 결과 생성
                let results = [];
                for (let province in koreaLocations) {
                    // 시/도 이름으로 검색
                    if (province.toLowerCase().includes(query)) {
                        koreaLocations[province].forEach(district => {
                            results.push({ province, district });
                        });
                    } else {
                        // 구/군 이름으로 검색
                        koreaLocations[province].forEach(district => {
                            if (district.toLowerCase().includes(query)) {
                                results.push({ province, district });
                            }
                        });
                    }
                }

                // 검색 결과 표시
                if (results.length === 0) {
                    locationSearchResults.innerHTML = '<div class="photo-plus-search-result-item" style="text-align: center; color: #999;">검색 결과가 없습니다</div>';
                    locationSearchResults.classList.add('active');
                } else {
                    locationSearchResults.innerHTML = results.slice(0, 20).map(r => `
                        <div class="photo-plus-search-result-item" data-province="${r.province}" data-district="${r.district}">
                            <div class="photo-plus-search-result-category">${r.province}</div>
                            <div class="photo-plus-search-result-text">${r.district}</div>
                        </div>
                    `).join('');
                    locationSearchResults.classList.add('active');

                    // 검색 결과 클릭 이벤트
                    document.querySelectorAll('.photo-plus-search-result-item').forEach(item => {
                        item.addEventListener('click', function() {
                            const province = this.dataset.province;
                            const district = this.dataset.district;
                            if (province && district) {
                                selectedLocation = { province, district };
                                locationSelected.textContent = `${province}, ${district}`;
                                locationSelected.style.display = 'block';
                                locationSearchInput.value = '';
                                locationSearchResults.classList.remove('active');
                                locationSearchResults.innerHTML = '';
                            }
                        });
                    });
                }
            });

            // 검색창 외부 클릭 시 결과 닫기
            document.addEventListener('click', function(e) {
                if (!locationSearchInput.contains(e.target) && !locationSearchResults.contains(e.target)) {
                    locationSearchResults.classList.remove('active');
                }
            });
        }

        // 계절 탭 전환
        const seasonTabs = document.querySelectorAll('.photo-plus-season-tab');
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                seasonTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // 공유 설정 탭 전환
        const shareTabs = document.querySelectorAll('.photo-plus-share-tab');
        const memberSearch = document.querySelector('.photo-plus-member-search');
        const selectedMembersContainer = document.getElementById('selectedMembers');

        shareTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                shareTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 선택공유일 때만 인연 검색창 표시
                const shareType = this.dataset.share;
                if (memberSearch) {
                    memberSearch.style.display = shareType === 'select' ? 'block' : 'none';
                }
                if (selectedMembersContainer) {
                    selectedMembersContainer.style.display = shareType === 'select' ? 'flex' : 'none';
                }
            });
        });

        // 인연 검색 기능
        const memberSearchInput = document.getElementById('memberSearchInput');
        const memberSearchResults = document.getElementById('memberSearchResults');
        const connections = getConnections();

        if (memberSearchInput && memberSearchResults) {
            memberSearchInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();

                if (query === '') {
                    memberSearchResults.classList.remove('active');
                    memberSearchResults.innerHTML = '';
                    return;
                }

                // 검색 결과 생성
                const results = connections.filter(conn =>
                    conn.name.toLowerCase().includes(query) &&
                    !selectedMembers.some(m => m.name === conn.name)
                );

                // 검색 결과 표시
                if (results.length === 0) {
                    memberSearchResults.innerHTML = '<div class="photo-plus-member-result-item" style="text-align: center; color: #999;">검색 결과가 없습니다</div>';
                    memberSearchResults.classList.add('active');
                } else {
                    memberSearchResults.innerHTML = results.map(conn => `
                        <div class="photo-plus-member-result-item" data-name="${conn.name}">
                            ${conn.name}
                        </div>
                    `).join('');
                    memberSearchResults.classList.add('active');

                    // 검색 결과 클릭 이벤트
                    document.querySelectorAll('.photo-plus-member-result-item').forEach(item => {
                        item.addEventListener('click', function() {
                            const name = this.dataset.name;
                            if (name) {
                                const connection = connections.find(c => c.name === name);
                                if (connection && !selectedMembers.some(m => m.name === name)) {
                                    selectedMembers.push(connection);
                                    renderSelectedMembers();
                                    memberSearchInput.value = '';
                                    memberSearchResults.classList.remove('active');
                                    memberSearchResults.innerHTML = '';
                                }
                            }
                        });
                    });
                }
            });

            // 검색창 외부 클릭 시 결과 닫기
            document.addEventListener('click', function(e) {
                if (!memberSearchInput.contains(e.target) && !memberSearchResults.contains(e.target)) {
                    memberSearchResults.classList.remove('active');
                }
            });
        }

        // 선택된 인연 렌더링
        function renderSelectedMembers() {
            if (!selectedMembersContainer) return;

            selectedMembersContainer.innerHTML = selectedMembers.map(member => `
                <div class="photo-plus-selected-member">
                    ${member.name}
                    <button class="photo-plus-member-remove" data-name="${member.name}">×</button>
                </div>
            `).join('');

            // 제거 버튼 이벤트
            document.querySelectorAll('.photo-plus-member-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const name = this.dataset.name;
                    selectedMembers = selectedMembers.filter(m => m.name !== name);
                    renderSelectedMembers();
                });
            });
        }

        // 사진 업로드 관련 변수
        const uploadArea = document.getElementById('uploadArea');
        const previewGrid = document.getElementById('previewGrid');

        // 파일 input 생성 (숨김)
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,video/*';
        fileInput.multiple = true;
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        // 업로드 영역 클릭 시 파일 선택
        if (uploadArea) {
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
        }

        // 파일 선택 시 처리
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                    selectedFiles.push(file);
                }
            });
            renderPreview();
            fileInput.value = ''; // 같은 파일 다시 선택 가능하도록
        });

        // 미리보기 렌더링
        function renderPreview() {
            if (!previewGrid) return;

            previewGrid.innerHTML = '';

            selectedFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'photo-plus-preview-item';

                    const img = document.createElement('img');
                    img.className = 'photo-plus-preview-img';
                    img.src = e.target.result;

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'photo-plus-preview-remove';
                    removeBtn.textContent = '×';
                    removeBtn.addEventListener('click', function() {
                        selectedFiles.splice(index, 1);
                        renderPreview();
                    });

                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    previewGrid.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            });

            // 미리보기가 있으면 업로드 영역 숨기기
            if (uploadArea) {
                uploadArea.style.display = selectedFiles.length > 0 ? 'none' : 'flex';
            }
        }

        // 저장 버튼
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                // 검증
                if (!selectedLocation) {
                    alert('지역을 선택해주세요.');
                    locationSearchInput.focus();
                    return;
                }

                if (selectedFiles.length === 0) {
                    alert('사진 또는 동영상을 추가해주세요.');
                    return;
                }

                // 현재 선택된 값들 가져오기
                const selectedSeason = document.querySelector('.photo-plus-season-tab.active');
                const season = selectedSeason ? selectedSeason.dataset.season : 'spring';
                const selectedShare = document.querySelector('.photo-plus-share-tab.active');
                const shareMethod = selectedShare ? selectedShare.dataset.share : 'select';
                const memo = document.getElementById('memoTextarea').value.trim();

                // 선택공유인데 인연 선택 안한 경우
                if (shareMethod === 'select' && selectedMembers.length === 0) {
                    alert('공유할 인연을 선택해주세요.');
                    memberSearchInput.focus();
                    return;
                }

                // 모든 이미지를 리사이징 후 base64로 변환하여 썸네일로 저장
                // 이미지 리사이징 및 압축 함수
                const resizeImage = (file, maxWidth, maxHeight, quality) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const img = new Image();
                            img.onload = () => {
                                const canvas = document.createElement('canvas');
                                let width = img.width;
                                let height = img.height;

                                // 비율 유지하면서 리사이징
                                if (width > height) {
                                    if (width > maxWidth) {
                                        height *= maxWidth / width;
                                        width = maxWidth;
                                    }
                                } else {
                                    if (height > maxHeight) {
                                        width *= maxHeight / height;
                                        height = maxHeight;
                                    }
                                }

                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0, width, height);

                                // JPEG 품질을 낮춰서 압축
                                resolve(canvas.toDataURL('image/jpeg', quality));
                            };
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    });
                };

                // 모든 이미지 리사이징 (최대 600x600, 품질 0.6)
                const resizePromises = Array.from(selectedFiles).map(file =>
                    resizeImage(file, 600, 600, 0.6)
                );

                Promise.all(resizePromises).then((compressedImages) => {
                    // 저장 로직
                    const PHOTOS_KEY = 'mynokPlacePhotos';
                    const photos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');

                    const photoData = {
                        id: Date.now(),
                        location: `${selectedLocation.province}, ${selectedLocation.district}`,
                        season: season,
                        shareMethod: shareMethod,
                        sharedWith: shareMethod === 'select' ? selectedMembers.map(m => m.name) : [],
                        memo: memo,
                        fileCount: selectedFiles.length,
                        thumbnails: compressedImages, // 모든 압축된 이미지 배열
                        thumbnail: compressedImages[0], // 첫 번째 이미지 (하위 호환성)
                        createdAt: new Date().toISOString()
                    };

                    photos.push(photoData);

                    try {
                        localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
                        alert('추억이 저장되었습니다! 💕');
                        window.location.href = `04_placephoto.html?connection=${encodeURIComponent(connectionName)}`;
                    } catch (error) {
                        if (error.name === 'QuotaExceededError') {
                            alert('저장 공간이 부족합니다. 일부 추억을 삭제한 후 다시 시도해주세요.');
                        } else {
                            alert('저장 중 오류가 발생했습니다.');
                        }
                        console.error('저장 오류:', error);
                    }
                });
            });
        }

        console.log('사진 추가 페이지 초기화 완료');
    }

    // ========================================
    // 지역 추억 상세 페이지 (place_detail.html)
    // ========================================
    if (document.getElementById('backFromDetail')) {
        console.log('지역 추억 상세 페이지 초기화 중...');

        const PHOTOS_KEY = 'mynokPlacePhotos';

        // URL에서 location과 connection 파라미터 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const location = urlParams.get('location');
        const connectionName = urlParams.get('connection');

        if (!location || !connectionName) {
            alert('잘못된 접근입니다.');
            window.location.href = '02_memory.html';
            return;
        }

        // 페이지 제목 설정
        const detailLocationTitle = document.getElementById('detailLocationTitle');
        if (detailLocationTitle) {
            detailLocationTitle.textContent = location;
        }

        // 뒤로가기 버튼 (connection 파라미터 유지)
        const backFromDetail = document.getElementById('backFromDetail');
        if (backFromDetail) {
            backFromDetail.addEventListener('click', function() {
                window.location.href = `04_placephoto.html?connection=${encodeURIComponent(connectionName)}`;
            });
        }

        let currentSeasonFilter = 'all';
        let currentPhotoId = null; // 현재 보고 있는 사진 ID
        let currentImageIndex = 0; // 현재 보고 있는 이미지 인덱스
        let currentThumbnails = []; // 현재 사진의 모든 썸네일

        // 해당 지역의 추억 불러오기 (해당 인연과 공유된 것만)
        function getLocationPhotos() {
            const allPhotos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');

            // 지역과 인연으로 필터링
            return allPhotos.filter(photo => {
                if (photo.location !== location) return false;

                // SVG 샘플 데이터 제외
                const isSample = photo.thumbnail && photo.thumbnail.includes('data:image/svg+xml');
                if (isSample) return false;

                // 공유 설정 확인
                if (photo.shareMethod === 'all') {
                    return true; // 전체보기는 모두 포함
                } else if (photo.shareMethod === 'select' && photo.sharedWith) {
                    return photo.sharedWith.includes(connectionName); // 선택공유는 해당 인연이 포함되어 있는지 확인
                }
                return false; // 비공개는 제외
            });
        }

        // 계절 이름 한글 변환
        function getSeasonName(season) {
            const seasonNames = {
                'spring': '봄',
                'summer': '여름',
                'fall': '가을',
                'winter': '겨울'
            };
            return seasonNames[season] || season;
        }

        // 날짜 포맷팅
        function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        }

        // 사진 그리드 렌더링
        function renderPhotosGrid() {
            const detailPhotosGrid = document.getElementById('detailPhotosGrid');
            const detailPhotoCount = document.getElementById('detailPhotoCount');

            if (!detailPhotosGrid) return;

            const photos = getLocationPhotos();

            // 계절 필터 적용
            let filteredPhotos = photos;
            if (currentSeasonFilter !== 'all') {
                filteredPhotos = photos.filter(photo => photo.season === currentSeasonFilter);
            }

            // 개수 업데이트
            if (detailPhotoCount) {
                detailPhotoCount.textContent = filteredPhotos.length;
            }

            // 빈 상태
            if (filteredPhotos.length === 0) {
                detailPhotosGrid.innerHTML = `
                    <div class="place-detail-empty" style="grid-column: 1 / -1;">
                        <div class="place-detail-empty-icon">📷</div>
                        <div class="place-detail-empty-text">추억이 없습니다</div>
                        <div class="place-detail-empty-subtext">+ 버튼을 눌러 추억을 추가해보세요</div>
                    </div>
                `;
                return;
            }

            // 사진 카드 렌더링
            detailPhotosGrid.innerHTML = filteredPhotos.map(photo => {
                const seasonName = getSeasonName(photo.season);
                const dateStr = photo.createdAt ? formatDate(photo.createdAt) : '';

                // thumbnails 배열이 있으면 사용, 없으면 thumbnail 단일 값 사용 (하위 호환성)
                const thumbnails = photo.thumbnails || (photo.thumbnail ? [photo.thumbnail] : []);
                const showMultiple = thumbnails.length > 1;

                return `
                    <div class="place-detail-photo-item" data-photo-id="${photo.id}">
                        <div class="place-detail-photo-image-wrapper ${showMultiple ? 'multiple' : ''}">
                            ${thumbnails.length > 0
                                ? thumbnails.slice(0, 3).map((thumb, index) => `
                                    <img src="${thumb}" alt="추억 사진 ${index + 1}"
                                         class="place-detail-photo-image ${showMultiple ? 'stacked' : ''}"
                                         style="${showMultiple ? `transform: translateX(${index * 6}px) rotate(${(index - 1) * 2}deg); z-index: ${3 - index};` : ''}">`
                                ).join('')
                                : `<div class="place-detail-photo-placeholder">📷</div>`
                            }
                            ${showMultiple ? `<div class="photo-count-badge">+${thumbnails.length}</div>` : ''}
                        </div>
                        <div class="place-detail-photo-info">
                            <div class="place-detail-photo-season ${photo.season}">${seasonName}</div>
                            ${photo.memo ? `<div class="place-detail-photo-memo">${photo.memo}</div>` : ''}
                            <div class="place-detail-photo-meta">
                                <div class="place-detail-photo-count">
                                    <img src="../img/마이노크 갤러리 아이콘_on.png" alt="갤러리" class="meta-icon">
                                    ${photo.fileCount || 0}장
                                </div>
                                ${dateStr ? `<div class="place-detail-photo-date">
                                    <img src="../img/마이노크 캘린더 아이콘_on.png" alt="캘린더" class="meta-icon">
                                    ${dateStr}
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // 사진 카드 클릭 이벤트
            document.querySelectorAll('.place-detail-photo-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    const photoId = this.dataset.photoId;
                    const photo = filteredPhotos.find(p => p.id == photoId);

                    if (photo && photo.thumbnail) {
                        openImageViewer(photo);
                    }
                });
            });
        }

        // 이미지 뷰어 열기
        function openImageViewer(photo) {
            const modal = document.getElementById('imageViewerModal');
            const img = document.getElementById('imageViewerImg');
            const info = document.getElementById('imageViewerInfo');

            if (!modal || !img || !info) return;

            // 현재 사진 ID와 썸네일 정보 저장
            currentPhotoId = photo.id;
            currentThumbnails = photo.thumbnails || (photo.thumbnail ? [photo.thumbnail] : []);
            currentImageIndex = 0;

            // 첫 번째 이미지 설정
            img.src = currentThumbnails[0] || photo.thumbnail;

            // 이미지 네비게이션 버튼 추가/제거
            const imageContent = modal.querySelector('.image-viewer-content');
            let prevBtn = imageContent.querySelector('.image-nav-btn.prev');
            let nextBtn = imageContent.querySelector('.image-nav-btn.next');
            let pageIndicator = imageContent.querySelector('.image-page-indicator');

            if (currentThumbnails.length > 1) {
                // 버튼이 없으면 생성
                if (!prevBtn) {
                    prevBtn = document.createElement('button');
                    prevBtn.className = 'image-nav-btn prev';
                    prevBtn.innerHTML = '‹';
                    prevBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        navigateImage(-1);
                    });
                    imageContent.appendChild(prevBtn);
                }
                if (!nextBtn) {
                    nextBtn = document.createElement('button');
                    nextBtn.className = 'image-nav-btn next';
                    nextBtn.innerHTML = '›';
                    nextBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        navigateImage(1);
                    });
                    imageContent.appendChild(nextBtn);
                }
                if (!pageIndicator) {
                    pageIndicator = document.createElement('div');
                    pageIndicator.className = 'image-page-indicator';
                    imageContent.appendChild(pageIndicator);
                }
                updatePageIndicator();
            } else {
                // 버튼 제거
                if (prevBtn) prevBtn.remove();
                if (nextBtn) nextBtn.remove();
                if (pageIndicator) pageIndicator.remove();
            }

            // 정보 설정
            const seasonName = getSeasonName(photo.season);
            const dateStr = photo.createdAt ? formatDate(photo.createdAt) : '';

            let shareInfo = '';
            if (photo.shareMethod === 'select' && photo.sharedWith && photo.sharedWith.length > 0) {
                shareInfo = photo.sharedWith.join(', ');
            } else if (photo.shareMethod === 'all') {
                shareInfo = '전체보기';
            } else {
                shareInfo = '비공개';
            }

            info.innerHTML = `
                <div class="image-viewer-location">${location}</div>
                <div class="image-viewer-season ${photo.season}">${seasonName}</div>
                ${photo.memo ? `<div class="image-viewer-memo">${photo.memo}</div>` : ''}
                <div class="image-viewer-meta">
                    <div class="image-viewer-meta-item">
                        <img src="../img/마이노크 갤러리 아이콘_on.png" alt="갤러리" class="meta-icon">
                        ${photo.fileCount || 0}장
                    </div>
                    ${dateStr ? `<div class="image-viewer-meta-item">
                        <img src="../img/마이노크 캘린더 아이콘_on.png" alt="캘린더" class="meta-icon">
                        ${dateStr}
                    </div>` : ''}
                    <div class="image-viewer-meta-item">
                        ${shareInfo === '전체보기'
                            ? `<img src="../img/마이노크 전체보기 아이콘.png" alt="전체보기" class="meta-icon">`
                            : `<img src="../img/마이노크 전체보기 아이콘_white.png" alt="공유" class="meta-icon">`
                        }
                        ${shareInfo}
                    </div>
                </div>
            `;

            // 모달 표시
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        }

        // 이미지 네비게이션
        function navigateImage(direction) {
            if (currentThumbnails.length <= 1) return;

            currentImageIndex += direction;

            // 순환 처리
            if (currentImageIndex < 0) {
                currentImageIndex = currentThumbnails.length - 1;
            } else if (currentImageIndex >= currentThumbnails.length) {
                currentImageIndex = 0;
            }

            // 이미지 업데이트
            const img = document.getElementById('imageViewerImg');
            if (img) {
                img.src = currentThumbnails[currentImageIndex];
            }

            updatePageIndicator();
        }

        // 페이지 인디케이터 업데이트
        function updatePageIndicator() {
            const modal = document.getElementById('imageViewerModal');
            const imageContent = modal?.querySelector('.image-viewer-content');
            const indicator = imageContent?.querySelector('.image-page-indicator');

            if (indicator && currentThumbnails.length > 1) {
                indicator.textContent = `${currentImageIndex + 1} / ${currentThumbnails.length}`;
            }
        }

        // 이미지 뷰어 닫기
        function closeImageViewer() {
            const modal = document.getElementById('imageViewerModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // 스크롤 복원
            }
        }

        // 닫기 버튼 이벤트
        const imageViewerClose = document.getElementById('imageViewerClose');
        if (imageViewerClose) {
            imageViewerClose.addEventListener('click', closeImageViewer);
        }

        // 수정 버튼 이벤트
        const imageViewerEdit = document.getElementById('imageViewerEdit');
        if (imageViewerEdit) {
            imageViewerEdit.addEventListener('click', function() {
                if (!currentPhotoId) {
                    alert('수정할 사진을 찾을 수 없습니다.');
                    return;
                }

                // 현재 사진 데이터 가져오기
                const allPhotos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');
                const currentPhoto = allPhotos.find(photo => photo.id == currentPhotoId);

                if (!currentPhoto) {
                    alert('사진 정보를 찾을 수 없습니다.');
                    return;
                }

                // 수정 모드로 전환 (메모와 계절만 수정 가능)
                const newMemo = prompt('메모를 입력하세요:', currentPhoto.memo || '');

                if (newMemo === null) return; // 취소한 경우

                // 계절 선택
                const seasons = {
                    'spring': '봄',
                    'summer': '여름',
                    'fall': '가을',
                    'winter': '겨울'
                };

                const seasonOptions = Object.entries(seasons)
                    .map(([key, name]) => `${name}${currentPhoto.season === key ? ' (현재)' : ''}`)
                    .join('\n');

                const newSeasonName = prompt(`계절을 선택하세요:\n${seasonOptions}\n\n입력: (봄/여름/가을/겨울)`, seasons[currentPhoto.season]);

                if (newSeasonName === null) return; // 취소한 경우

                // 계절 이름을 키로 변환
                const seasonMap = {
                    '봄': 'spring',
                    '여름': 'summer',
                    '가을': 'fall',
                    '겨울': 'winter'
                };

                const newSeason = seasonMap[newSeasonName.trim()] || currentPhoto.season;

                // 사진 데이터 업데이트
                const updatedPhotos = allPhotos.map(photo => {
                    if (photo.id == currentPhotoId) {
                        return {
                            ...photo,
                            memo: newMemo,
                            season: newSeason
                        };
                    }
                    return photo;
                });

                localStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));

                // 모달 닫기 및 페이지 새로고침
                closeImageViewer();
                alert('수정되었습니다.');
                window.location.reload();
            });
        }

        // 삭제 버튼 이벤트
        const imageViewerDelete = document.getElementById('imageViewerDelete');
        if (imageViewerDelete) {
            imageViewerDelete.addEventListener('click', function() {
                if (!currentPhotoId) {
                    alert('삭제할 사진을 찾을 수 없습니다.');
                    return;
                }

                if (confirm('이 추억을 삭제하시겠습니까?\n삭제된 추억은 복구할 수 없습니다.')) {
                    // localStorage에서 사진 삭제
                    const allPhotos = JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');
                    const updatedPhotos = allPhotos.filter(photo => photo.id != currentPhotoId);
                    localStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));

                    // 모달 닫기
                    closeImageViewer();

                    // 삭제 후 같은 지역에 사진이 없으면 목록 페이지로 이동
                    const remainingPhotos = updatedPhotos.filter(photo => photo.location === location);
                    if (remainingPhotos.length === 0) {
                        alert('모든 추억이 삭제되었습니다.');
                        window.location.href = `04_placephoto.html?connection=${encodeURIComponent(connectionName)}`;
                    } else {
                        // 페이지 새로고침하여 목록 업데이트
                        window.location.reload();
                    }
                }
            });
        }

        // 모달 배경 클릭 시 닫기
        const imageViewerModal = document.getElementById('imageViewerModal');
        if (imageViewerModal) {
            imageViewerModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeImageViewer();
                }
            });
        }

        // 계절 탭 이벤트
        const seasonTabs = document.querySelectorAll('.place-detail-season-tab');
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                seasonTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentSeasonFilter = this.dataset.season;
                renderPhotosGrid();
            });
        });

        // 하단 네비게이션
        const navHome = document.getElementById('navHome');
        const navCalendar = document.getElementById('navCalendar');
        const navMypage = document.getElementById('navMypage');

        if (navHome) {
            navHome.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        if (navCalendar) {
            navCalendar.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        if (navMypage) {
            navMypage.addEventListener('click', function() {
                window.location.href = '01_mypage.html';
            });
        }

        // 초기 렌더링
        renderPhotosGrid();

        console.log('지역 추억 상세 페이지 초기화 완료');
    }
});


// ==================== 그룹 추억 페이지 기능 ====================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === '02_groupmemory.html') {
        console.log('그룹 추억 페이지 초기화 시작');

        // URL 파라미터에서 그룹 ID 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get('groupId');

        console.log('그룹 ID:', groupId);

        // 그룹 데이터 가져오기
        const groups = JSON.parse(localStorage.getItem('mynokGroups') || '[]');
        const currentGroup = groups.find(g => g.id === groupId);

        if (!currentGroup) {
            console.error('그룹을 찾을 수 없습니다:', groupId);
            alert('그룹을 찾을 수 없습니다.');
            window.location.href = '01_main.html';
            return;
        }

        console.log('현재 그룹:', currentGroup);

        // 페이지 타이틀 설정
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = `${currentGroup.name} - 마이노크`;
        }

        // 헤더에 그룹 이름 표시
        const headerGroupName = document.getElementById('headerGroupName');
        if (headerGroupName) {
            headerGroupName.textContent = currentGroup.name;
        }

        // 배너에 그룹 이름과 날짜 표시
        const bannerGroupName = document.getElementById('bannerGroupName');
        const bannerGroupDays = document.getElementById('bannerGroupDays');
        const bannerGroupStatus = document.getElementById('bannerGroupStatus');

        if (bannerGroupName) {
            bannerGroupName.textContent = currentGroup.name;
        }

        if (bannerGroupDays && currentGroup.createdDate) {
            const createdDate = new Date(currentGroup.createdDate);
            const today = new Date();
            const diffTime = Math.abs(today - createdDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            bannerGroupDays.textContent = `${diffDays}일째`;
        }

        if (bannerGroupStatus && currentGroup.isSharing !== undefined) {
            bannerGroupStatus.textContent = currentGroup.isSharing ? '공유중이에요' : '간직중이에요';
        }

        // "우리 ... 그룹의 추억에는" 텍스트 설정
        const groupMemoryTypesTitle = document.getElementById('groupMemoryTypesTitle');
        if (groupMemoryTypesTitle) {
            groupMemoryTypesTitle.textContent = `우리 ${currentGroup.name} 그룹의 추억에는`;
        }

        // 그룹 멤버 표시
        const memberCardGroupName = document.getElementById('memberCardGroupName');
        const memberCount = document.getElementById('memberCount');
        const groupMembersList = document.getElementById('groupMembersList');

        if (memberCardGroupName) {
            memberCardGroupName.textContent = currentGroup.name;
        }

        const members = currentGroup.members || [];
        if (memberCount) {
            memberCount.textContent = `${members.length}명`;
        }

        if (groupMembersList) {
            groupMembersList.innerHTML = '';

            if (members.length === 0) {
                groupMembersList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">그룹 멤버가 없습니다.</p>';
            } else {
                members.forEach(member => {
                    const memberItem = document.createElement('div');
                    memberItem.className = 'group-member-item';

                    // 멤버 이미지
                    let avatarHTML = '';
                    if (member.profileImage) {
                        avatarHTML = `<img src="${member.profileImage}" alt="${member.name}" class="group-member-avatar">`;
                    } else {
                        avatarHTML = `<div class="group-member-avatar-placeholder">👤</div>`;
                    }

                    memberItem.innerHTML = `
                        ${avatarHTML}
                        <div class="group-member-info">
                            <div class="group-member-name">${member.name}</div>
                            <div class="group-member-relation">${member.relation || '그룹 멤버'}</div>
                        </div>
                    `;

                    groupMembersList.appendChild(memberItem);
                });
            }
        }

        // 배너에 그룹 프로필 이미지 표시 (최대 4명)
        const groupProfileImages = document.getElementById('groupProfileImages');
        if (groupProfileImages && members.length > 0) {
            groupProfileImages.innerHTML = '';
            groupProfileImages.classList.add('has-members');

            const displayMembers = members.slice(0, 4);
            displayMembers.forEach(member => {
                if (member.profileImage) {
                    const img = document.createElement('img');
                    img.src = member.profileImage;
                    img.alt = member.name;
                    img.className = 'group-member-profile';
                    groupProfileImages.appendChild(img);
                }
            });

            // 이미지가 없으면 기본 아이콘 표시
            if (groupProfileImages.children.length === 0) {
                groupProfileImages.classList.remove('has-members');
                groupProfileImages.innerHTML = '<div class="group-profile-icon">👥</div>';
            }
        }

        // 뒤로가기 버튼
        const backFromGroupMemory = document.getElementById('backFromGroupMemory');
        if (backFromGroupMemory) {
            backFromGroupMemory.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        // 공유 토글
        const groupShareToggle = document.getElementById('groupShareToggle');
        const groupShareModalOverlay = document.getElementById('groupShareModalOverlay');
        const groupModalBtnNo = document.getElementById('groupModalBtnNo');
        const groupModalBtnYes = document.getElementById('groupModalBtnYes');

        if (groupShareToggle) {
            // 초기 상태 설정
            if (currentGroup.isSharing !== undefined) {
                if (currentGroup.isSharing) {
                    groupShareToggle.classList.add('active');
                } else {
                    groupShareToggle.classList.remove('active');
                }
            }

            groupShareToggle.addEventListener('click', function(e) {
                e.stopPropagation();

                if (groupShareToggle.classList.contains('active')) {
                    // 공유중 → 간직중으로 변경하려고 할 때 모달 표시
                    if (groupShareModalOverlay) {
                        groupShareModalOverlay.style.display = 'flex';
                    }
                } else {
                    // 간직중 → 공유중으로 변경
                    groupShareToggle.classList.add('active');
                    currentGroup.isSharing = true;

                    // localStorage 업데이트
                    const updatedGroups = groups.map(g =>
                        g.id === groupId ? currentGroup : g
                    );
                    localStorage.setItem('mynokGroups', JSON.stringify(updatedGroups));

                    // 배너 상태 업데이트
                    if (bannerGroupStatus) {
                        bannerGroupStatus.textContent = '공유중이에요';
                    }

                    console.log('그룹 공유 상태 변경: 공유중');
                }
            });
        }

        // 모달 "네" 버튼 (간직중으로 변경)
        if (groupModalBtnNo) {
            groupModalBtnNo.addEventListener('click', function() {
                groupShareToggle.classList.remove('active');
                currentGroup.isSharing = false;

                // localStorage 업데이트
                const updatedGroups = groups.map(g =>
                    g.id === groupId ? currentGroup : g
                );
                localStorage.setItem('mynokGroups', JSON.stringify(updatedGroups));

                // 배너 상태 업데이트
                if (bannerGroupStatus) {
                    bannerGroupStatus.textContent = '간직중이에요';
                }

                // 모달 닫기
                if (groupShareModalOverlay) {
                    groupShareModalOverlay.style.display = 'none';
                }

                console.log('그룹 공유 상태 변경: 간직중');
            });
        }

        // 모달 "아니요" 버튼 (취소)
        if (groupModalBtnYes) {
            groupModalBtnYes.addEventListener('click', function() {
                if (groupShareModalOverlay) {
                    groupShareModalOverlay.style.display = 'none';
                }
            });
        }

        // 모달 오버레이 클릭시 닫기
        if (groupShareModalOverlay) {
            groupShareModalOverlay.addEventListener('click', function(e) {
                if (e.target === groupShareModalOverlay) {
                    groupShareModalOverlay.style.display = 'none';
                }
            });
        }

        // 선물하러 가기 버튼
        const groupGiftBtn = document.getElementById('groupGiftBtn');
        if (groupGiftBtn) {
            groupGiftBtn.addEventListener('click', function() {
                window.location.href = '05_gift.html';
            });
        }

        // 하단 네비게이션
        const navHome = document.getElementById('navHome');
        const navCalendar = document.getElementById('navCalendar');
        const navMypage = document.getElementById('navMypage');

        if (navHome) {
            navHome.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        if (navCalendar) {
            navCalendar.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        if (navMypage) {
            navMypage.addEventListener('click', function() {
                window.location.href = '01_mypage.html';
            });
        }

        // 그룹 멤버 토글 기능
        const groupMembersHeader = document.getElementById('groupMembersHeader');
        const groupMembersToggle = document.getElementById('groupMembersToggle');

        if (groupMembersHeader && groupMembersToggle && groupMembersList) {
            // 초기 상태: 접힌 상태로 설정
            groupMembersList.classList.add('collapsed');
            groupMembersToggle.classList.add('collapsed');

            groupMembersHeader.addEventListener('click', function() {
                groupMembersList.classList.toggle('collapsed');
                groupMembersToggle.classList.toggle('collapsed');
            });
        }

        console.log('그룹 추억 페이지 초기화 완료');
    }
});


// ==================== 키링 구매 페이지 기능 ====================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'keyring.html') {
        console.log('키링 구매 페이지 초기화 시작');

        // 뒤로가기 버튼
        const backFromKeyring = document.getElementById('backFromKeyring');
        if (backFromKeyring) {
            backFromKeyring.addEventListener('click', function() {
                window.location.href = '05_gift.html';
            });
        }

        // 배송 정보 토글
        const deliveryToggleBtn = document.getElementById('deliveryToggleBtn');
        const deliveryDetailInfo = document.getElementById('deliveryDetailInfo');

        if (deliveryToggleBtn && deliveryDetailInfo) {
            deliveryToggleBtn.addEventListener('click', function() {
                deliveryDetailInfo.classList.toggle('collapsed');
                deliveryToggleBtn.classList.toggle('rotated');
            });
        }

        // 구매하기 버튼
        const purchaseBtn = document.getElementById('purchaseBtn');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', function() {
                alert('구매 기능은 준비중입니다.');
            });
        }

        // 하단 네비게이션
        const navHome = document.getElementById('navHome');
        const navCalendar = document.getElementById('navCalendar');
        const navMypage = document.getElementById('navMypage');

        if (navHome) {
            navHome.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        if (navCalendar) {
            navCalendar.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        if (navMypage) {
            navMypage.addEventListener('click', function() {
                window.location.href = '01_mypage.html';
            });
        }

        console.log('키링 구매 페이지 초기화 완료');
    }

    // ==================== 액자 구매 페이지 ====================
    if (currentPage === 'frame.html') {
        console.log('액자 구매 페이지 초기화 시작');

        // 뒤로가기 버튼
        const backFromFrame = document.getElementById('backFromFrame');
        if (backFromFrame) {
            backFromFrame.addEventListener('click', function() {
                window.location.href = '05_gift.html';
            });
        }

        // 배송 정보 토글
        const deliveryToggleBtn = document.getElementById('deliveryToggleBtn');
        const deliveryDetailInfo = document.getElementById('deliveryDetailInfo');

        if (deliveryToggleBtn && deliveryDetailInfo) {
            deliveryToggleBtn.addEventListener('click', function() {
                deliveryDetailInfo.classList.toggle('collapsed');
                deliveryToggleBtn.classList.toggle('rotated');
            });
        }

        // 선물하기 버튼
        const purchaseBtn = document.getElementById('purchaseBtn');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', function() {
                alert('선물 기능은 준비중입니다.');
            });
        }

        // 하단 네비게이션
        const navHome = document.getElementById('navHome');
        const navCalendar = document.getElementById('navCalendar');
        const navMypage = document.getElementById('navMypage');

        if (navHome) {
            navHome.addEventListener('click', function() {
                window.location.href = '01_main.html';
            });
        }

        if (navCalendar) {
            navCalendar.addEventListener('click', function() {
                window.location.href = '03_calendar.html';
            });
        }

        if (navMypage) {
            navMypage.addEventListener('click', function() {
                window.location.href = '01_mypage.html';
            });
        }

        console.log('액자 구매 페이지 초기화 완료');
    }
});
