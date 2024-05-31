module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 변경
        'style', // 스타일 변경 (포맷, 세미콜론 등)
        'refactor', // 코드 리팩토링
        'test', // 테스트 추가 또는 수정
        'chore', // 빌드 업무 수정, 패키지 매니저 설정 등
        'setting', // 프로젝트 초기 세팅
      ],
    ],
    'scope-empty': [0], // 범위를 비워둘 수 있음
    'subject-case': [0], // 주제의 대소문자 규칙을 비활성화
    'header-max-length': [2, 'always', 72], // 헤더 최대 길이 72
    'body-max-line-length': [2, 'always', 100], // 바디 최대 길이 100
    'footer-max-line-length': [2, 'always', 100], // 풋터 최대 길이 100
  },
};
