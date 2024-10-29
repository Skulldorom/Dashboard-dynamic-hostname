var urlExclude = "192.168.0.105";

function triggerNotification() {
  // Create a notification element with a loader
  const notification = document.createElement("div");
  notification.className = "notification";

  const loader = document.createElement("div");
  loader.className = "loader";

  const message = document.createElement("span");
  message.textContent = "Loading...";

  notification.appendChild(loader);
  notification.appendChild(message);
  document.body.appendChild(notification);

  // Show the notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  updateLinks(() => {
    // Replace the loader with a confirmation message
    loader.remove();
    message.textContent = "Links Updated";
    notification.classList.add("success");

    // Hide the notification after 2 more seconds
    setTimeout(() => {
      notification.classList.remove("show");
      notification.addEventListener("transitionend", () =>
        notification.remove()
      );
    }, 2000);
  });
}

function updateLinks(callback) {
  var services = document.querySelectorAll(".service");
  // for each service get links that are children of the service
  services.forEach((service) => {
    var links = service.querySelectorAll("a");
    links.forEach((link) => {
      var baseURL = window.location.host.split(":")[0];

      // get the base link by removing beging and end of the href
      var protocol = link.href.split("://")[0];
      var baseLink = link.href.split("://")[1].split("/")[0];
      var port = baseLink.split(":")[1];
      var end = link.href.split("://")[1].split("/").slice(1).join("/");
      if (
        baseLink.split(":")[0] !== urlExclude &&
        baseLink.split(":")[0] !== baseURL
      ) {
        // if the base link is not the same as the current host change the link href to the current host
        var newLink = protocol + "://" + baseURL + ":" + port + "/" + end;
        link.href = newLink;
      }
    });
  });

  setTimeout(() => {
    callback();
  }, 1500);
}

window.addEventListener("load", function () {
  triggerNotification();
});
