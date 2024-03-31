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
$("#themeSwitch").click(function () {
  console.log($("#themeSwitch").css("rotate"));
  $(this).css(
    "rotate",
    $("#themeSwitch").css("rotate") == "none" ? "180deg" : "none"
  );
  $("#themeSwitch svg").css(
    "fill",
    $("#themeSwitch svg").css("fill") == "rgb(255, 255, 255)"
      ? "black"
      : "white"
  );
  console.log($("#themeSwitch svg").css("fill"));

  if (darkBG) {
    document.documentElement.style.setProperty("--dark-fontColor", "black");
    document.documentElement.style.setProperty(
      "--dark-bgColor",
      "antiquewhite"
    );
    darkBG = false;
  } else {
    document.documentElement.style.setProperty("--dark-fontColor", "white");
    document.documentElement.style.setProperty(
      "--dark-bgColor",
      "rgb(32, 28, 28)"
    );
    darkBG = true;
  }

  $("body").css({
    "background-color":
      $("body").css("backgroundColor") == "rgb(32, 28, 28)"
        ? "rgb(255, 255, 255)"
        : "rgb(32, 28, 28)",
    color:
      $("body").css("color") == "rgb(32, 28, 28)"
        ? "rgb(255, 255, 255)"
        : "rgb(32, 28, 28)",
  });
  $(".sideMenu, .educations .content, .navbar").css({
    "background-color":
      $(".sideMenu").css("backgroundColor") == "rgb(114, 99, 99)"
        ? "rgb(178, 163, 163)"
        : "rgb(114, 99, 99)",
  });
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
  $(this).addClass("active");
  slideOut();

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
      console.log("getting start");
      $("#pageLoading").addClass("showAnimation");
    };
    xhr.loading = () => {
      console.log("getting completed");
      $("#pageLoading").removeClass("showAnimation");
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
    buttonEL.css({
      top: "2em",
      borderColor: "red",
      backgroundColor: "rgb(250, 186, 186)",
    });
  } else {
    buttonEL.css({
      top: "2em",
      display: "block",
      borderColor: "rgb(5, 85, 5)",
      backgroundColor: "rgb(129, 201, 129)",
    });
    // $(".mailContent").val("");
    console.log("success");
  }
  setTimeout(function () {
    buttonEL.text("Send");
    buttonEL.css({});
  }, 3000);
};

$(".mainContentContainer").on("click", "form button", function () {
  // $("form").onSubmit(function (e) {
  // e.preventDefault();
  // });
  // const animation = lottie.loadAnimation({
  //   container: $(".animation"),
  //   renderer: "svg",
  //   loop: true,
  //   autoplay: true,
  //   path: "animation_lm06rzcf.json",
  // });

  console.log("submitting", $(this));

  $(this).text("Sending...");
  $(this).css({ textDecoration: "italics" });
  $(this).attr("disabled", true);
  // return false;

  let mailerName = $("#senderName").val();
  let mailerEmail = $("#senderEmail").val();
  let mailSubject = $("#senderSubject").val();
  let mailBody = $("#emailBody").val();

  var emailContent = {
    from_name: mailerName,
    to_name: mailerEmail,
    message: mailSubject + "\n" + mailBody,
  };
  emailjs
    .send("wservice_yax7r57", "template_e2i17pb", emailContent)
    .then(callback, function (Error) {
      callback(Error, "There was an error sending the message");
    });

  return false;
});
