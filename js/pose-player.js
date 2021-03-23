"use strict";

$(function () {

  // TODO: put the following variables in a PosePlayer object. Move functions
  // that belong there.

  // TODO: Improve clock visuals

  // TODO: Improve pause function so that pausing does not reset the list
  // and continues where it left off.

  let duration = 60;
  let index = 0;
  let clockID;
  let originalImageList = [];
  let currentImageList = [];
  let currentPose = $("#image-target");
  let pose = $('<img>');
  let isRandom = true;
  const FORWARD = 1;
  const BACKWARD = -1;

  /*******************************************************************************
   * jQuery events
   ******************************************************************************/
  $(".pickDirectory").change((event) => {
    const files = event.target.files;
    resetOriginalList();
    buildImageList(files);
    setCurrentList();
    notify("Select a time period for your quick poses. Then hit play.");
    $(this).blur();
  });

  $(".pause").click(pauseTimer);

  $(".play").click(beginPlayer);

  $(".stepforward").click(stepForward);

  $(".stepbackward").click(stepBackward);

  $("input[type='radio'][name='timing']").click(() => {
    duration = getSelectedTime();
  });

  $("input[type='checkbox'][name='randomizer']").change(() => {
    // check if user selected randomization
    if ($("input[type='checkbox'][name='randomizer']:checked").val()) {
      isRandom = true;
    } else {
      isRandom = false;
    }
  });

  /*****************************************************************************
   * other functions
   ****************************************************************************/
  function buildImageList(files) {
    for (let i = 0; i < files.length; i++) {
      if (isValidImage(files[i].type)) {
        console.log("added: " + files[i].type);
        originalImageList.push(URL.createObjectURL(files[i]));
      }
    }
  }

  function isValidImage(type) {
    return (type === `image/jpeg` || type === `image/png`);
  }

  function beginPlayer() {
    if (currentImageList.length < 1) {
      notify("Please first select a directory.");
      return;
    }
    notify("Pose Player playing");
    resetIndex();
    getCurrentList();
    loadFirstImage();
    startTimer();
  }

  function pauseTimer() {
    clearInterval(clockID);
    notify("Pose Player paused");
    console.log("Timer stopped");
  }

  function stepForward() {
    clearInterval(clockID);
    changeImage(FORWARD);
    startTimer();
  }

  function stepBackward() {
    if (index === 0) {
      return;
    }
    clearInterval(clockID);
    changeImage(BACKWARD);
    startTimer();
  }

  function loadFirstImage() {
    currentPose.append(pose);
    pose.attr("src", currentImageList[0]);
  }

  function getCurrentList() {
    if (isRandom) {
      randomizeList();
    } else {
      setCurrentList();
    }
  }

  function randomizeList() {
    // swap the elements in place using random number gen
    for (let i = 0; i < currentImageList.length; i++) {
      let holdingBucket = originalImageList[i];
      let randomIndex = getRandomNum(currentImageList.length - 1);
      currentImageList[i] = originalImageList[randomIndex];
      currentImageList[randomIndex] = holdingBucket;
    }
    console.log("current image list length is " + currentImageList.length);
  }

  function getRandomNum(max) {
    return Math.floor(Math.random() * max);
  }

  function startTimer() {
    clearInterval(clockID);
    let timeLeft = duration;
    clockID = setInterval(() => {
      timeLeft--;
      updateClock(timeLeft);
      if (timeLeft === 0) {
        clearInterval(clockID);
        changeImage(FORWARD);
      }
    }, 1000);
  }

  function changeImage(direction) {
    index += direction;

    if (index >= currentImageList.length) {
      index = 0;
    }
    if (index < 0) {
      index = currentImageList.length - 1;
    }
    pose.attr("src", currentImageList[index]);
    console.log("displaying image " + index);
    startTimer();
  }

  function updateClock(timeLeft) {
    $(".clock").html(timeLeft);
  }

  function notify(message) {
    $(".notifications").css("display", "block");
    flashElement($(".notifications"));
    $(".notifications").html(message);
  }

  function resetIndex() {
    index = 0;
  }

  function resetOriginalList() {
    originalImageList = [];
  }

  function setCurrentList() {
    currentImageList = originalImageList;
  }

  function flashElement(element) {
    element.fadeOut(50).fadeIn(50).fadeOut(400).fadeIn(600);
  }

  function getSelectedTime() {
    return $("input[type='radio'][name='timing']:checked").val();
  }
});
