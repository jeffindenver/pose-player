"use strict";

$(function () {
  //jquery events
  $(".pickDirectory").change((event) => {

    let target = $("#output-target");
    let files = event.target.files;
    let images = [];

    console.log("Number of files: " + files.length);

    for (let i = 0; i < files.length; i++) {
      images.push(URL.createObjectURL(files[i]));
    }

    // attempt to display the first image
    let currentPose = $("#image-target");
    let pose = $('<img>');

    pose.attr("src", images[2]);
    currentPose.append(pose);

  });
});
