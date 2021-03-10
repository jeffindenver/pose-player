"use strict";

$(function () {

  let duration = 5000;
  let index = 1;
  let timerID;
  let images = [];
  let currentPose = $("#image-target");
  let pose = $('<img>');

  //jquery events
  $(".pickDirectory").change((event) => {

    let files = event.target.files;
    console.log("Number of files: " + files.length);

    for (let i = 0; i < files.length; i++) {
      images.push(URL.createObjectURL(files[i]));
    }
    // attempt to display the first image
    currentPose.append(pose);
    // load first image before timer starts
    pose.attr("src", images[0]);

  });

  $(".pause").click( () => {
    clearInterval(timerID);
    console.log("Timer stopped");
  });

  // play each image for a duration of time
  $(".play").click(startTimer);

  function poseTimer() {
    if (index === images.length) {
      index = 0;
    }
    pose.attr("src", images[index]);
    index++;
  }

  function startTimer() {
    timerID = setInterval(poseTimer, duration);
    console.log("Timer started");
  }

});
