"use strict";

$(function () {

  let duration = 60;
  let index = 1;
  // let timerID;
  let clockID;
  let originalImageList = [];
  let currentImageList = [];
  let currentPose = $("#image-target");
  let pose = $('<img>');
  let isRandom = true;


  // alternative timer
  /*
    Instead of using setInterval for the images, I could use
    setInvterval for the clock. When the clock is equal to the selected
    duration, change the image and reset the clock to zero and repeat.
    This eliminates the issue with coordinating two intervals.

    Another alternative is to use setTimeout. Then have setTimeout
    callback invoke the next
    timer.
  */

  //jquery events
  $(".pickDirectory").change((event) => {

    let files = event.target.files;
    console.log("Number of files: " + files.length);

    for (let i = 0; i < files.length; i++) {
      originalImageList.push(URL.createObjectURL(files[i]));
    }

    setCurrentList();
    notify("Select a time period for your quick poses.Then hit play.")
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
    // check if the list should be randomized
    if ($("input[type='checkbox'][name='randomizer']:checked").val()) {
      isRandom = true;
    } else {
      isRandom = false;
    }
  });

  function beginPlayer() {
    if (currentImageList.length < 1) {
      notify("Please first select a directory.");
      return;
    }
    notify("Pose Player playing");
    resetIndex();
    getCurrentList();
    loadFirstImage();
    //startTimer(getMilliseconds());
    startTimer();
  }

  function pauseTimer() {
    clearInterval(clockID);
    notify("Pose Player paused");
    console.log("Timer stopped");
  }

  function stepForward() {
    clearInterval(clockID);
    index++;
    changeImage();
    //startTimer(getMilliseconds());
    startTimer();
  }

  function stepBackward() {
    clearInterval(clockID);
    index--;
    changeImage();
    //startTimer(getMilliseconds());
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

  function getMilliseconds() {
    let milliseconds = duration * 1000;
    return milliseconds;
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
    // TODO: change this
    // 1. set an interval for one second
    // 2. supply a callback that decrements the clock by one second
    // 3. Once the clock reaches zero, call changeImage
    clearInterval(clockID);
    let timeLeft = duration;
    clockID = setInterval( () => {
      timeLeft--;
      updateClock(timeLeft);
      if (timeLeft === 0) {
        clearInterval(clockID);
        changeImage();
        index++;
      }
    }, 1000);

    //timerID = setTimeout(changeImage, getMilliseconds());
    console.log("Timer started");

  }

  function changeImage() {
    if (index === currentImageList.length) {
      index = 0;
    }
    if (index < 0) {
      index = currentImageList.length;
    }
    pose.attr("src", currentImageList[index]);
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
    index = 1;
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
