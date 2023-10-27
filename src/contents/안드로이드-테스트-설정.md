---
title: "잡코리아 안드로이드 로컬 환경설정"
update: "2023-10-24"
tags: "config,IOS"
---

## 에물레이터 추가 후 localhost 설정 

- 컴퓨터의 localhost와는 별도로 에뮬레이터의 host도 수정해서 설정.
- 하위의 emulator-5554 는 테스트 시 나오는 에뮬레이터 확인 한 device
- 관련 블로그 https://velog.io/@hyunheal/m1-mac%EC%97%90%EC%84%9C-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%97%90%EB%AE%AC-hosts%EC%88%98%EC%A0%95 

### 예물레이터 실행 

```cmd
 cd ~/Library/Android/sdk/emulator ./emulator -avd -writable-system 
```


### 예물레이터 host 복사 

```cmd
 cd ~Library/Android/sdk/platform-tools 
./adb devices // device
./adb -s emulator-5554 root //root 
./adb -s emulator-5554 remount //remount 
./adb -s emulator-5554 pull ./system/etc/hosts hosts //host file 
```

### 에뮬레이터 host 수정 

```text
172.168.x.xx local.domain.com 
```

## 수정한 host파일 에뮬레이터로 push 

```cmd
./adb -s emulator-5554 push ~/hosts ./system/etc/hosts 
./adb -s emulator-5554 remount //remount 
```

### 안드로이드 스튜디오에서 빌드 후 에뮬레이터에 코드 삽입 

에뮬레이터 실행은 위 ./emulator -avd -writable-system 로 실행 후 안드로이드 스튜디오에서 코드 빌드 삽입 후 앱 실행을 해야 정상적으로 로 컬 환경으로 연동 

