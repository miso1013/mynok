// 탭 전환 기능
document.addEventListener('DOMContentLoaded', function() {
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
            memories: 47,
            avatar: '../img/마이노크 메인페이지.jpg'
        },
        {
            name: '할머니',
            birthday: '08월 15일',
            memories: 654,
            avatar: null
        },
        {
            name: '시월이',
            birthday: '10월 13일',
            memories: 23,
            avatar: null
        }
    ];

    // localStorage에서 인연 데이터 불러오기
    function getConnections() {
        const saved = localStorage.getItem('mynokConnections');
        if (saved) {
            return JSON.parse(saved);
        }
        // 처음이면 기본 데이터 저장
        localStorage.setItem('mynokConnections', JSON.stringify(defaultConnections));
        return defaultConnections;
    }

    // 인연 목록 렌더링
    function renderConnections() {
        const connectionsList = document.getElementById('connectionsList');
        if (!connectionsList) return;

        const connections = getConnections();
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

            // 생일 표시 텍스트
            const birthdayText = connection.birthday === '정보 없음' ? '생일 정보 없음' : `생일 ${connection.birthday}`;

            connectionItem.innerHTML = `
                ${avatarHtml}
                <div class="connection-info">
                    <h3 class="connection-name">${connection.name}</h3>
                    <p class="connection-birthday">${birthdayText}</p>
                    <p class="connection-memories">추억 ${connection.memories}개</p>
                </div>
                <button class="knock-btn">📖 추억 노크하기</button>
            `;

            connectionsList.appendChild(connectionItem);
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
                const connectionName = this.closest('.connection-item').querySelector('.connection-name').textContent;
                alert(`${connectionName}님의 추억 노크하기`);
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
            alert('추억 선물하러 가기');
        });
    }

    // 그룹 추억 노크하기 버튼
    const groupKnockButtons = document.querySelectorAll('.group-knock-btn');
    if (groupKnockButtons.length > 0) {
        groupKnockButtons.forEach(button => {
            button.addEventListener('click', function() {
                const groupName = this.closest('.group-card').querySelector('.group-name').textContent;
                alert(`${groupName} 추억 노크하기`);
            });
        });
    }

    // 그룹 추가 버튼
    const addGroupBtn = document.querySelector('.add-group-btn');
    if (addGroupBtn) {
        addGroupBtn.addEventListener('click', function() {
            alert('새 그룹 만들기');
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

    // 생년월일 체크박스
    const birthdayUnknown = document.getElementById('birthdayUnknown');
    const birthdayInput = document.getElementById('birthdayInput');
    if (birthdayUnknown && birthdayInput) {
        birthdayUnknown.addEventListener('change', function() {
            if (this.checked) {
                birthdayInput.disabled = true;
                birthdayInput.style.backgroundColor = '#f5f5f5';
                birthdayInput.value = '';
            } else {
                birthdayInput.disabled = false;
                birthdayInput.style.backgroundColor = 'white';
            }
        });
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

    // 인연 추가 폼 제출
    const addConnectionForm = document.querySelector('.add-connection-form');
    if (addConnectionForm) {
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
                // "모르겠어요" 체크된 경우
                birthday = '정보 없음';
            } else if (birthdayInput && birthdayInput.value.trim()) {
                // 생년월일 입력된 경우
                birthday = birthdayInput.value.trim();
            }

            // 연락처 처리
            let contact = '정보 없음';
            if (contactUnknown && contactUnknown.checked) {
                // "모르겠어요" 체크된 경우
                contact = '정보 없음';
            } else if (contactInput && contactInput.value.trim()) {
                // 연락처 입력된 경우
                contact = contactInput.value.trim();
            }

            // 새 인연 데이터 생성
            const newConnection = {
                name: nameInput.value.trim(),
                birthday: birthday,
                contact: contact,
                memories: 0,
                avatar: null
            };

            // localStorage에 저장
            const connections = getConnections();
            connections.push(newConnection);
            localStorage.setItem('mynokConnections', JSON.stringify(connections));

            console.log('새 인연 추가:', newConnection);
            alert(`${newConnection.name}님이 인연 목록에 추가되었습니다!`);
            window.location.href = '01_main.html';
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

    // 마이페이지 - 추억 지우기 버튼
    const removeMemoryBtn = document.getElementById('removeMemoryBtn');
    if (removeMemoryBtn) {
        removeMemoryBtn.addEventListener('click', function() {
            window.location.href = '01_list_remove.html';
        });
    }

    // 마이페이지 - 인연 추가하기 버튼
    const mypageAddConnectionBtn = document.getElementById('addConnectionBtn');
    if (mypageAddConnectionBtn) {
        mypageAddConnectionBtn.addEventListener('click', function() {
            window.location.href = 'peopleplus.html';
        });
    }

    // 네비게이션 바 - 마이노크홈
    const navHome = document.getElementById('navHome');
    if (navHome) {
        navHome.addEventListener('click', function() {
            window.location.href = '01_main.html';
        });
    }

    // 네비게이션 바 - 캘린더 (추후 구현)
    const navCalendar = document.getElementById('navCalendar');
    if (navCalendar) {
        navCalendar.addEventListener('click', function() {
            alert('캘린더 기능은 추후 구현 예정입니다.');
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

            removeItem.innerHTML = `
                <div class="remove-checkbox-container">
                    <input type="checkbox" class="remove-checkbox" data-index="${index}">
                </div>
                <div class="remove-connection-content">
                    ${avatarHtml}
                    <div class="remove-connection-info">
                        <h3 class="remove-connection-name">${connection.name}</h3>
                        <p class="remove-connection-details">${birthdayText} · 추억 ${connection.memories}개</p>
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
                alert('삭제할 인연을 선택해주세요.');
                return;
            }

            // 선택된 인연 이름 목록
            const selectedNames = Array.from(checkboxes).map(cb => {
                const index = parseInt(cb.dataset.index);
                const connections = getConnections();
                return connections[index].name;
            }).join(', ');

            // 확인 메시지
            const confirmed = confirm(`정말 ${selectedNames} 님을 추억 대상에서 지우시겠습니까?`);

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
                alert('선택한 인연이 삭제되었습니다.');
                window.location.href = '01_main.html';
            }
        });
    }
});
