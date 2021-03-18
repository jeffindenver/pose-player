"use strict";

$(function () {

  let duration = 60;
  let index = 1;
  let timerID;
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

    Another alternative is to use setTimeout. Then have setTimeout inoke the next
    timer.
  */

  //jquery events
  $(".pickDirectory").change((event) => {

    // assign the list of directory files
    let files = event.target.files;
    console.log("Number of files: " + files.length);

    // Iterate over files and convert them to URL objects
    for (let i = 0; i < files.length; i++) {
    originalImageList.push(URL.createObjectURL(files[i]));
    }

    // copy original list
    currentImageList = originalImageList;

    currentPose.append(pose);
    pose.attr("src", currentImageList[0]);

    $(".notifications").html("Select a time period for your quick poses. \
      Then hit play. The default period is 60 seconds.");

    $(".notifications").css("display", "block");

    $(this).blur();
  });


  $(".pause").click(pauseTimer);

  $(".play").click(beginPlayer);

  function beginPlayer () {
    //TODO: check imageList length, if 0 alert that a directory must be selected
    resetIndex();
    getCurrentList();
    startTimer(getMilliseconds());
  }

  function pauseTimer() {
    clearInterval(timerID);
    $(".notifications").html("Pose Player paused");
    console.log("Timer stopped");
  }

  $("input[type='radio'][name='timing']").click( () => {
    duration = getSelectedTime();
  });

  $("input[type='checkbox'][name='randomizer']").change ( () => {
    // check if the list should be randomized
    if ($("input[type='checkbox'][name='randomizer']:checked").val()) {
      isRandom = true;
      console.log("randomizer is checked");
    } else {
      isRandom = false;
      console.log("randomizer is unchecked");
    }
  });

  function getCurrentList() {
    if(isRandom) {
      randomizeList();
    } else {
      currentImageList = originalImageList;
    }
  }

  function getMilliseconds() {
    let milliseconds = duration * 1000;
    console.log("milliseconds: " + milliseconds);
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

  function getRandomNum (max) {
    return Math.floor(Math.random() * max);
  }

  function startTimer(milliseconds) {
    timerID = setInterval(changeImage, milliseconds);
    console.log("Timer started");

    flashElement($(".notifications"));

    $(".notifications").html("Pose Player playing");
  }

  function changeImage() {
    if (index === currentImageList.length) {
      pauseTimer();
    }
    pose.attr("src", currentImageList[index]);
    index++;
  }

  function resetIndex() {
    index = 1;
  }

  function flashElement(element) {
    element.fadeOut(50).fadeIn(50).fadeOut(400).fadeIn(600);
  }

  function getSelectedTime() {
    return $("input[type='radio'][name='timing']:checked").val();
  }
});
