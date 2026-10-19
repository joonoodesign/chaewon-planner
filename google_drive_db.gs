/**
 * ============================================================================
 * [채원이의 스터디 & 티칭 플래너] 내 구글 드라이브(Google Drive) DB & 24시간 웹앱 스크립트
 * ============================================================================
 * 
 * ★ 이 스크립트가 하는 일:
 * 1. 내 구글 드라이브 안에 'chaewon_planner_db.json' 파일을 자동 생성하여
 *    채원이의 할 일, 초·중·고 급여 정산, 시간표 데이터를 내 구글 드라이브에 안전하게 저장합니다.
 * 2. 내 구글 드라이브에 'index.html', 'styles.css', 'app.js' 파일 3개를 올려두면,
 *    컴퓨터를 완전히 꺼놓아도 구글이 24시간 웹페이지와 DB를 동시에 실행해 줍니다!
 *
 * ★ 1분 설치 방법:
 * 1. 내 구글 드라이브(https://drive.google.com)에 d:\antigravity 폴더 안의
 *    'index.html', 'styles.css', 'app.js' 파일 3개를 드래그해서 업로드합니다.
 * 2. https://script.google.com 접속 -> [새 프로젝트] 클릭
 * 3. 기존 코드를 지우고 이 코드 전체를 붙여넣은 뒤 저장(Ctrl + S)
 * 4. 우측 상단 [배포] -> [새 배포] 클릭
 * 5. 유형 선택(톱니바퀴) -> [웹 앱] 선택
 *    - 다음 사용자로 실행: "나 (본인 구글 계정)"
 *    - 액세스 권한이 있는 사용자: "모든 사용자 (Anyone)"  <-- ★필수! (채원이 아이폰/아이패드에서 로그인 없이 바로 접속됨)
 * 6. [배포] 클릭 -> 권한 승인 -> 나오는 '웹 앱 URL (https://script.google.com/macros/s/.../exec)'을
 *    채원이에게 카카오톡으로 보내주면 끝! (컴퓨터를 꺼도 24시간 작동 & 자동 동기화!)
 */

const DB_FILE_NAME = 'chaewon_planner_db.json';

function getOrCreateDbFile() {
  const files = DriveApp.getFilesByName(DB_FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  }
  const initialData = JSON.stringify({ updatedAt: 0 });
  return DriveApp.createFile(DB_FILE_NAME, initialData, MimeType.PLAIN_TEXT);
}

function readDriveTextFile(fileName) {
  const files = DriveApp.getFilesByName(fileName);
  if (files.hasNext()) {
    return files.next().getBlob().getDataAsString('UTF-8');
  }
  return null;
}

function doGet(e) {
  try {
    const mode = (e && e.parameter && e.parameter.mode) ? e.parameter.mode : '';

    // 1) 동기화 데이터 조회 요청(?mode=api)인 경우 -> 구글 드라이브의 chaewon_planner_db.json 반환
    if (mode === 'api') {
      const file = getOrCreateDbFile();
      const content = file.getBlob().getDataAsString('UTF-8') || '{"updatedAt":0}';
      return ContentService
        .createTextOutput(content)
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2) 채원이가 링크를 눌러 접속한 경우 -> 구글 드라이브에 올려둔 index.html + styles.css + app.js를 합쳐서 웹앱 실행
    let html = readDriveTextFile('index.html');
    if (html) {
      const css = readDriveTextFile('styles.css') || '';
      const js = readDriveTextFile('app.js') || '';
      const webAppUrl = ScriptApp.getService().getUrl();

      if (css) {
        html = html.replace('<link rel="stylesheet" href="styles.css" />', '<style>\n' + css + '\n</style>');
      }
      const injectUrlScript = '<script>window.__PRECONFIGURED_GDRIVE_URL__ = ' + JSON.stringify(webAppUrl) + ';</script>';
      if (js) {
        html = html.replace('<script src="app.js"></script>', injectUrlScript + '\n<script>\n' + js + '\n</script>');
      } else {
        html = html.replace('</head>', injectUrlScript + '</head>');
      }

      return HtmlService.createHtmlOutput(html)
        .setTitle('채원이의 스터디 & 티칭 플래너')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }

    // 만약 구글 드라이브에 index.html이 아직 없으면 DB JSON 반환 (외부 웹페이지에서 DB로만 쓸 때도 정상 작동)
    const file = getOrCreateDbFile();
    const content = file.getBlob().getDataAsString('UTF-8') || '{"updatedAt":0}';
    return ContentService
      .createTextOutput(content)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const rawBody = e.postData && e.postData.contents ? e.postData.contents : '{}';
    JSON.parse(rawBody);
    const file = getOrCreateDbFile();
    file.setContent(rawBody);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, savedAt: Date.now() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
