(function () {
  var angle = 0;
  var p = document.getElementById("FullInLove");
  var text = p.textContent.split("");
  var len = text.length;
  var phaseJump = 360 / len;
  var spans;

  p.innerHTML = text
    .map(function (char) {
      return "<span>" + char + "</span>";
    })
    .join("");

  spans = p.children;

  (function wheee() {
    for (var i = 0; i < len; i++) {
      spans[i].style.color = "hsl(" + (angle + Math.floor(i * phaseJump)) + ", 55%, 60%)";
    }
    angle++;
    requestAnimationFrame(wheee);
  })();
})();
