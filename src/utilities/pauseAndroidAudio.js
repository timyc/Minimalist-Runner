function handleVisibilityChange() {
  if (document.hidden) music.pause();
  else music.play();
}
document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);