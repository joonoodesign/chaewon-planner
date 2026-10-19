/**
 * 채원이의 스터디 & 티칭 플래너 (경북대 역사교육과 2학년 & 초·중·고 수학학원 강사 맞춤형)
 * 지원 기기: 아이폰(iOS), 아이패드(iPadOS), PC 웹 브라우저 실시간 동기화
 */

const STORAGE_KEY = 'chaewon_planner_data_v1';
const SYNC_CONFIG_KEY = 'chaewon_planner_sync_cfg_v1';
const THEME_KEY = 'chaewon_planner_theme';

// 카테고리별 세부 태그 옵션
const SUB_TAG_OPTIONS = {
  math: [
    { value: '초등부', label: '🌱 초등부' },
    { value: '중등부', label: '📘 중등부' },
    { value: '고등부', label: '🎓 고등부' },
    { value: '초·중·고 공통', label: '📐 학원 공통' }
  ],
  history: [
    { value: '한국사', label: '🏛️ 한국사' },
    { value: '동양사', label: '🏮 동양사' },
    { value: '서양사', label: '🏺 서양사' },
    { value: '역사교육론', label: '👩‍🏫 역사교육론·교직' },
    { value: '사료강독', label: '📜 사료강독' },
    { value: '학술답사', label: '🧭 정기 학술답사' }
  ],
  cert: [
    { value: '임용기초', label: '🎯 임용고시 기초' },
    { value: '교육학', label: '📚 교육학 스터디' },
    { value: '어학·자격증', label: '🪪 토익·한능검·자격증' }
  ],
  life: [
    { value: '개인일정', label: '🌸 개인 약속·일상' },
    { value: '동아리·대외활동', label: '🤝 과학생회·동아리' },
    { value: '건강·운동', label: '🏃‍♀️ 건강·체력관리' }
  ]
};

// 현재 연월 구하기 (YYYY-MM)
function getCurrentYearMonth() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function getTodayDateStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysStr(days) {
  const dt = new Date();
  dt.setDate(dt.getDate() + days);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 초기 샘플 데이터 (채원 맞춤형)
function getDefaultData() {
  const today = getTodayDateStr();
  const ym = getCurrentYearMonth();
  return {
    updatedAt: Date.now(),
    todos: [
      {
        id: 't1',
        title: '[고등부] 고1 공통수학·고2 미적분 내신 심화 킬러문항 손풀이 제작',
        category: 'math',
        subTag: '고등부',
        dueDate: today,
        urgent: true,
        completed: false,
        createdAt: Date.now() - 3600000 * 5
      },
      {
        id: 't2',
        title: '[중등부] 중2 일차함수 & 도형의 닮음 주간 테스트 오답 프린트 인쇄',
        category: 'math',
        subTag: '중등부',
        dueDate: today,
        urgent: false,
        completed: false,
        createdAt: Date.now() - 3600000 * 4
      },
      {
        id: 't3',
        title: '[초등부] 초5·초6 분수 연산 교재 채점 및 학부모 피드백 문자 발송',
        category: 'math',
        subTag: '초등부',
        dueDate: addDaysStr(1),
        urgent: false,
        completed: false,
        createdAt: Date.now() - 3600000 * 3
      },
      {
        id: 't4',
        title: '[전공] 한국근세사 사료강독 원문 해석 및 발제문 2페이지 요약',
        category: 'history',
        subTag: '사료강독',
        dueDate: addDaysStr(1),
        urgent: true,
        completed: false,
        createdAt: Date.now() - 3600000 * 2
      },
      {
        id: 't5',
        title: '[전공] 역사교육론 중학교 역사 수업 시연 지도안 초안 작성',
        category: 'history',
        subTag: '역사교육론',
        dueDate: addDaysStr(3),
        urgent: false,
        completed: false,
        createdAt: Date.now() - 3600000 * 1
      },
      {
        id: 't6',
        title: '[전공] 경북대 역사교육과 정기 학술답사 담당 유적지 자료집 정리',
        category: 'history',
        subTag: '학술답사',
        dueDate: addDaysStr(5),
        urgent: false,
        completed: true,
        createdAt: Date.now() - 3600000 * 10
      }
    ],
    ddays: [
      { id: 'd1', title: '역사교육과 정기 학술답사', date: addDaysStr(11) },
      { id: 'd2', title: '학원 중·고등 기말 내신대비 돌입', date: addDaysStr(18) },
      { id: 'd3', title: '경북대 기말고사 시작', date: addDaysStr(45) }
    ],
    salaryConfig: {
      rateElem: 15000,
      rateMid: 18000,
      rateHigh: 22000,
      tax33: true
    },
    workLogs: [
      {
        id: 'w1',
        date: `${ym}-05`,
        grade: '초등부',
        hours: 2.0,
        memo: '초등 5·6학년 연산 및 개념반 수업'
      },
      {
        id: 'w2',
        date: `${ym}-07`,
        grade: '중등부',
        hours: 3.0,
        memo: '중2·중3 내신 정규반 수업 및 질의응답'
      },
      {
        id: 'w3',
        date: `${ym}-10`,
        grade: '고등부',
        hours: 3.5,
        memo: '고1 공통수학 & 고2 미적분 심화반 수업'
      },
      {
        id: 'w4',
        date: today,
        grade: '중등부',
        hours: 2.5,
        memo: '중등부 함수 특강 및 초등부 클리닉'
      }
    ],
    schedules: [
      { id: 's1', day: '월', type: 'history', time: '10:30~12:00', name: '한국근세사 (전공)' },
      { id: 's2', day: '월', type: 'math', time: '17:30~21:30', name: '초등·중등 수학수업' },
      { id: 's3', day: '화', type: 'history', time: '13:30~15:00', name: '역사교육론 (전공)' },
      { id: 's4', day: '화', type: 'math', time: '18:30~22:00', name: '고등부 내신·심화반' },
      { id: 's5', day: '수', type: 'history', time: '10:30~12:00', name: '동양중세사 (전공)' },
      { id: 's6', day: '수', type: 'math', time: '17:30~21:30', name: '초등·중등 수학수업' },
      { id: 's7', day: '목', type: 'history', time: '15:00~16:30', name: '사료강독 세미나' },
      { id: 's8', day: '목', type: 'math', time: '18:30~22:00', name: '고등부 집중클리닉' },
      { id: 's9', day: '금', type: 'history', time: '11:00~13:00', name: '서양근대사 (전공)' },
      { id: 's10', day: '금', type: 'math', time: '17:30~21:00', name: '초·중·고 주간테스트' }
    ]
  };
}

// 전역 상태
let appData = loadLocalData();
let currentMainFilter = 'all';
let currentGradeFilter = 'all';
let localServerAvailable = false;
let isSyncing = false;

let syncConfig = loadSyncConfig();

function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    return { ...getDefaultData(), ...parsed };
  } catch (e) {
    return getDefaultData();
  }
}

function loadSyncConfig() {
  try {
    const raw = localStorage.getItem(SYNC_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    cloudDbUrl: '',
    roomKey: 'chaewon-knu-2026'
  };
}

function saveSyncConfig() {
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(syncConfig));
}

// URL 파라미터 및 해시를 통한 원클릭 동기화 설정 감지 (아이폰/아이패드/PC 링크 클릭 시 자동 세팅)
function checkUrlSyncParams() {
  if (window.__PRECONFIGURED_GDRIVE_URL__) {
    syncConfig.cloudDbUrl = window.__PRECONFIGURED_GDRIVE_URL__;
    saveSyncConfig();
  }
  const params = new URLSearchParams(window.location.search);
  const cloudUrl = params.get('cloudUrl');
  const roomKey = params.get('roomKey');
  const ghSyncParam = params.get('ghSync');
  if (cloudUrl) {
    syncConfig.cloudDbUrl = cloudUrl;
    if (roomKey) syncConfig.roomKey = roomKey;
    saveSyncConfig();
  }
  if (ghSyncParam) {
    try {
      syncConfig.ghToken = atob(ghSyncParam);
      saveSyncConfig();
    } catch (e) {}
  }
  if (window.location.hash && window.location.hash.includes('ghSync=')) {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const hVal = hashParams.get('ghSync');
    if (hVal) {
      try {
        syncConfig.ghToken = atob(hVal);
        saveSyncConfig();
      } catch (e) {}
    }
  }
  if (cloudUrl || ghSyncParam || (window.location.hash && window.location.hash.includes('ghSync='))) {
    try {
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (e) {}
  }
}

// 데이터 저장 및 동기화 트리거
async function commitData(skipRemotePush = false) {
  appData.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  renderAll();
  if (!skipRemotePush) {
    await pushToRemoteSync();
  }
}

// ==================== 동기화 엔진 (로컬 서버 + 구글 드라이브 + 클라우드 DB) ====================

function updateSyncIndicator(state, message) {
  const dot = document.getElementById('syncDot');
  const txt = document.getElementById('syncStatusText');
  if (!dot || !txt) return;
  dot.className = 'sync-dot';
  if (state === 'online') dot.classList.add('online');
  if (state === 'syncing') dot.classList.add('syncing');
  txt.textContent = message;
}

async function initSyncEngine() {
  checkUrlSyncParams();

  // 1) 로컬 홈 서버(/api/info) 동작 여부 감지
  try {
    const res = await fetch('/api/info', { cache: 'no-store' });
    if (res.ok) {
      const info = await res.json();
      localServerAvailable = true;
      setupLocalServerModalInfo(info);
      await pullFromLocalServer();
    }
  } catch (e) {
    localServerAvailable = false;
    setupLocalServerModalInfo(null);
  }

  // 2) 외부 클라우드 DB (구글 드라이브 또는 자동 클라우드 DB) 불러오기
  if (syncConfig.cloudDbUrl || syncConfig.ghToken) {
    await pullFromCloudDb();
  }

  refreshSyncBadge();

  // 6초마다 원격 변경사항 자동 폴링 (아이폰 <-> 아이패드 <-> PC 실시간 반영)
  setInterval(async () => {
    if (isSyncing) return;
    if (localServerAvailable) {
      await pullFromLocalServer(true);
    }
    if (syncConfig.cloudDbUrl || syncConfig.ghToken) {
      await pullFromCloudDb(true);
    }
  }, 6000);
}

function isGoogleDriveUrl(url) {
  return String(url || '').includes('script.google.com');
}

function refreshSyncBadge() {
  const isGDrive = isGoogleDriveUrl(syncConfig.cloudDbUrl);
  if (isGDrive) {
    updateSyncIndicator('online', '구글 드라이브 실시간 동기화 중');
  } else if (syncConfig.ghToken) {
    updateSyncIndicator('online', '24시간 클라우드 실시간 동기화 중');
  } else if (localServerAvailable) {
    updateSyncIndicator('online', '기기 실시간 동기화 중');
  } else if (syncConfig.cloudDbUrl) {
    updateSyncIndicator('online', '클라우드 동기화 중');
  } else {
    updateSyncIndicator('offline', '이 기기에 저장됨 (동기화 설정)');
  }
}

function setupLocalServerModalInfo(info) {
  const urlBox = document.getElementById('localServerUrlBox');
  const qrContainer = document.getElementById('qrContainer');
  const qrImage = document.getElementById('qrImage');

  if (info && info.lanUrl) {
    urlBox.innerHTML = `<strong>접속 주소:</strong> <a href="${info.lanUrl}" target="_blank" style="color:var(--primary);">${info.lanUrl}</a>`;
    qrContainer.style.display = 'flex';
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(info.lanUrl)}`;
  } else if (syncConfig.ghToken) {
    const shareUrl = `${window.location.origin}${window.location.pathname}#ghSync=${btoa(syncConfig.ghToken)}`;
    urlBox.innerHTML = `<strong>24시간 클라우드 동기화 활성화됨!</strong> 아래 QR코드를 아이폰/아이패드로 스캔하면 즉시 연동됩니다.`;
    qrContainer.style.display = 'flex';
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;
  } else {
    urlBox.textContent = '현재 정적 파일로 열려 있습니다. 아래 클라우드 동기화를 연결하면 모든 기기가 24시간 동기화됩니다.';
    qrContainer.style.display = 'none';
  }
}

async function pullFromLocalServer(silent = false) {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) return;
    const remoteData = await res.json();
    if (remoteData && remoteData.updatedAt) {
      if (remoteData.updatedAt > (appData.updatedAt || 0)) {
        appData = remoteData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        renderAll();
      } else if ((appData.updatedAt || 0) > remoteData.updatedAt) {
        await pushToLocalServer();
      }
    }
  } catch (e) {}
}

async function pushToLocalServer() {
  if (!localServerAvailable) return;
  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
  } catch (e) {}
}

function getCloudEndpoint() {
  if (!syncConfig.cloudDbUrl) return null;
  let base = syncConfig.cloudDbUrl.trim();
  if (isGoogleDriveUrl(base)) {
    return base;
  }
  base = base.replace(/\/+$/, '');
  const room = encodeURIComponent((syncConfig.roomKey || 'chaewon-knu-2026').trim());
  return `${base}/chaewon_planner/${room}.json`;
}

// UTF-8 Base64 인코딩/디코딩 헬퍼 (한글 깨짐 방지)
function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function base64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\s/g, ''))));
}

let lastGhSha = null;

async function pullFromGhCloud() {
  if (!syncConfig.ghToken) return;
  const apiUrl = 'https://api.github.com/repos/joonoodesign/chaewon-planner/contents/chaewon_sync_db.json';
  const res = await fetch(`${apiUrl}?ref=db-store&t=${Date.now()}`, {
    headers: {
      'Authorization': `Bearer ${syncConfig.ghToken}`,
      'Accept': 'application/vnd.github+json'
    },
    cache: 'no-store'
  });
  if (res.status === 404) {
    await pushToGhCloud();
    return;
  }
  if (!res.ok) return;
  const meta = await res.json();
  if (meta && meta.sha) lastGhSha = meta.sha;
  if (meta && meta.content) {
    const remoteData = JSON.parse(base64ToUtf8(meta.content));
    if (remoteData && typeof remoteData.updatedAt === 'number') {
      if (remoteData.updatedAt > (appData.updatedAt || 0) && Array.isArray(remoteData.todos)) {
        appData = remoteData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        renderAll();
      } else if ((appData.updatedAt || 0) > remoteData.updatedAt) {
        await pushToGhCloud();
      }
    }
  }
}

async function pushToGhCloud() {
  if (!syncConfig.ghToken) return;
  const apiUrl = 'https://api.github.com/repos/joonoodesign/chaewon-planner/contents/chaewon_sync_db.json';
  if (!lastGhSha) {
    try {
      const check = await fetch(`${apiUrl}?ref=db-store&t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${syncConfig.ghToken}`,
          'Accept': 'application/vnd.github+json'
        },
        cache: 'no-store'
      });
      if (check.ok) {
        const meta = await check.json();
        lastGhSha = meta.sha;
      }
    } catch (e) {}
  }
  const bodyObj = {
    message: 'Sync Chaewon planner data',
    branch: 'db-store',
    content: utf8ToBase64(JSON.stringify(appData, null, 2))
  };
  if (lastGhSha) bodyObj.sha = lastGhSha;

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${syncConfig.ghToken}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  });
  if (res.ok) {
    const out = await res.json();
    if (out && out.content && out.content.sha) {
      lastGhSha = out.content.sha;
    }
  }
}

async function pullFromCloudDb(silent = false) {
  const endpoint = getCloudEndpoint();
  if (!endpoint && !syncConfig.ghToken) return;
  try {
    if (!silent) updateSyncIndicator('syncing', '클라우드 확인 중...');
    if (endpoint) {
      const fetchUrl = isGoogleDriveUrl(endpoint)
        ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}mode=api&t=${Date.now()}`
        : endpoint;
      const res = await fetch(fetchUrl, { cache: 'no-store', redirect: 'follow' });
      if (!res.ok) throw new Error('Cloud fetch error');
      const remoteData = await res.json();
      if (remoteData && typeof remoteData.updatedAt === 'number') {
        if (remoteData.updatedAt > (appData.updatedAt || 0) && Array.isArray(remoteData.todos)) {
          appData = remoteData;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
          renderAll();
        } else if ((appData.updatedAt || 0) > remoteData.updatedAt) {
          await pushToCloudDb();
        }
      } else if (remoteData === null) {
        await pushToCloudDb();
      }
    } else if (syncConfig.ghToken) {
      await pullFromGhCloud();
    }
    refreshSyncBadge();
  } catch (e) {
    if (!silent) updateSyncIndicator('offline', '클라우드 연결 확인 필요');
  }
}

async function pushToCloudDb() {
  const endpoint = getCloudEndpoint();
  try {
    if (endpoint) {
      if (isGoogleDriveUrl(endpoint)) {
        await fetch(endpoint, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(appData)
        });
      } else {
        await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
      }
    } else if (syncConfig.ghToken) {
      await pushToGhCloud();
    }
  } catch (e) {}
}

async function pushToRemoteSync() {
  isSyncing = true;
  updateSyncIndicator('syncing', '동기화 저장 중...');
  try {
    if (localServerAvailable) {
      await pushToLocalServer();
    }
    if (syncConfig.cloudDbUrl || syncConfig.ghToken) {
      await pushToCloudDb();
    }
  } finally {
    isSyncing = false;
    refreshSyncBadge();
  }
}

// ==================== UI 렌더링 ====================

function renderAll() {
  renderHeaderBriefing();
  renderDdays();
  renderTodos();
  renderSalarySection();
  renderTimetable();
}

// 경북대 역사교육과 자동 학년 & 학기 계산
function getAutoAcademicInfo(customCfg) {
  const cfg = customCfg || appData.academicConfig || { admissionYear: 2025, gradeOffset: 0 };
  const admissionYear = Number(cfg.admissionYear) || 2025;
  const offset = Number(cfg.gradeOffset) || 0;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1~12

  // 대학 학사일정 기준: 1~2월은 직전 학년도 겨울방학, 3월부터 새 학년 진급
  // 단, 2026년 전체를 2학년으로 직관적으로 표시하되 학기 구분을 함께 제공
  const academicYear = month < 3 ? year - 1 : year;
  let grade = (academicYear - admissionYear + 1) + offset;
  if (grade < 1) grade = 1;

  let semester = '';
  if (month >= 3 && month <= 6) semester = '1학기';
  else if (month >= 7 && month <= 8) semester = '여름방학';
  else if (month >= 9 && month <= 12) semester = '2학기';
  else semester = '겨울방학';

  let gradeText = `${grade}학년`;
  let greeting = '오늘도 역사와 수학을 멋지게 가르치는 하루! ✨';

  if (grade === 1) {
    greeting = `설레는 경북대 역사교육과 1학년 (${semester}), 대학 생활도 수학 수업도 파이팅! 🌱`;
  } else if (grade === 2) {
    greeting = `전공이 깊어지는 역사교육과 2학년 (${semester}), 사료강독도 수학 수업도 완벽하게! ✨`;
  } else if (grade === 3) {
    greeting = `역사교재연구와 수업시연이 빛나는 3학년 (${semester}), 예비 역사교사 채원 파이팅! 🏛️`;
  } else if (grade === 4) {
    greeting = `교육실습과 임용 준비의 결실을 맺는 4학년 (${semester}), 채원이의 꿈을 응원해! 🎯`;
  } else if (grade > 4) {
    gradeText = '졸업·임용준비';
    greeting = `경북대 역사교육과를 빛내는 멋진 선생님 채원, 오늘도 힘찬 하루! 🌟`;
  }

  return {
    grade,
    semester,
    gradeText,
    badgeText: `🏛️ 경북대 역사교육과 ${gradeText} (${semester}) ⚙️`,
    greeting
  };
}

function renderHeaderBriefing() {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const now = new Date();
  const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}`;
  document.getElementById('todayDateDisplay').textContent = dateStr;

  // 자동 학년 배지 및 맞춤 인사말 업데이트
  const acad = getAutoAcademicInfo();
  const badgeEl = document.getElementById('knuGradeBadge');
  if (badgeEl) badgeEl.textContent = acad.badgeText;
  const greetEl = document.getElementById('greetingTitle');
  if (greetEl) greetEl.textContent = acad.greeting;

  const uncompleted = appData.todos.filter(t => !t.completed);
  const mathRemain = uncompleted.filter(t => t.category === 'math').length;
  const histRemain = uncompleted.filter(t => t.category === 'history').length;

  document.getElementById('statRemainTotal').textContent = `${uncompleted.length}건`;
  document.getElementById('statRemainMath').textContent = `${mathRemain}건`;
  document.getElementById('statRemainHistory').textContent = `${histRemain}건`;

  // 이번 달 예상 실수령액 계산
  const ym = document.getElementById('salaryMonthPicker').value || getCurrentYearMonth();
  const summary = calculateMonthlySalary(ym);
  document.getElementById('statMonthPayBrief').textContent = formatWonShort(summary.netPay);
}

function formatWon(num) {
  return `${Math.round(num).toLocaleString('ko-KR')}원`;
}

function formatWonShort(num) {
  if (num >= 10000) {
    const man = (num / 10000).toFixed(1).replace(/\.0$/, '');
    return `${man}만원`;
  }
  return formatWon(num);
}

// D-Day 렌더링
function renderDdays() {
  const container = document.getElementById('ddayList');
  if (!appData.ddays || appData.ddays.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted);">등록된 D-Day가 없습니다.</div>`;
    return;
  }

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const sorted = [...appData.ddays].sort((a, b) => a.date.localeCompare(b.date));
  container.innerHTML = sorted.map(item => {
    const target = new Date(item.date + 'T00:00:00');
    const diffDays = Math.round((target - todayMidnight) / (1000 * 60 * 60 * 24));
    let badge = '';
    if (diffDays === 0) badge = 'D-Day 🔥';
    else if (diffDays > 0) badge = `D-${diffDays}`;
    else badge = `D+${Math.abs(diffDays)}`;

    return `
      <div class="dday-chip">
        <button class="dday-del" data-del-dday="${item.id}" title="삭제">✕</button>
        <div class="dday-count">${badge}</div>
        <div class="dday-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</div>
        <div class="dday-date">${item.date}</div>
      </div>
    `;
  }).join('');
}

// 카테고리 옵션 변경 시 세부 태그 연동
function updateSubTagSelect(category) {
  const select = document.getElementById('todoSubTag');
  const options = SUB_TAG_OPTIONS[category] || SUB_TAG_OPTIONS.math;
  select.innerHTML = options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
}

// 할 일 목록 렌더링
function renderTodos() {
  const container = document.getElementById('todoListContainer');
  let filtered = [...appData.todos];

  if (currentMainFilter !== 'all') {
    filtered = filtered.filter(t => t.category === currentMainFilter);
  }

  if (currentGradeFilter !== 'all') {
    if (currentGradeFilter === 'urgent') {
      filtered = filtered.filter(t => t.urgent);
    } else {
      filtered = filtered.filter(t => t.subTag === currentGradeFilter);
    }
  }

  // 정렬: 미완료 우선 -> 긴급 우선 -> 마감일 빠른 순
  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    return (a.dueDate || '9999-99-99').localeCompare(b.dueDate || '9999-99-99');
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        해당 조건의 할 일이 없습니다. 위 입력창이나 원클릭 버튼으로 추가해 보세요! ✨
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(todo => {
    const catBadge = getCategoryBadgeHtml(todo.category);
    const subBadge = getSubTagBadgeHtml(todo.subTag);
    const urgentBadge = todo.urgent ? `<span class="badge badge-urgent">🔥 중요</span>` : '';

    return `
      <div class="todo-item ${todo.completed ? 'completed' : ''}">
        <div class="todo-left">
          <input type="checkbox" class="todo-checkbox" data-toggle-todo="${todo.id}" ${todo.completed ? 'checked' : ''} />
          <div class="todo-content">
            <div class="todo-badges">
              ${catBadge}
              ${subBadge}
              ${urgentBadge}
            </div>
            <div class="todo-text">${escapeHtml(todo.title)}</div>
            <div class="todo-meta">
              ${todo.dueDate ? `<span>📅 마감: ${todo.dueDate}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="todo-actions">
          <button class="btn-del" data-del-todo="${todo.id}" title="삭제">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryBadgeHtml(cat) {
  switch (cat) {
    case 'math': return `<span class="badge badge-math">📐 수학학원</span>`;
    case 'history': return `<span class="badge badge-history">🏛️ 역사교육과</span>`;
    case 'cert': return `<span class="badge badge-cert">🎯 임용·루틴</span>`;
    case 'life': return `<span class="badge badge-life">🌸 일상</span>`;
    default: return '';
  }
}

function getSubTagBadgeHtml(subTag) {
  if (!subTag) return '';
  if (subTag === '초등부') return `<span class="badge badge-elem">🌱 초등부</span>`;
  if (subTag === '중등부') return `<span class="badge badge-mid">📘 중등부</span>`;
  if (subTag === '고등부') return `<span class="badge badge-high">🎓 고등부</span>`;
  return `<span class="badge" style="background:var(--bg-subtle); color:var(--text-muted);">${escapeHtml(subTag)}</span>`;
}

// ==================== 초·중·고 시급/급여 정산기 ====================

function calculateMonthlySalary(yearMonth) {
  const cfg = appData.salaryConfig || { rateElem: 15000, rateMid: 18000, rateHigh: 22000, tax33: true };
  const logs = (appData.workLogs || []).filter(w => (w.date || '').startsWith(yearMonth));

  let elemHrs = 0, midHrs = 0, highHrs = 0;
  let elemPay = 0, midPay = 0, highPay = 0;

  logs.forEach(w => {
    const hrs = Number(w.hours) || 0;
    if (w.grade === '초등부') {
      elemHrs += hrs;
      elemPay += hrs * (Number(cfg.rateElem) || 15000);
    } else if (w.grade === '중등부') {
      midHrs += hrs;
      midPay += hrs * (Number(cfg.rateMid) || 18000);
    } else if (w.grade === '고등부') {
      highHrs += hrs;
      highPay += hrs * (Number(cfg.rateHigh) || 22000);
    }
  });

  const totalHours = elemHrs + midHrs + highHrs;
  const grossPay = elemPay + midPay + highPay;
  const taxAmount = cfg.tax33 ? Math.round(grossPay * 0.033) : 0;
  const netPay = grossPay - taxAmount;

  return {
    logs,
    elemHrs, midHrs, highHrs,
    elemPay, midPay, highPay,
    totalHours,
    grossPay,
    taxAmount,
    netPay
  };
}

function renderSalarySection() {
  const picker = document.getElementById('salaryMonthPicker');
  if (!picker.value) picker.value = getCurrentYearMonth();
  const ym = picker.value;

  const [y, m] = ym.split('-');
  document.getElementById('salaryMonthLabel').textContent = `${y}년 ${Number(m)}월 실수령 예상액`;

  const cfg = appData.salaryConfig || { rateElem: 15000, rateMid: 18000, rateHigh: 22000, tax33: true };
  document.getElementById('rateElem').value = cfg.rateElem;
  document.getElementById('rateMid').value = cfg.rateMid;
  document.getElementById('rateHigh').value = cfg.rateHigh;
  document.getElementById('chkTax33').checked = !!cfg.tax33;
  document.getElementById('taxBadgeLabel').textContent = cfg.tax33 ? '3.3% 공제 적용' : '세금 미공제 (100%)';

  const summary = calculateMonthlySalary(ym);

  document.getElementById('salaryNetDisplay').textContent = formatWon(summary.netPay);
  document.getElementById('salaryTotalHours').textContent = `${summary.totalHours}시간`;
  document.getElementById('salaryGrossDisplay').textContent = formatWon(summary.grossPay);
  document.getElementById('salaryTaxDisplay').textContent = `-${formatWon(summary.taxAmount)}`;

  document.getElementById('elemHoursStat').textContent = `${summary.elemHrs}시간`;
  document.getElementById('elemPayStat').textContent = formatWon(summary.elemPay);
  document.getElementById('midHoursStat').textContent = `${summary.midHrs}시간`;
  document.getElementById('midPayStat').textContent = formatWon(summary.midPay);
  document.getElementById('highHoursStat').textContent = `${summary.highHrs}시간`;
  document.getElementById('highPayStat').textContent = formatWon(summary.highPay);

  // 근무 기록 리스트 렌더링
  const listEl = document.getElementById('workLogList');
  const sortedLogs = [...summary.logs].sort((a, b) => b.date.localeCompare(a.date));

  if (sortedLogs.length === 0) {
    listEl.innerHTML = `<div class="empty-state" style="padding:14px;">이번 달 등록된 수업/근무 기록이 없습니다.</div>`;
    return;
  }

  listEl.innerHTML = sortedLogs.map(w => {
    const rate = w.grade === '초등부' ? cfg.rateElem : (w.grade === '중등부' ? cfg.rateMid : cfg.rateHigh);
    const pay = (Number(w.hours) || 0) * (Number(rate) || 0);
    const badge = getSubTagBadgeHtml(w.grade);
    return `
      <div class="work-log-item">
        <div>
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
            <strong>${w.date.slice(5)}</strong>
            ${badge}
            <span style="font-weight:700;">${w.hours}시간</span>
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(w.memo || '수업 진행')}</div>
        </div>
        <div class="work-log-right">
          <strong style="color:var(--math-color);">${formatWon(pay)}</strong>
          <button class="btn-del" data-del-work="${w.id}" title="삭제">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== 주간 타임테이블 ====================

function renderTimetable() {
  const days = ['월', '화', '수', '목', '금'];
  const todayIdx = new Date().getDay(); // 1=월 ~ 5=금
  const todayName = days[todayIdx - 1] || '';

  const grid = document.getElementById('timetableGrid');
  grid.innerHTML = days.map(day => {
    const items = (appData.schedules || []).filter(s => s.day === day);
    return `
      <div class="day-col ${day === todayName ? 'today' : ''}">
        <div class="day-header">${day}요일 ${day === todayName ? '•' : ''}</div>
        ${items.length === 0 ? `<div style="font-size:0.7rem; color:var(--text-light); text-align:center;">일정 없음</div>` : ''}
        ${items.map(item => `
          <div class="sched-item ${item.type === 'math' ? 'math' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="font-size:0.68rem; color:var(--text-muted);">${escapeHtml(item.time)}</strong>
              <button class="dday-del" style="position:static; font-size:0.65rem;" data-del-sched="${item.id}">✕</button>
            </div>
            <div style="font-weight:700; margin-top:1px;">${escapeHtml(item.name)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ==================== 이벤트 바인딩 ====================

document.addEventListener('DOMContentLoaded', () => {
  // 기본 날짜 세팅
  document.getElementById('todoDueDate').value = getTodayDateStr();
  document.getElementById('workDate').value = getTodayDateStr();
  document.getElementById('salaryMonthPicker').value = getCurrentYearMonth();

  // 다크 모드 복원
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('btnThemeToggle').textContent = '☀️';
  }

  // 테마 토글
  document.getElementById('btnThemeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'light');
      document.getElementById('btnThemeToggle').textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_KEY, 'dark');
      document.getElementById('btnThemeToggle').textContent = '☀️';
    }
  });

  // 카테고리 변경 시 세부 태그 변경
  document.getElementById('todoCategory').addEventListener('change', (e) => {
    updateSubTagSelect(e.target.value);
  });

  // 원클릭 프리셋 추가
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = JSON.parse(btn.getAttribute('data-preset'));
      appData.todos.unshift({
        id: 't_' + Date.now(),
        title: preset.title,
        category: preset.category,
        subTag: preset.subTag,
        dueDate: getTodayDateStr(),
        urgent: !!preset.urgent,
        completed: false,
        createdAt: Date.now()
      });
      commitData();
    });
  });

  // 할 일 폼 등록
  document.getElementById('todoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('todoInput');
    const title = titleEl.value.trim();
    if (!title) return;

    appData.todos.unshift({
      id: 't_' + Date.now(),
      title,
      category: document.getElementById('todoCategory').value,
      subTag: document.getElementById('todoSubTag').value,
      dueDate: document.getElementById('todoDueDate').value,
      urgent: document.getElementById('todoUrgent').checked,
      completed: false,
      createdAt: Date.now()
    });

    titleEl.value = '';
    document.getElementById('todoUrgent').checked = false;
    commitData();
  });

  // 완료 항목 정리
  document.getElementById('btnClearCompleted').addEventListener('click', () => {
    appData.todos = appData.todos.filter(t => !t.completed);
    commitData();
  });

  // 메인 카테고리 필터 탭
  document.querySelectorAll('#mainFilterTabs .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#mainFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMainFilter = tab.getAttribute('data-filter');
      renderTodos();
    });
  });

  // 초·중·고 학년 세부 필터
  document.querySelectorAll('#gradeFilterBar .grade-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#gradeFilterBar .grade-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentGradeFilter = pill.getAttribute('data-grade');
      renderTodos();
    });
  });

  // 할 일 체크 & 삭제 이벤트 위임
  document.getElementById('todoListContainer').addEventListener('click', (e) => {
    const toggleId = e.target.getAttribute('data-toggle-todo');
    if (toggleId) {
      const target = appData.todos.find(t => t.id === toggleId);
      if (target) {
        target.completed = e.target.checked;
        commitData();
      }
      return;
    }

    const delBtn = e.target.closest('[data-del-todo]');
    if (delBtn) {
      const delId = delBtn.getAttribute('data-del-todo');
      appData.todos = appData.todos.filter(t => t.id !== delId);
      commitData();
    }
  });

  // D-Day 삭제 위임
  document.getElementById('ddayList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-del-dday]');
    if (btn) {
      const id = btn.getAttribute('data-del-dday');
      appData.ddays = appData.ddays.filter(d => d.id !== id);
      commitData();
    }
  });

  // D-Day 모달 열기/닫기/추가
  const ddayModal = document.getElementById('ddayModal');
  document.getElementById('btnOpenDdayModal').addEventListener('click', () => ddayModal.classList.add('open'));
  document.getElementById('btnCloseDdayModal').addEventListener('click', () => ddayModal.classList.remove('open'));
  document.getElementById('ddayForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('ddayTitleInput').value.trim();
    const date = document.getElementById('ddayDateInput').value;
    if (!title || !date) return;
    appData.ddays.push({ id: 'd_' + Date.now(), title, date });
    document.getElementById('ddayTitleInput').value = '';
    ddayModal.classList.remove('open');
    commitData();
  });

  // 급여 월 변경
  document.getElementById('salaryMonthPicker').addEventListener('change', () => {
    renderSalarySection();
    renderHeaderBriefing();
  });

  // 시급 설정 패널 토글 & 저장
  document.getElementById('btnToggleRateConfig').addEventListener('click', () => {
    const box = document.getElementById('rateConfigBox');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('btnUnifyRates').addEventListener('click', () => {
    const baseRate = document.getElementById('rateElem').value;
    document.getElementById('rateMid').value = baseRate;
    document.getElementById('rateHigh').value = baseRate;
  });

  document.getElementById('btnSaveRates').addEventListener('click', () => {
    appData.salaryConfig = {
      rateElem: Number(document.getElementById('rateElem').value) || 15000,
      rateMid: Number(document.getElementById('rateMid').value) || 18000,
      rateHigh: Number(document.getElementById('rateHigh').value) || 22000,
      tax33: document.getElementById('chkTax33').checked
    };
    document.getElementById('rateConfigBox').style.display = 'none';
    commitData();
  });

  // 근무 기록 추가
  document.getElementById('workLogForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('workDate').value;
    const grade = document.getElementById('workGrade').value;
    const hours = parseFloat(document.getElementById('workHours').value);
    const memo = document.getElementById('workMemo').value.trim();
    if (!date || isNaN(hours) || hours <= 0) return;

    appData.workLogs.push({
      id: 'w_' + Date.now(),
      date,
      grade,
      hours,
      memo: memo || `${grade} 수학 수업`
    });

    document.getElementById('workMemo').value = '';
    commitData();
  });

  // 근무 기록 삭제
  document.getElementById('workLogList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-del-work]');
    if (btn) {
      const id = btn.getAttribute('data-del-work');
      appData.workLogs = appData.workLogs.filter(w => w.id !== id);
      commitData();
    }
  });

  // 시간표 모달 & 삭제
  const schedModal = document.getElementById('schedModal');
  document.getElementById('btnAddSchedModal').addEventListener('click', () => schedModal.classList.add('open'));
  document.getElementById('btnCloseSchedModal').addEventListener('click', () => schedModal.classList.remove('open'));
  document.getElementById('schedForm').addEventListener('submit', (e) => {
    e.preventDefault();
    appData.schedules.push({
      id: 's_' + Date.now(),
      day: document.getElementById('schedDayInput').value,
      type: document.getElementById('schedTypeInput').value,
      time: document.getElementById('schedTimeInput').value.trim(),
      name: document.getElementById('schedNameInput').value.trim()
    });
    document.getElementById('schedTimeInput').value = '';
    document.getElementById('schedNameInput').value = '';
    schedModal.classList.remove('open');
    commitData();
  });

  document.getElementById('timetableGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-del-sched]');
    if (btn) {
      const id = btn.getAttribute('data-del-sched');
      appData.schedules = appData.schedules.filter(s => s.id !== id);
      commitData();
    }
  });

  // 동기화 모달 제어
  const syncModal = document.getElementById('syncModal');
  document.getElementById('btnOpenSync').addEventListener('click', () => {
    document.getElementById('cloudDbUrlInput').value = syncConfig.cloudDbUrl || '';
    document.getElementById('cloudRoomKeyInput').value = syncConfig.roomKey || 'chaewon-knu-2026';
    syncModal.classList.add('open');
  });
  document.getElementById('btnCloseSyncModal').addEventListener('click', () => syncModal.classList.remove('open'));

  const btnCopyGDrive = document.getElementById('btnCopyGDriveScript');
  if (btnCopyGDrive) {
    btnCopyGDrive.addEventListener('click', () => {
      const gdriveScriptCode = [
        "const DB_FILE_NAME = 'chaewon_planner_db.json';",
        "function getOrCreateDbFile() {",
        "  const files = DriveApp.getFilesByName(DB_FILE_NAME);",
        "  if (files.hasNext()) return files.next();",
        "  return DriveApp.createFile(DB_FILE_NAME, JSON.stringify({ updatedAt: 0 }), MimeType.PLAIN_TEXT);",
        "}",
        "function readDriveTextFile(fileName) {",
        "  const files = DriveApp.getFilesByName(fileName);",
        "  return files.hasNext() ? files.next().getBlob().getDataAsString('UTF-8') : null;",
        "}",
        "function doGet(e) {",
        "  try {",
        "    const mode = (e && e.parameter && e.parameter.mode) ? e.parameter.mode : '';",
        "    if (mode === 'api') {",
        "      const content = getOrCreateDbFile().getBlob().getDataAsString('UTF-8') || '{\"updatedAt\":0}';",
        "      return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.JSON);",
        "    }",
        "    let html = readDriveTextFile('index.html');",
        "    if (html) {",
        "      const css = readDriveTextFile('styles.css') || '';",
        "      const js = readDriveTextFile('app.js') || '';",
        "      const webAppUrl = ScriptApp.getService().getUrl();",
        "      if (css) html = html.replace('<link rel=\"stylesheet\" href=\"styles.css\" />', '<style>\\n' + css + '\\n</style>');",
        "      const injectUrl = '<script>window.__PRECONFIGURED_GDRIVE_URL__ = ' + JSON.stringify(webAppUrl) + ';</script>';",
        "      if (js) html = html.replace('<script src=\"app.js\"></script>', injectUrl + '\\n<script>\\n' + js + '\\n</script>');",
        "      return HtmlService.createHtmlOutput(html).setTitle('채원이의 스터디 & 티칭 플래너').addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);",
        "    }",
        "    const content = getOrCreateDbFile().getBlob().getDataAsString('UTF-8') || '{\"updatedAt\":0}';",
        "    return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.JSON);",
        "  } catch (err) {",
        "    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);",
        "  }",
        "}",
        "function doPost(e) {",
        "  try {",
        "    const rawBody = e.postData && e.postData.contents ? e.postData.contents : '{}';",
        "    JSON.parse(rawBody);",
        "    getOrCreateDbFile().setContent(rawBody);",
        "    return ContentService.createTextOutput(JSON.stringify({ ok: true, savedAt: Date.now() })).setMimeType(ContentService.MimeType.JSON);",
        "  } catch (err) {",
        "    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);",
        "  }",
        "}"
      ].join('\n');

      navigator.clipboard.writeText(gdriveScriptCode).then(() => {
        alert('구글 드라이브 DB & 웹앱 스크립트 코드가 복사되었습니다!\n\n1. 내 구글 드라이브에 index.html, styles.css, app.js 3개 파일을 올리시고\n2. https://script.google.com 에서 [새 프로젝트]에 붙여넣은 뒤 [배포 -> 새 배포 -> 웹 앱]으로 배포해 주세요!');
      });
    });
  }

  document.getElementById('btnSaveCloudSync').addEventListener('click', async () => {
    syncConfig.cloudDbUrl = document.getElementById('cloudDbUrlInput').value.trim();
    syncConfig.roomKey = document.getElementById('cloudRoomKeyInput').value.trim() || 'chaewon-knu-2026';
    saveSyncConfig();
    await pushToCloudDb();
    await pullFromCloudDb();
    alert('구글 드라이브 DB 연결 및 동기화가 완료되었습니다! 내 구글 드라이브에 chaewon_planner_db.json 파일이 자동 생성됩니다.');
  });

  document.getElementById('btnCopySyncLink').addEventListener('click', () => {
    const url = new URL(window.location.href);
    if (syncConfig.cloudDbUrl) {
      url.searchParams.set('cloudUrl', syncConfig.cloudDbUrl);
      url.searchParams.set('roomKey', syncConfig.roomKey || 'chaewon-knu-2026');
    }
    navigator.clipboard.writeText(url.toString()).then(() => {
      alert('채원이 전달용 자동연결 링크가 복사되었습니다! 카카오톡으로 보내서 열면 구글 드라이브 DB가 자동 연결됩니다.');
    });
  });

  document.getElementById('btnForcePullCloud').addEventListener('click', async () => {
    await pullFromCloudDb();
    alert('구글 드라이브에서 최신 데이터를 불러왔습니다.');
  });

  document.getElementById('btnForcePushCloud').addEventListener('click', async () => {
    await pushToCloudDb();
    alert('현재 기기의 데이터를 내 구글 드라이브(chaewon_planner_db.json)에 저장했습니다.');
  });

  // JSON 내보내기 / 가져오기 / 초기화
  document.getElementById('btnExportJson').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `채원플래너_백업_${getTodayDateStr()}.json`;
    a.click();
  });

  document.getElementById('inputImportJson').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (imported && Array.isArray(imported.todos)) {
          appData = imported;
          commitData();
          alert('백업 파일을 성공적으로 불러왔습니다!');
          syncModal.classList.remove('open');
        }
      } catch (err) {
        alert('올바른 JSON 백업 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btnResetDemoData').addEventListener('click', () => {
    if (confirm('채원이 맞춤 기본 샘플 데이터로 초기화할까요?')) {
      appData = getDefaultData();
      commitData();
      syncModal.classList.remove('open');
    }
  });

  // 아이폰/모바일 하단 네비게이션 탭 전환
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-mobtab');
      if (tab === 'sync') {
        document.getElementById('btnOpenSync').click();
        return;
      }

      document.querySelectorAll('.bottom-nav .nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const secBrief = document.getElementById('sectionBriefing');
      const secTodos = document.getElementById('sectionTodos');
      const secRight = document.getElementById('sectionSalaryAndSched');
      const panelSalary = document.getElementById('panelSalary');
      const panelSchedule = document.getElementById('panelSchedule');

      secBrief.classList.remove('mobile-hidden');
      secTodos.classList.remove('mobile-hidden');
      secRight.classList.remove('mobile-hidden');
      panelSalary.classList.remove('mobile-hidden');
      panelSchedule.classList.remove('mobile-hidden');

      if (tab === 'todos') {
        secRight.classList.add('mobile-hidden');
      } else if (tab === 'salary') {
        secBrief.classList.add('mobile-hidden');
        secTodos.classList.add('mobile-hidden');
        panelSchedule.classList.add('mobile-hidden');
      } else if (tab === 'schedule') {
        secTodos.classList.add('mobile-hidden');
        panelSalary.classList.add('mobile-hidden');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ==================== 5단계 사용법 튜토리얼 모달 ====================
  const HIDE_TUT_KEY = 'chaewon_planner_hide_tut_v1';
  const tutorialModal = document.getElementById('tutorialModal');
  const chkHideTut = document.getElementById('chkHideTutorialAuto');
  const btnTutPrev = document.getElementById('btnTutPrev');
  const btnTutNext = document.getElementById('btnTutNext');
  let curTutStep = 0;
  const totalTutSteps = 5;

  function showTutorialStep(stepIdx) {
    curTutStep = Math.max(0, Math.min(totalTutSteps - 1, stepIdx));
    document.querySelectorAll('#tutorialModal .tutorial-slide').forEach(slide => {
      slide.classList.toggle('active', Number(slide.getAttribute('data-slide')) === curTutStep);
    });
    document.querySelectorAll('#tutDots .tut-dot').forEach(dot => {
      dot.classList.toggle('active', Number(dot.getAttribute('data-step')) === curTutStep);
    });
    btnTutPrev.style.display = curTutStep === 0 ? 'none' : 'inline-block';
    btnTutNext.textContent = curTutStep === totalTutSteps - 1 ? '시작하기! 🎉' : '다음 단계 →';
  }

  document.getElementById('btnOpenTutorial').addEventListener('click', () => {
    chkHideTut.checked = localStorage.getItem(HIDE_TUT_KEY) === '1';
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  });

  document.getElementById('btnCloseTutorialModal').addEventListener('click', () => {
    tutorialModal.classList.remove('open');
  });

  btnTutPrev.addEventListener('click', () => showTutorialStep(curTutStep - 1));
  btnTutNext.addEventListener('click', () => {
    if (curTutStep < totalTutSteps - 1) {
      showTutorialStep(curTutStep + 1);
    } else {
      tutorialModal.classList.remove('open');
    }
  });

  document.querySelectorAll('#tutDots .tut-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      showTutorialStep(Number(dot.getAttribute('data-step')));
    });
  });

  chkHideTut.addEventListener('change', (e) => {
    localStorage.setItem(HIDE_TUT_KEY, e.target.checked ? '1' : '0');
  });

  // 첫 방문 시 튜토리얼 자동 표시
  if (localStorage.getItem(HIDE_TUT_KEY) !== '1') {
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  }

  // ==================== 경북대 역사교육과 자동 학년 설정 모달 ====================
  const gradeModal = document.getElementById('gradeConfigModal');
  const selectAdmYear = document.getElementById('selectAdmissionYear');
  const selectGradeOffset = document.getElementById('selectGradeOffset');
  const gradePreviewBox = document.getElementById('gradePreviewBox');

  function updateGradeModalPreview() {
    const preview = getAutoAcademicInfo({
      admissionYear: Number(selectAdmYear.value),
      gradeOffset: Number(selectGradeOffset.value)
    });
    gradePreviewBox.textContent = `현재 표시 미리보기: ${preview.badgeText.replace(' ⚙️', '')}`;
  }

  document.getElementById('knuGradeBadge').addEventListener('click', () => {
    const cfg = appData.academicConfig || { admissionYear: 2025, gradeOffset: 0 };
    selectAdmYear.value = String(cfg.admissionYear || 2025);
    selectGradeOffset.value = String(cfg.gradeOffset || 0);
    updateGradeModalPreview();
    gradeModal.classList.add('open');
  });

  document.getElementById('btnCloseGradeModal').addEventListener('click', () => {
    gradeModal.classList.remove('open');
  });

  selectAdmYear.addEventListener('change', updateGradeModalPreview);
  selectGradeOffset.addEventListener('change', updateGradeModalPreview);

  document.getElementById('gradeConfigForm').addEventListener('submit', (e) => {
    e.preventDefault();
    appData.academicConfig = {
      admissionYear: Number(selectAdmYear.value) || 2025,
      gradeOffset: Number(selectGradeOffset.value) || 0
    };
    gradeModal.classList.remove('open');
    commitData();
  });

  // 초기 렌더링 및 동기화 시작
  renderAll();
  initSyncEngine();
});

