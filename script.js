function initMap() {
  console.log("map initialized");
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 6.560154, lng: 3.332506 }, // Initial center
    zoom: 8, // Initial zoom level
  });

  // Example: Listen for a click event on a location
  var marker = new google.maps.Marker({
    position: { lat: 6.503154, lng: 3.226506 }, // New York City coordinates
    map: map,
  });

  google.maps.event.addListener(marker, "click", function () {
    map.setCenter(marker.getPosition()); // Center the map on the clicked marker
    map.setZoom(15); // Zoom in
  });
}
let darkBG = true;
let root = document.documentElement;
$("#themeSwitch, .themeSwitch").click(function () {
  console.log($("#themeSwitch").css("rotate"));
  $("#themeSwitch").css(
    "rotate",
    $("#themeSwitch").css("rotate") == "none" ? "180deg" : "none"
  );
  $("#themeSwitch svg path").css(
    "fill",
    $("#themeSwitch svg path").css("fill") == "rgb(8, 38, 17)"
      ? "#85ffab"
      : "rgb(8, 38, 17)"
  );
  console.log($("#themeSwitch svg").css("fill"));

  if (darkBG) {
    root.style.setProperty("--fontColor", "rgb(8, 38, 17)");
    root.style.setProperty("--bgColor", "rgb(237, 247, 237)");
    root.style.setProperty("--bgSec", "rgb(196, 238, 209)");
    root.style.setProperty("--active", "rgb(4, 72, 25)");
    root.style.setProperty("--themeDup", "rgb(133 255 171)");

    darkBG = false;
  } else {
    root.style.setProperty("--fontColor", "rgb(237, 247, 237)");
    root.style.setProperty("--bgColor", "rgb(8, 38, 17)");
    root.style.setProperty("--bgSec", "rgb(4, 72, 25)");
    root.style.setProperty("--theme", "rgb(21, 108, 48)");
    root.style.setProperty("--themeDup", "rgb(21, 108, 48)");
    root.style.setProperty("--themeSec", "rgb(196, 238, 209)");
    root.style.setProperty("--active", "rgb(133 255 171)");
    darkBG = true;
  }
});

const slideIn = () => {
  $(".sideMenu").removeClass("slide-out");
  $(".sideMenu").addClass("slide-in");
};
const slideOut = () => {
  $(".sideMenu").removeClass("slide-in");
  $(".sideMenu").addClass("slide-out");
};

$(".menuIcon").click(function () {
  slideIn();
});
$(".closeIcon").click(function () {
  slideOut();
});

let buttonEL;

$(".menu li").click(function () {
  $(".menu li").removeClass("active");
  console.log("getting start");
  $(this).addClass("active");
  slideOut();
  $(".loadingIcon").css("display", "grid");

  let pageNumber = $(".menu li").index($(this));

  function getFile() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "pages.txt", true);
    xhr.send();

    xhr.onload = function () {
      let page = this.response.split("---EndOfPage---")[pageNumber];
      $(".mainContentContainer").html(page);
      buttonEL = $(".status");
      // Target element to observe
    };
    xhr.onprogress = () => {
      $("#pageLoading").addClass("showAnimation");
    };
    xhr.loading = () => {
      console.log("getting completed");
      $("#pageLoading").removeClass("showAnimation");
    };
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("completed");
        $(".loadingIcon").css("display", "none");
      }
    };
  }

  getFile("pages.txt");
});

$(".mainContentContainer").on("click", ".location", function () {
  $(".popupContainer, .mapContainer, .emailMe").hide();
  console.log($("#map"));
  $(".popupContainer, .mapContainer, #map ").show();
  initMap();
});

$(".mainContentContainer").on("click", ".popupContainer i", function () {
  $(".popupContainer, .mapContainer, .emailMe, #map").hide();
});

$(".mainContentContainer").on("click", ".email", function () {
  $(".popupContainer, .mapContainer, .emailMe, #map").hide();
  $(".popupContainer").css("display", "flex");
  $(".emailMe").css("display", "grid");
});

const animateElements = document.querySelectorAll(".animate__animated");

(function () {
  emailjs.init("m7LyBc2cmZpjNjRTc");
})();

let callback = (status, message = "Email sent successfully") => {
  buttonEL = $("form button");
  buttonEL.text(message);
  console.log(status);
  if (status.status !== 200) {
    console.log("error");
    buttonEL.addClass("error");
  } else {
    console.log("success");
    buttonEL.addClass("success");
    $("#senderName").val("");
    $("#senderEmail").val("");
    $("#senderSubject").val("");
    $("#emailBody").val("");
  }
  setTimeout(function () {
    buttonEL.text("Send").attr("disabled", false);
    buttonEL.removeClass("success error");
    buttonEL.addClass("active");
  }, 3000);
};

$(".mainContentContainer").on("click", "form button", function () {
  let mailerName = $("#senderName");
  let mailerEmail = $("#senderEmail");
  let mailSubject = $("#senderSubject");
  let mailBody = $("#emailBody");

  if (
    mailerName.val() == "" ||
    mailerEmail.val() == "" ||
    mailSubject.val() == "" ||
    mailBody.val() == ""
  ) {
    alert("Please fill all the fields");
    return false;
  }

  $(this).text("Sending...");
  $(this).css("textDecoration", "italics");
  $(this).attr("disabled", true);
  $(this).removeClass("active");

  var emailContent = {
    from_name: mailerName.val(),
    to_name: mailerEmail.val(),
    message: mailSubject.val() + "\n" + mailBody.val(),
  };
  emailjs
    .send("service_yax7r57", "template_e2i17pb", emailContent)
    .then(callback, function (Error) {
      callback(Error, "There was an error sending the message");
    });

  return false;
});
