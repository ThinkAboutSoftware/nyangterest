# 로그인

## ISSUE
### 1. 세션으로인해 메인 유기묘리스트 정상노출되지 않음
로그인기능을 작업하며 세션을 사용하였는데 세션때문에 메인 유기묘리스트들이 정상적으로 노출되지 않는다.
  
  ### 예상원인
  
  1) 세션이 자동적으로 어떤 값을 쿠키에 저장시키는데 이 값을 없애면 메인리스트가 정상적으로 보인다 하지만 쿠키에 저장되는 세션정보는
  접속유저의 고유값??을 저장시켜서 유저를 식별하는 값인듯하다. 따라서 삭제할 수 없음

  2) backend관련 코드들은 기능별로 분리되어있지 않고 server.js에 모두 넣어져있는데.. 잘못된 순서로 인해서 뭔가 충돌이 난것같기도하다(기능별로 나눠질 필요가 있다고 생각하기 때문에 추후 정리계획있음)

  ### 해결방법
  
  일단 원인2번으로 접근하여 로그인/로그아웃관련기능들을 따로 분리하였다.
 
  
