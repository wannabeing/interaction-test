(() => {
  let yOffset = 0; // window.pageYOffset 대신 사용되는 변수, 현재 높이 값
  let prevTotalHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 섹션들의 높이의 합
  let currentSection = 0; // 현재 활성화 되어 있는 섹션(Scene). 기본값은 0
  let isNewSection = false; // 새로운 섹션이 시작되는 순간 true

  const sectionInfo = [
    {
      // 0 Screen
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-0"), // section 태그
        msgA: document.querySelector("#scroll-section-0 .main-msg.a"), // msgA div 태그
        msgB: document.querySelector("#scroll-section-0 .main-msg.b"), // msgB div 태그
        msgC: document.querySelector("#scroll-section-0 .main-msg.c"), // msgC div 태그
        msgD: document.querySelector("#scroll-section-0 .main-msg.d"), // msgD div 태그

        canvas: document.querySelector("#canvas-video-0"), // canvas 태그
        context: document.querySelector("#canvas-video-0").getContext("2d"), // context 객체
        videoImgs: [], // 비디오 이미지 배열
      },
      values: {
        msgA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_translateY_in: [50, 0, { start: 0.1, end: 0.2 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_translateY_in: [50, 0, { start: 0.3, end: 0.4 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_translateY_in: [50, 0, { start: 0.5, end: 0.6 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgD_translateY_in: [50, 0, { start: 0.7, end: 0.8 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_translateY_out: [0, -50, { start: 0.25, end: 0.3 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_translateY_out: [0, -50, { start: 0.45, end: 0.5 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_translateY_out: [0, -50, { start: 0.65, end: 0.7 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgD_translateY_out: [0, -50, { start: 0.85, end: 0.9 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간

        videoImgsCount: 300, // 비디오 이미지 개수
        imgSeq: [0, 299], // 비디오 이미지 순서
        canvas_opacity: [1, 0, { start: 0.85, end: 0.95 }], // [0]: 투명도 시작 값, [1]: 마무리 값, [2]: 애니메이션 재생 구간
      },
    },
    {
      // 1 Screen
      type: "normal",
      scrollHeight: 0,
      // heightNum: 5,
      objs: {
        container: document.querySelector("#scroll-section-1"), // section 태그
      },
      values: {},
    },
    {
      // 2 Screen
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-2"), // section 태그
        msgA: document.querySelector("#scroll-section-2 .main-msg.a"), // msgA div태그
        msgB: document.querySelector("#scroll-section-2 .desc-msg.b"), // msgB div태그
        msgC: document.querySelector("#scroll-section-2 .desc-msg.c"), // msgC div태그
        pinB: document.querySelector("#scroll-section-2 .desc-msg.b .pin"), // msgB pin 태그
        pinC: document.querySelector("#scroll-section-2 .desc-msg.c .pin"), // msgC pin 태그

        canvas: document.querySelector("#canvas-video-2"), // canvas 태그
        context: document.querySelector("#canvas-video-2").getContext("2d"), // context 객체
        videoImgs: [], // 비디오 이미지 배열
      },
      values: {
        msgA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_translateY_in: [20, 0, { start: 0.5, end: 0.55 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_translateY_in: [20, 0, { start: 0.72, end: 0.77 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        msgC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간

        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }], // [0]: 투명도 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        pinB_translateY: [0.5, 1, { start: 0.5, end: 0.55 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간
        pinC_translateY: [0.5, 1, { start: 0.72, end: 0.77 }], // [0]: translateY 시작 값, [1]: 마무리 값 , [2]: 애니메이션 재생 구간

        videoImgsCount: 960, // 비디오 이미지 개수
        imgSeq: [0, 959], // 비디오 이미지 순서
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }], // [0]: 투명도 시작 값, [1]: 마무리 값, [2]: 애니메이션 재생 구간
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }], // [0]: 투명도 시작 값, [1]: 마무리 값, [2]: 애니메이션 재생 구간
      },
    },
    {
      // 3 Screen
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 기기마다 다른 브라우저 높이의 5배로 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-3"), // section 태그
      },
    },
  ];

  const setCanvas = () => {
    let img;
    for (let i = 0; i < sectionInfo[0].values.videoImgsCount; i++) {
      img = document.createElement("img");
      img.src = `./videos/001/IMG_${6726 + i}.JPG`;
      sectionInfo[0].objs.videoImgs.push(img); // 배열에 저장
    }

    let img2;
    for (let i = 0; i < sectionInfo[2].values.videoImgsCount; i++) {
      img2 = document.createElement("img");
      img2.src = `./videos/002/IMG_${7027 + i}.JPG`;
      sectionInfo[2].objs.videoImgs.push(img2); // 배열에 저장
    }
  };

  const setLayout = () => {
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sectionInfo.length; i++) {
      switch (sectionInfo[i].type) {
        case "normal":
          sectionInfo[i].scrollHeight =
            sectionInfo[i].objs.container.offsetHeight;
          break;

        case "sticky":
          sectionInfo[i].scrollHeight =
            sectionInfo[i].heightNum * window.innerHeight;
          break;
      }
      sectionInfo[
        i
      ].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`;
    }
    // 새로고침할 때, 보여지는 섹션 i 설정 및 id부여
    for (let i = 0; i < sectionInfo.length; i++) {
      totalScrollHeight += sectionInfo[i].scrollHeight;
      // 높이 합이 현재 높이보다 크거나 같아질 때, 현재 보여지는 섹션 i로 설정하고 break
      if (totalScrollHeight >= yOffset) {
        currentSection = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-section-${currentSection}`);

    // canvas
    const canvasHeightRatio = window.innerHeight / 1080;
    sectionInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvasHeightRatio})`;
    sectionInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvasHeightRatio})`;
  };

  const calValues = (values, currentYOffset) => {
    let rv;
    const { scrollHeight } = sectionInfo[currentSection];
    // 현재 섹션에서 스크롤된 범위를 비율로 구하기
    const scrollRatio = currentYOffset / scrollHeight;

    // start - end 구간이 있을 경우
    if (values[2]) {
      // start - end 구간에 애니메이션 시작
      const sectionStart = values[2].start * scrollHeight;
      const sectionEnd = values[2].end * scrollHeight;
      const sectionHeight = sectionEnd - sectionStart;
      const sectionRatio = (currentYOffset - sectionStart) / sectionHeight;

      // 현재 스크롤 위치가 start 구간보다 크거나 같고, end 구간보다 작거나 같을 때만 애니메이션 적용
      if (currentYOffset >= sectionStart && currentYOffset <= sectionEnd) {
        rv = sectionRatio * (values[1] - values[0]) + values[0];
      }
      // 현재 스크롤 위치가 start 구간보다 작으면 opacity: 0
      else if (currentYOffset < sectionStart) {
        rv = values[0];
      }
      // 현재 스크롤 위치가 end 구간보다 크면 opacity: 1
      else if (currentYOffset > sectionEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  };

  const playAnimation = () => {
    const { objs, values, scrollHeight } = sectionInfo[currentSection];
    const currentYOffset = yOffset - prevTotalHeight; // 현재 섹션에서 스크롤 된 값
    const currentSectionRatio = currentYOffset / scrollHeight; // 현재 섹션에서 얼만큼 스크롤 했는지에 대한 비율

    switch (currentSection) {
      case 0:
        // ✅ 비디오 애니메이션
        let videoIndex = Math.round(calValues(values.imgSeq, currentYOffset)); // 비디오 이미지 스크롤에 따른 인덱스 번호
        objs.context.drawImage(objs.videoImgs[videoIndex], 0, 0); // canvas에 그리기
        objs.canvas.style.opacity = calValues(
          values.canvas_opacity,
          currentYOffset
        ); // canvas 사라지기

        // ✅ 글자 애니메이션
        if (currentSectionRatio <= 0.21) {
          // in
          objs.msgA.style.opacity = calValues(
            values.msgA_opacity_in,
            currentYOffset
          );
          objs.msgA.style.transform = `translate3d(0,${calValues(
            values.msgA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.msgA.style.opacity = calValues(
            values.msgA_opacity_out,
            currentYOffset
          );
          objs.msgA.style.transform = `translate3d(0, ${calValues(
            values.msgA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (currentSectionRatio <= 0.41) {
          // in
          objs.msgB.style.opacity = calValues(
            values.msgB_opacity_in,
            currentYOffset
          );
          objs.msgB.style.transform = `translate3d(0,${calValues(
            values.msgB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.msgB.style.opacity = calValues(
            values.msgB_opacity_out,
            currentYOffset
          );
          objs.msgB.style.transform = `translate3d(0, ${calValues(
            values.msgB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (currentSectionRatio <= 0.61) {
          // in
          objs.msgC.style.opacity = calValues(
            values.msgC_opacity_in,
            currentYOffset
          );
          objs.msgC.style.transform = `translate3d(0,${calValues(
            values.msgC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.msgC.style.opacity = calValues(
            values.msgC_opacity_out,
            currentYOffset
          );
          objs.msgC.style.transform = `translate3d(0, ${calValues(
            values.msgC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (currentSectionRatio <= 0.81) {
          // in
          objs.msgD.style.opacity = calValues(
            values.msgD_opacity_in,
            currentYOffset
          );
          objs.msgD.style.transform = `translate3d(0,${calValues(
            values.msgD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.msgD.style.opacity = calValues(
            values.msgD_opacity_out,
            currentYOffset
          );
          objs.msgD.style.transform = `translate3d(0, ${calValues(
            values.msgD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 1:
        break;
      case 2:
        // ✅ 비디오 애니메이션
        let videoIndex2 = Math.round(calValues(values.imgSeq, currentYOffset)); // 비디오 이미지 스크롤에 따른 인덱스 번호
        objs.context.drawImage(objs.videoImgs[videoIndex2], 0, 0); // canvas에 그리기

        // canvas 투명도 애니메이션
        if (currentSectionRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          // out
          objs.canvas.style.opacity = calValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        // msgA
        if (currentSectionRatio <= 0.25) {
          // in
          objs.msgA.style.opacity = calValues(
            values.msgA_opacity_in,
            currentYOffset
          );
          objs.msgA.style.transform = `translate3d(0,${calValues(
            values.msgA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.msgA.style.opacity = calValues(
            values.msgA_opacity_out,
            currentYOffset
          );
          objs.msgA.style.transform = `translate3d(0, ${calValues(
            values.msgA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        // msgB && pinB
        if (currentSectionRatio <= 0.57) {
          // in
          objs.msgB.style.opacity = calValues(
            values.msgB_opacity_in,
            currentYOffset
          );
          objs.msgB.style.transform = `translate3d(0,${calValues(
            values.msgB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calValues(
            values.pinB_translateY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.msgB.style.opacity = calValues(
            values.msgB_opacity_out,
            currentYOffset
          );
          objs.msgB.style.transform = `translate3d(0, ${calValues(
            values.msgB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calValues(
            values.pinB_translateY,
            currentYOffset
          )})`;
        }
        // msgC && pinC
        if (currentSectionRatio <= 0.83) {
          // in
          objs.msgC.style.opacity = calValues(
            values.msgC_opacity_in,
            currentYOffset
          );
          objs.msgC.style.transform = `translate3d(0,${calValues(
            values.msgC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.pinC.style.transform = `scaleY(${calValues(
            values.pinC_translateY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.msgC.style.opacity = calValues(
            values.msgC_opacity_out,
            currentYOffset
          );
          objs.msgC.style.transform = `translate3d(0, ${calValues(
            values.msgC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.pinC.style.transform = `scaleY(${calValues(
            values.pinC_translateY,
            currentYOffset
          )})`;
        }
        break;
      case 3:
        break;
    }
  };

  const scrollLoop = () => {
    // 새로운 섹션인지 확인하는 상태 값 세팅
    isNewSection = false;
    // 이전 섹션들 높이의 합 세팅
    prevTotalHeight = 0;

    for (let i = 0; i < currentSection; i++) {
      prevTotalHeight += sectionInfo[i].scrollHeight;
    }

    // 현재 높이 값 > 이전 섹션들의 높이 합 + 활성화된 섹션 높이 값 --> 활성화된 섹션 다음으로 변경
    if (yOffset > prevTotalHeight + sectionInfo[currentSection].scrollHeight) {
      // 새로운 섹션으로 변경되므로 상태 값 세팅
      isNewSection = true;
      // 다음 섹션으로 변경
      currentSection++;
      // 현재 활성화된 섹션의 sticky-element 보여주기
      document.body.setAttribute("id", `show-section-${currentSection}`);
    }
    // 현재 높이 값 < 이전 섹션들의 높이 합 --> 활성화된 섹션을 이전으로 변경
    if (yOffset < prevTotalHeight) {
      // 새로운 섹션으로 변경되므로 상태 값 세팅
      isNewSection = true;
      // 현재 섹션이 0일 경우, 빼는 행위 하지 말고 종료
      if (currentSection === 0) return;
      // 이전 섹션으로 변경
      currentSection--;
      // 현재 활성화된 섹션의 sticky-element 보여주기
      document.body.setAttribute("id", `show-section-${currentSection}`);
    }
    // 새로운 섹션일 경우, 오차 값을 없애기 위해 playAnmation()를 한 번 쉰다.
    if (isNewSection) return;
    // 각 섹션에 해당하는 애니메이션 동작
    playAnimation();
  };

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", () => {
    setLayout();
    sectionInfo[0].objs.context.drawImage(
      sectionInfo[0].objs.videoImgs[1],
      0,
      0
    );
  }); // 브라우저 로드되었을 때마다 섹션 높이 세팅
  window.addEventListener("resize", setLayout); // 브라우저 창이 변할 때마다 섹션 높이 세팅

  setCanvas();
})();
