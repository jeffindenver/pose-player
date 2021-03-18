"use strict";

$(function () {

  let duration = 60;
  let index = 1;
  let timerID;
  let images = [];
  let currentPose = $("#image-target");
  let pose = $('<img>');

  // alternative timer
  /*
    Instead of using setInterval for the images, I could use
    setInvterval for the clock. When the clock is equal to the selected
    duration, change the image and reset the clock to zero and repeat.
    This eliminates the issue with coordinating two intervals.
  */

  /*
    @TODO Create a randomize function. 1. make deep copy of array. 2. Iterate
    over entire array and swap each element with a random element from 0 to the
    length of the array.
   */

  //jquery events
  $(".pickDirectory").change((event) => {

    let files = event.target.files;
    console.log("Number of files: " + files.length);

    for (let i = 0; i < files.length; i++) {
      images.push(URL.createObjectURL(files[i]));
    }

    images.forEach(console.log);

    currentPose.append(pose);
    pose.attr("src", images[0]);

    $(".notifications").html("Select a time period for your quick poses. \
      Then hit play. The default period is 60 seconds.");

    $(".notifications").css("display", "block");

    $(this).blur();
  });

  $(".pause").click( () => {
    clearInterval(timerID);
    $(".notifications").html("Pose Player paused");
    console.log("Timer stopped");
  });

  $(".play").click(initTimer);

  $("input[type='radio'][name='timing']").click( () => {
    duration = getSelectedTime();
  });

  function initTimer() {
    let milliseconds = duration * 1000;
    console.log("milliseconds: " + milliseconds);
    startTimer(milliseconds);
  }

  function startTimer(milliseconds) {
    timerID = setInterval(poseTimer, milliseconds);
    console.log("Timer started");

    flashElement($(".notifications"));

    $(".notifications").html("Pose Player playing");
  }

  function poseTimer() {
    if (index === images.length) {
      index = 0;
    }
    pose.attr("src", images[index]);
    index++;
  }

  function flashElement(element) {
    element.fadeOut(50).fadeIn(50).fadeOut(400).fadeIn(600);
  }

  function getSelectedTime() {
    return $("input[type='radio'][name='timing']:checked").val();
  }
});
