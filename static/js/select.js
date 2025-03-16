var currentSceneList = ["tum", "bonn"]; //["lego", "ship"];
var currentScene = "tum"; //"lego";
var currentSceneId = 0;

var currentEpoch = "walking_xyz"; //"500";
var currentEpochId = 0;
/*
const sceneButtonTextsVideo = {
  0: ["500", "1500", "3000"], // Lego
  1: ["1000", "2000", "5000"], // Ship
};*/

const sceneButtonTextsVideo = {
  0: ["walking_xyz", "walking_static", "walking_rpy", "walking_halfsphere"], //tum
  1: ["balloon", "balloon2", "ps_track", "ps_track2"], //bonn
};

var currentEpochImage = "500";
var currentEpochIdImage = 0;
const sceneButtonTextsImage = {
  0: ["500", "1000", "1500", "2000", "2500", "3000"], // Lego
  1: ["500", "1000", "1500", "2500", "3500", "5000"], // Ship
};

document.addEventListener("DOMContentLoaded", function () {
  let video = document.getElementById("video_tum");
  let progressBar = document.getElementById("video_progress_tum");
  let playPauseBtn = document.getElementById("play_pause_btn_tum");
  let video_bonn = document.getElementById("video_bonn");
  let progressBar_bonn = document.getElementById("video_progress_bonn");
  let playPauseBtn_bonn = document.getElementById("play_pause_btn_bonn");

  // ✅ Update progress bar as the video plays
  video.addEventListener("timeupdate", function () {
      if (!progressBar.dragging) {
          progressBar.max = video.duration;
          progressBar.value = video.currentTime;
      }
  });
  video_bonn.addEventListener("timeupdate", function () {
    if (!progressBar_bonn.dragging) { // Only update when not dragging
      progressBar_bonn.max = video_bonn.duration;
      progressBar_bonn.value = video_bonn.currentTime;
  }
});

  // ✅ Enable dragging to seek video
  progressBar.addEventListener("input", function () {
      progressBar.dragging = true;
  });
  progressBar_bonn.addEventListener("input", function () {
    progressBar_bonn.dragging = true;  // Prevent automatic updates while dragging
});

  progressBar.addEventListener("change", function () {
      video.currentTime = progressBar.value;
      progressBar.dragging = false;
  });

  progressBar_bonn.addEventListener("change", function () {
    video_bonn.currentTime = progressBar_bonn.value;
    progressBar_bonn.dragging = false;  // Resume updates after seeking
});

  // ✅ Play/Pause button functionality
  playPauseBtn.addEventListener("click", function () {
      if (video.paused) {
          video.play();
          playPauseBtn.textContent = "Pause";  // Update button text
      } else {
          video.pause();
          playPauseBtn.textContent = "Play";  // Update button text
      }
  });
  playPauseBtn_bonn.addEventListener("click", function () {
    if (video_bonn.paused) {
      video_bonn.play();
      playPauseBtn_bonn.textContent = "Pause";  // Update button text
  } else {
      video_bonn.pause();
      playPauseBtn_bonn.textContent = "Play";  // Update button text
  }
});

  // ✅ Update button text when video is paused
  video.addEventListener("pause", function () {
      playPauseBtn.textContent = "Play";
  });
  video_bonn.addEventListener("pause", function () {
    playPauseBtn_bonn.textContent = "Play";
  });

  video.addEventListener("play", function () {
      playPauseBtn.textContent = "Pause";
  });
  video_bonn.addEventListener("play", function () {
    playPauseBtn_bonn.textContent = "Pause";
});
});


function ChangeScene(idx){
  var li_list = document.getElementById("scene-result-view-ul").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[idx].className = "active";

  currentScene = currentSceneList[idx];
  currentSceneId = idx;

  var li_list = document.getElementById("video-result-view-ul").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[0].className = "active";
  currentEpoch = sceneButtonTextsVideo[currentSceneId][0];
  currentEpochId = 0

  // change video paths
  let video = document.getElementById("video_scene")
  old_src = video.src;
  new_scr = old_src.split('/');
  new_scr[new_scr.length-3] = currentScene;
  new_scr[new_scr.length-1] = currentEpoch + ".mp4";
  new_video_dir = new_scr.join('/');
  video.src = new_video_dir;
  // change text for the epoch buttons for the image
  // Get the target button texts for the selected scene
  const newTextsVideo = sceneButtonTextsVideo[currentSceneId] || [];
  // Update the buttons with new text
  const buttonsVideo = document.querySelectorAll("#video-result-view-ul li a");
  buttonsVideo.forEach((buttonVideo, index) => {
      if (newTextsVideo[index] !== undefined) {
          buttonVideo.textContent = newTextsVideo[index];
      }
  });

  var li_list = document.getElementById("image-result-view-ul").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[0].className = "active";
  currentEpochImage= sceneButtonTextsImage[currentSceneId][0];
  currentEpochIdImage = 0;

  // change image paths
  let image1 = document.getElementById("scene-image-neuralangelo")
  old_src1 = image1.src;
  new_scr1 = old_src1.split('/');
  new_scr1[new_scr1.length-4] = currentScene;
  new_scr1[new_scr1.length-1] = currentEpochImage + ".png";
  new_image_dir1 = new_scr1.join('/');
  image1.src = new_image_dir1;

  let image2 = document.getElementById("scene-image-ours")
  old_src2 = image2.src;
  new_scr2 = old_src2.split('/');
  new_scr2[new_scr2.length-4] = currentScene;
  new_scr2[new_scr2.length-1] = currentEpochImage + ".png";
  new_image_dir2 = new_scr2.join('/');
  image2.src = new_image_dir2;

  // change text for the epoch buttons for the image
  // Get the target button texts for the selected scene
  const newTextsImage = sceneButtonTextsImage[currentSceneId] || [];
  // Update the buttons with new text
  const buttonsImage = document.querySelectorAll("#image-result-view-ul li a");
  buttonsImage.forEach((buttonImage, index) => {
      if (newTextsImage[index] !== undefined) {
          buttonImage.textContent = newTextsImage[index];
      }
  });

  let mesh1 = document.getElementById("mesh-neuralangelo")
  old_src1 = mesh1.src;
  new_src1 = old_src1.split('/');
  new_src1[new_src1.length-3] = currentScene;
  new_mesh_dir1 = new_src1.join('/');
  mesh1.src = new_mesh_dir1;

  let mesh2 = document.getElementById("mesh-ours")
  old_src2 = mesh2.src;
  new_src2 = old_src2.split('/');
  new_src2[new_src2.length-3] = currentScene;
  new_mesh_dir2 = new_src2.join('/');
  mesh2.src = new_mesh_dir2;

}
// adjusted from ChangeResult
function ChangeEpoch(sceneid, idx){
  var li_list = document.getElementById("video-result-view-ul").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[idx].className = "active";

  console.log("currentSceneId:", currentSceneId);
  console.log("idx:", idx);

  let video = document.getElementById("video_tum");
  let progressBar = document.getElementById("video_progress_tum");

  let previousTime = video.currentTime;  // Save the current playback time
  console.log("Previous Time:", previousTime);

  currentSceneId = sceneid
  currentEpoch= sceneButtonTextsVideo[currentSceneId][idx];
  currentEpochId = idx;
  console.log("currentEpoch:", currentEpoch);
  console.log("currentEpochId:", currentEpochId);
  //let video = document.getElementById("video_scene")
  old_src = video.src;
  console.log("Old Video Source:", old_src);  // Print old src
  new_scr = old_src.split('/');
  new_scr[new_scr.length-1] = currentEpoch + ".mp4";
  new_video_dir = new_scr.join('/');
  video.src = new_video_dir;

  video.onloadedmetadata = function () {
    video.currentTime = 0; //previousTime;  // Restore playback position
    progressBar.value = 0; //previousTime;  // Sync progress bar
    progressBar.max = video.duration;  // Update progress bar range
    video.play();  // Auto-play the new video 
  };

  console.log("New Video Source:", new_video_dir);

}

function ChangeEpoch2(sceneid, idx){
  var li_list = document.getElementById("video-result-view-ul-bonn").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[idx].className = "active";

  console.log("currentSceneId:", currentSceneId);
  console.log("idx:", idx);

  let video_bonn = document.getElementById("video_bonn");
  let progressBar_bonn = document.getElementById("video_progress_bonn");

  let previousTime = video_bonn.currentTime;  // Save the current playback time
  console.log("Previous Time:", previousTime);

  currentSceneId = sceneid
  currentEpoch= sceneButtonTextsVideo[currentSceneId][idx];
  currentEpochId = idx;
  console.log("currentEpoch:", currentEpoch);
  console.log("currentEpochId:", currentEpochId);
  //let video = document.getElementById("video_scene")
  old_src = video_bonn.src;
  console.log("Old Video Source:", old_src);  // Print old src
  new_scr = old_src.split('/');
  new_scr[new_scr.length-1] = currentEpoch + ".mp4";
  new_video_dir = new_scr.join('/');
  video_bonn.src = new_video_dir;

  video_bonn.onloadedmetadata = function () {
    video_bonn.currentTime = 0; //previousTime;  // Restore playback position
    progressBar_bonn.value = 0; //previousTime;  // Sync progress bar
    progressBar_bonn.max = video_bonn.duration;  // Update progress bar range
    video_bonn.play();  // Auto-play the new video 
  };

  console.log("New Video Source:", new_video_dir);

}

function ChangeEpochImage(idx){
  var li_list = document.getElementById("image-result-view-ul").children;
  for(i = 0; i < li_list.length; i++){
      li_list[i].className = "";
  }
  li_list[idx].className = "active";

  currentEpochImage= sceneButtonTextsImage[currentSceneId][idx];
  currentEpochIdImage = idx;
  let image1 = document.getElementById("scene-image-neuralangelo")
  old_src1 = image1.src;
  new_scr1 = old_src1.split('/');
  new_scr1[new_scr1.length-1] = currentEpochImage + ".png";
  new_image_dir1 = new_scr1.join('/');
  image1.src = new_image_dir1;

  let image2 = document.getElementById("scene-image-ours")
  old_src2 = image2.src;
  new_scr2 = old_src2.split('/');
  new_scr2[new_scr2.length-1] = currentEpochImage + ".png";
  new_image_dir2 = new_scr2.join('/');
  image2.src = new_image_dir2;
}
