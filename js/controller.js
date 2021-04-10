"use strict";

$(function () {

  let pp = new PosePlayer();

  // TODO: Improve clock visuals

   const FORWARD = 1;
   const BACKWARD = -1;

  /*****************************************************************************
   * jQuery events
   ****************************************************************************/
  $(".pickDirectory").change((event) => {
    const files = event.target.files;
    pp.resetOriginalList();
    pp.buildImageList(files);
    if(pp.isRandomChecked) {
      pp.randomizeList();
    }
    loadFirstImage();
    notify("Select a time period for your quick poses. Then hit play.");
    $(this).blur();
  });

  $(".pause").click(pauseTimer);

  $(".play").click(beginPlayer);

  $(".stepforward").click(stepForward);

  $(".stepbackward").click(stepBackward);

  $("input[type='radio'][name='timing']").click(() => {
    pp.duration = getSelectedTime();
    pp.timeLeft = pp.duration;
  });

  $("input[type='checkbox'][name='randomizer']").change(() => {
    pp.isRandomChecked = $(this.checked).val();
  });

  /*****************************************************************************
   * Controller functions
   ****************************************************************************/
  function beginPlayer() {
    if (pp.currentImageList.length < 1) {
      notify("Please first select a directory.");
      return;
    }
    notify("Pose Player playing");
    startTimer();
  }

  function pauseTimer() {
    clearInterval(pp.clockID);
    notify("Pose Player paused");
    console.log("Timer stopped");
  }

  function stepForward() {
    clearInterval(pp.clockID);
    pp.timeLeft = pp.duration;
    changeImage(FORWARD);
    startTimer();
  }

  function stepBackward() {
    if (pp.index === 0) {
      return;
    }
    pp.timeLeft = pp.duration;
    clearInterval(pp.clockID);
    changeImage(BACKWARD);
    startTimer();
  }

  function loadFirstImage() {
    pp.timeLeft = pp.duration;
    pp.currentPose.append(pp.pose);
    pp.pose.attr("src", pp.currentImageList[0]);
  }

  function startTimer() {
    clearInterval(pp.clockID);
    pp.clockID = setInterval(() => {
      pp.timeLeft--;
      updateClock(pp.timeLeft);
      if (pp.timeLeft === 0) {
        clearInterval(pp.clockID);
        pp.timeLeft = pp.duration;
        changeImage(FORWARD);
      }
    }, 1000);
  }

  function changeImage(direction) {
    pp.index += direction;

    if (pp.index >= pp.currentImageList.length) {
      pp.index = 0;
    }
    if (pp.index < 0) {
      pp.index = pp.currentImageList.length - 1;
    }
    pp.pose.attr("src", pp.currentImageList[pp.index]);
    console.log("displaying image " + pp.index);
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

  function flashElement(element) {
    element.fadeOut(50).fadeIn(50).fadeOut(400).fadeIn(600);
  }

  function getSelectedTime() {
    return $("input[type='radio'][name='timing']:checked").val();
  }
});
