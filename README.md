# AM I AI? - AI 이미지 갤러리

Cloudinary에 저장된 AI 생성 이미지를 표시하는 멋진 갤러리 웹사이트입니다.

## 기능

- 🖼️ **이미지 갤러리**: Cloudinary의 AI 생성 이미지를 그리드 형태로 표시
- 📁 **폴더 필터링**: Cloudinary 폴더별로 이미지 필터링
- 🔍 **이미지 확대**: 클릭 시 모달로 이미지 확대 보기
- ♾️ **무한 스크롤**: "더 보기" 버튼으로 추가 이미지 로드
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🎨 **깔끔한 UI**: 라이트 테마의 세련된 디자인
- 🚫 **보안**: 이미지 다운로드 및 복사 방지

## 기술 스택

### 프론트엔드
- React 18 + TypeScript
- CSS3 (커스텀 스타일링)
- Responsive Grid Layout

### 백엔드
- Node.js + Express
- Cloudinary API
- CORS 지원

### 배포
- Firebase App Hosting
- 자동 CI/CD (GitHub 연동)

## 설치 및 실행

### 1. 의존성 설치
```bash
npm run install-all
```

### 2. 개발 서버 실행
```bash
npm run dev
```

이 명령어는 백엔드 서버(포트 5000)와 프론트엔드 개발 서버(포트 3000)를 동시에 실행합니다.

### 3. 개별 실행
```bash
# 백엔드만 실행
npm run server

# 프론트엔드만 실행
npm run client
```

## 프로젝트 구조

```
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── services/       # API 서비스
│   │   ├── types/          # TypeScript 타입 정의
│   │   └── ...
│   └── package.json
├── server/                 # Node.js 백엔드
│   ├── index.js           # Express 서버
│   ├── config.js          # Cloudinary 설정
│   └── package.json
├── firebase.json          # Firebase 호스팅 설정
└── package.json           # 루트 패키지 설정
```

## API 엔드포인트

### GET /api/images
이미지 목록을 조회합니다.

**쿼리 파라미터:**
- `folder` (선택): 폴더 경로
- `next_cursor` (선택): 페이지네이션 커서
- `max_results` (선택): 최대 결과 수 (기본값: 20)

### GET /api/folders
폴더 목록을 조회합니다.

### GET /api/images/:id
특정 이미지의 상세 정보를 조회합니다.

## Cloudinary 설정

프로젝트는 다음 Cloudinary 계정을 사용합니다:
- Cloud Name: `djtmu7o6u`
- API Key: `456815586346562`
- API Secret: `fxa0j_mX1Lle13MhCg6UtZZweb4`

## 배포

### Firebase App Hosting 배포

1. Firebase CLI 설치:
```bash
npm install -g firebase-tools
```

2. Firebase 로그인:
```bash
firebase login
```

3. 프로젝트 빌드:
```bash
npm run build
```

4. Firebase 배포:
```bash
firebase deploy
```

### GitHub 연동 (자동 배포)

Firebase App Hosting는 GitHub 저장소와 연동하여 자동 배포를 지원합니다:

1. Firebase 콘솔에서 App Hosting 백엔드 생성
2. GitHub 저장소 연결
3. 라이브 브랜치 설정 (예: `main`)
4. 커밋 푸시 시 자동 배포

## 환경 변수

### 서버 (.env)
⚠️ **중요**: `server/` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

**보안 주의사항**:
- `.env` 파일은 절대 Git에 커밋하지 마세요
- 실제 API 키는 클라우디너리 대시보드에서 새로 생성하세요
- 배포 시에는 각 플랫폼의 환경변수 설정을 사용하세요

### 클라이언트
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 배포 플랫폼별 환경변수 설정

### Vercel
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 다음 변수들을 추가:
   - `CLOUDINARY_CLOUD_NAME`: `@cloudinary_cloud_name`
   - `CLOUDINARY_API_KEY`: `@cloudinary_api_key`
   - `CLOUDINARY_API_SECRET`: `@cloudinary_api_secret`

### Google App Engine
1. `app.yaml` 파일에서 `YOUR_CLOUDINARY_*` 부분을 실제 값으로 교체
2. 또는 `gcloud` CLI 사용:
   ```bash
   gcloud app deploy --set-env-vars CLOUDINARY_CLOUD_NAME=your_value,CLOUDINARY_API_KEY=your_value,CLOUDINARY_API_SECRET=your_value
   ```

## 주요 컴포넌트

- **Gallery**: 메인 갤러리 컴포넌트
- **ImageCard**: 개별 이미지 카드
- **ImageModal**: 이미지 확대 모달
- **FolderFilter**: 폴더 필터링 드롭다운
- **LoadingSpinner**: 로딩 스피너

## 스타일링

- 깔끔한 라이트 테마
- 세리프 폰트 (Georgia, Times New Roman)
- 그라데이션 버튼 및 호버 효과
- 반응형 그리드 레이아웃
- 부드러운 애니메이션 및 전환 효과

## 보안 기능

- 이미지 우클릭 방지
- 이미지 드래그 방지
- 다운로드 링크 제거
- 컨텍스트 메뉴 비활성화

## 라이선스

MIT License
