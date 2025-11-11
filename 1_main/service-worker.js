const CACHE_NAME = 'mynok-v1';
const urlsToCache = [
  '/',
  '/00_loading.html',
  '/00_login.html',
  '/00_join.html',
  '/01_main.html',
  '/01_mypage.html',
  '/01_list_edit.html',
  '/02_memory.html',
  '/02_groupmemory.html',
  '/03_letter.html',
  '/03_photo.html',
  '/03_calendar.html',
  '/03_groupletter.html',
  '/03_groupphoto.html',
  '/04_voice.html',
  '/04_placephoto.html',
  '/04_groupvoice.html',
  '/04_groupplacephoto.html',
  '/05_gift.html',
  '/peopleplus.html',
  '/new_group.html',
  '/edit_group.html',
  '/letter_write.html',
  '/calendar_plus.html',
  '/keyring.html',
  '/frame.html',
  '/script.js',
  '/styles.css'
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
