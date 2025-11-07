// 탭 전환 기능
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const connectionTab = document.getElementById('connectionTab');
    const groupTab = document.getElementById('groupTab');

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

    // 검색 기능 (추후 구현 가능)
    const searchInput = document.querySelector('.search-input');
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

    // 추억 노크하기 버튼 클릭
    const knockButtons = document.querySelectorAll('.knock-btn');
    knockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const connectionName = this.closest('.connection-item').querySelector('.connection-name').textContent;
            alert(`${connectionName}님의 추억 노크하기`);
        });
    });

    // 인연 추가하기 버튼
    const addConnectionBtn = document.querySelector('.add-connection-btn');
    addConnectionBtn.addEventListener('click', function() {
        alert('인연 추가하기 페이지로 이동');
    });

    // 선물하러 가기 버튼
    const giftBtn = document.querySelector('.gift-btn');
    if (giftBtn) {
        giftBtn.addEventListener('click', function() {
            alert('추억 선물하러 가기');
        });
    }

    // 그룹 추억 노크하기 버튼
    const groupKnockButtons = document.querySelectorAll('.group-knock-btn');
    groupKnockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-card').querySelector('.group-name').textContent;
            alert(`${groupName} 추억 노크하기`);
        });
    });

    // 그룹 추가 버튼
    const addGroupBtn = document.querySelector('.add-group-btn');
    if (addGroupBtn) {
        addGroupBtn.addEventListener('click', function() {
            alert('새 그룹 만들기');
        });
    }

    // 하단 네비게이션
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const navLabel = this.querySelector('.nav-label').textContent;
            console.log(`${navLabel} 클릭`);
        });
    });
});
