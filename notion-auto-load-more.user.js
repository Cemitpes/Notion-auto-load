// ==UserScript==
// @name         Notion "Load More" Auto-Clicker
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Continuously checks for and clicks on "Load More" buttons with role="button". Stops after 10 unsuccessful attempts.
// @author       YourName
// @match        https://www.notion.so/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 버튼이 없는 경우 카운터
    let notFoundCount = 0;

    // 주기적으로 버튼 확인 및 클릭하는 함수
    function checkAndClickButton() {
        // role="button" 속성을 가진 특정 텍스트의 버튼 탐색
        const button = Array.from(document.querySelectorAll('div[role="button"]')).find(el =>
            el.textContent.trim() === '더 불러오기'
        );

        if (button) {
            console.log('Button found, clicking...');
            button.click();
            notFoundCount = 0; // 버튼을 찾았으므로 카운터 초기화
        } else {
            console.log('No "Load More" button found.');
            notFoundCount++;
        }

        // 10번 연속 버튼이 없으면 종료
        if (notFoundCount >= 10) {
            console.log('No "Load More" button found 10 times. Stopping script.');
            return; // 스크립트 종료
        }

        // 1초 후 다시 실행
        setTimeout(checkAndClickButton, 1000);
    }

    // 최초 실행
    checkAndClickButton();
})();
