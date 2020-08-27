function setHljsCss(isDark) {
  var cssName = isDark ? "darcula.css" : "github.css";
  var cssUrl = "/public/lib/highlight/styles/" + cssName;
  var styleEl = document.getElementById("js_hljsCss");
  styleEl.setAttribute("href", cssUrl);
}

function initAndDeleteOsTheme() {
  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    setHljsCss(media.matches);

    media.addEventListener("change", function () {
      var isDark = media.matches;
      setHljsCss(isDark);
    });
  }
}

initAndDeleteOsTheme();
