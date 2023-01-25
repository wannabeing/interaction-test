(() => {
  let yOffset = 0; // window.pageYOffset 대신 사용되는 변수, 현재 높이 값
  let prevTotalHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 섹션들의 높이의 합
  let currentSection = 0; // 현재 활성화 되어 있는 섹션(Scene). 기본값은 0

  const sectionInfo = [
    {
      // 0 Screen
      type: "sticky",
      scrollHeigth: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeigth 세팅
      objs: {
        container: document.querySelector("#scroll-section-0"), // section 태그
        msgA: document.querySelector("#scroll-section-0 .main-msg .a"),
        msgB: document.querySelector("#scroll-section-0 .main-msg .b"),
        msgC: document.querySelector("#scroll-section-0 .main-msg .c"),
        msgD: document.querySelector("#scroll-section-0 .main-msg .d"),
      },
      values: {
        msgA_opacity: [0, 1],
      },
    },
    {
      // 1 Screen
      type: "normal",
      scrollHeigth: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeigth 세팅
      objs: {
        container: document.querySelector("#scroll-section-1"), // section 태그
      },
      values: {},
    },
    {
      // 2 Screen
      type: "sticky",
      scrollHeigth: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeigth 세팅
      objs: {
        container: document.querySelector("#scroll-section-2"), // section 태그
      },
    },
    {
      // 3 Screen
      type: "sticky",
      scrollHeigth: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeigth 세팅
      objs: {
        container: document.querySelector("#scroll-section-3"), // section 태그
      },
    },
  ];

  const setLayout = () => {
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sectionInfo.length; i++) {
      sectionInfo[i].scrollHeigth =
        sectionInfo[i].heightNum * window.innerHeight;
      sectionInfo[
        i
      ].objs.container.style.height = `${sectionInfo[i].scrollHeigth}px`;
    }
    // 새로고침할 때, 보여지는 섹션 i 설정 및 id부여
    for (let i = 0; i < sectionInfo.length; i++) {
      totalScrollHeight += sectionInfo[i].scrollHeigth;
      // 높이 합이 현재 높이보다 크거나 같아질 때, 현재 보여지는 섹션 i로 설정하고 break
      if (totalScrollHeight >= yOffset) {
        currentSection = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentSection}`);
  };

  const scrollLoop = () => {
    // 이전 섹션들 높이의 합 세팅
    prevTotalHeight = 0;

    for (let i = 0; i < currentSection; i++) {
      prevTotalHeight += sectionInfo[i].scrollHeigth;
    }

    // 현재 높이 값 > 이전 섹션들의 높이 합 + 활성화된 섹션 높이 값 --> 활성화된 섹션 다음으로 변경
    if (yOffset > prevTotalHeight + sectionInfo[currentSection].scrollHeigth) {
      // 다음 섹션으로 변경
      currentSection++;
      // 현재 활성화된 섹션의 sticky-element 보여주기
      document.body.setAttribute("id", `show-scene-${currentSection}`);
    }
    // 현재 높이 값 < 이전 섹션들의 높이 합 --> 활성화된 섹션을 이전으로 변경
    if (yOffset < prevTotalHeight) {
      // 현재 섹션이 0일 경우, 빼는 행위 하지 말고 종료
      if (currentSection === 0) return;
      // 이전 섹션으로 변경
      currentSection--;
      // 현재 활성화된 섹션의 sticky-element 보여주기
      document.body.setAttribute("id", `show-scene-${currentSection}`);
    }
  };

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", setLayout); // 브라우저 로드되었을 때마다 섹션 높이 세팅
  window.addEventListener("resize", setLayout); // 브라우저 창이 변할 때마다 섹션 높이 세팅
})();
