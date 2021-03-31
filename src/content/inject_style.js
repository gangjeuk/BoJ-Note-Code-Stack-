const url = window.location.href;
if(
    url.includes('acmicpc.net')
)inject('override-basic-kr.css');

if( /*채점 현황*/
    url.includes('acmicpc.net/status')
) inject('override-status.css');

if ( /*문제	문제 제목	정보	맞은 사람	제출	정답 비율*/ 
    /* user 푼 문제 */
    url.includes('acmicpc.net/problemset') ||
    /* 문제집 */
    url.includes('acmicpc.net/workbook')
) inject('override-index-set1.css');

if(  /*단계	문제 번호	제목	정보	정답	제출	정답 비율*/
    /* 단계별로 풀기*/
    url.includes('acmicpc.net/step/')
) inject('override-index-set2.css');

if(     /*유저 맞은 문제*/
    url.includes('acmicpc.net/user')
) inject('override-user.css');

function inject(localCss){
    var injection = document.createElement('link');
    injection.setAttribute('rel','stylesheet');
    injection.setAttribute('type','text/css');
    injection.setAttribute('href',chrome.runtime.getURL('/css/'+localCss));
    (document.head||document.documentElement).appendChild(injection);

}