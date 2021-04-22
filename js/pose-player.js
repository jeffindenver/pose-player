/*******************************************************************************
 * Title: pose-player.js
 * Author: Jeff Shepherd
 * Date: 4/9/2021
 * Description: PosePlayer object that holds data on the current list of
 * images, index for current pose, time remaining and related functions.
 ******************************************************************************/

function PosePlayer() {
  "use strict";

  this.duration = 60;
  this.timeLeft;
  this.index = 0;
  this.clockID;
  this.currentPose = $("#image-target");
  this.pose = $('<img>');
  this.isRandomChecked = true;
  this.originalImageList = [];
  this.currentImageList = [];

  this.resetOriginalList = function() {
    this.originalImageList = [];
  }

  this.buildImageList = function(files) {
    for (let i = 0; i < files.length; i++) {
      if (isValidImage(files[i].type)) {
        console.log("added: " + files[i].type);
        this.originalImageList.push(URL.createObjectURL(files[i]));
      }
    }
    this.currentImageList = this.originalImageList;
  }

  function isValidImage(type) {
    return (type === `image/jpeg` || type === `image/png`);
  }

  this.getCurrentList = function () {
    return this.currentImageList;
  }

  this.randomizeList = function () {
    // swap the elements using random number gen
    for (let i = 0; i < this.currentImageList.length; i++) {
      let holdingBucket = this.originalImageList[i];
      let randomIndex = getRandomNum(this.currentImageList.length - 1);
      this.currentImageList[i] = this.originalImageList[randomIndex];
      this.currentImageList[randomIndex] = holdingBucket;
    }
    console.log("current image list length is " + this.currentImageList.length);
  }

  function getRandomNum(max) {
    return Math.floor(Math.random() * max);
  }
}

