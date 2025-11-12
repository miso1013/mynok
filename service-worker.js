const CACHE_NAME = 'mynok-v9';
const urlsToCache = [
  '/1_main/',
  '/1_main/00_loading.html',
  '/1_main/00_login.html',
  '/1_main/00_join.html',
  '/1_main/01_main.html',
  '/1_main/01_mypage.html',
  '/1_main/01_list_edit.html',
  '/1_main/02_memory.html',
  '/1_main/02_groupmemory.html',
  '/1_main/03_letter.html',
  '/1_main/03_photo.html',
  '/1_main/03_calendar.html',
  '/1_main/03_groupletter.html',
  '/1_main/03_groupphoto.html',
  '/1_main/04_voice.html',
  '/1_main/04_placephoto.html',
  '/1_main/04_groupvoice.html',
  '/1_main/04_groupplacephoto.html',
  '/1_main/05_gift.html',
  '/1_main/peopleplus.html',
  '/1_main/new_group.html',
  '/1_main/edit_group.html',
  '/1_main/letter_write.html',
  '/1_main/calendar_plus.html',
  '/1_main/keyring.html',
  '/1_main/frame.html',
  '/1_main/script.js',
  '/1_main/styles.css'
];

// 설치 이벤트: 캐시 생성
self.addEventListener('install', event => {
  console.log('[Service Worker] 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] 캐시 생성 완료');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] 캐시 생성 실패:', err);
      })
  );
  self.skipWaiting();
});

// 활성화 이벤트: 이전 캐시 삭제
self.addEventListener('activate', event => {
  console.log('[Service Worker] 활성화 중...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch 이벤트: 캐시 우선 전략
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시에서 반환
        if (response) {
          return response;
        }

        // 캐시에 없으면 네트워크 요청
        return fetch(event.request)
          .then(response => {
            // 유효한 응답인지 확인
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 응답 복사 (한 번만 사용 가능하므로)
            const responseToCache = response.clone();

            // 캐시에 저장
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(err => {
            console.error('[Service Worker] Fetch 실패:', err);
            // 오프라인 페이지가 있다면 여기서 반환
          });
      })
  );
});
