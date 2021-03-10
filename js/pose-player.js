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
    currentPose.append(pose);
    pose.attr("src", images[0]);

    $(".notifications").html("Select a time period for your quick poses. \
      Then hit play. The default period is 60 seconds.");

    $(".notifications").css("display", "block");

    $(this).blur();
  });

  $(".pause").click( () => {
    clearInterval(timerID);
    console.log("Timer stopped");
  });

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
