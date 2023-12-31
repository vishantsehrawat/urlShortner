const shrinkForm = document.getElementById("shortenerInput");
const shrinkFullUrl = document.getElementById("fullUrl");
const fullUrlBtn = document.getElementById("fullUrlBtn");
const linkCount = document.getElementById("allLinks");
const totalClicks = document.getElementById("allClicks");
const urlListBox = document.getElementById("urlListBox");
const shrinkFormCustom = document.getElementById("shortenerInputCustom");
const shrinkFullUrlCustom = document.getElementById("fullUrlCustom");
const shrinkCustomUrl = document.getElementById("customUrl");
const fullUrlBtnCustom = document.getElementById("fullUrlBtnCustom");
let allurls = [];
// const baseUrl = "http://localhost:8080"; // Your base URL
const baseUrl = "https://urlshortenerbasic1.onrender.com"; // Your base URL

let userId = localStorage.getItem("urlShortenerUser") || "defaultUserID";

shrinkForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  fullUrlBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
  const longUrl = shrinkFullUrl.value;
  try {
    const response = await fetch(`${baseUrl}/url/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl, id: userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to shrink URL.");
    }

    const result = await response.json();
    console.log(result);
    swal({
      title: result.message,
      text: "You can now access the short link in the Dashboard!",
      icon: "success",
      button: "Yay!🎉",
    }).then((value) => {
      if (value) {
        // displayAllUrls(allurls);
        fetchAllUrls();
      }
    });
    fullUrlBtn.innerHTML = "Shrink";
  } catch (err) {
    console.log("Error while shrinking URL:", err);
    fullUrlBtn.innerHTML = "Shrink";
  }
});
shrinkFormCustom.addEventListener("submit", async (event) => {
  event.preventDefault();
  fullUrlBtnCustom.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
  const longUrlCustom = shrinkFullUrlCustom.value;
  const customAlias = shrinkCustomUrl.value;

  try {
    const response = await fetch(`${baseUrl}/url/customShorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: longUrlCustom,
        customUrl: customAlias,
        id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create custom alias.");
    }

    const result = await response.json();
    console.log(result);
    swal({
      title: result.message,
      text: "You can now access the short link in the Dashboard!",
      icon: "success",
      button: "Yay!🎉",
    }).then((value) => {
      if (value) {
        fetchAllUrls();
      }
    });
    fullUrlBtnCustom.innerHTML = "Shrink Custom";
  } catch (err) {
    console.log("Error while creating custom alias:", err);
    fullUrlBtnCustom.innerHTML = "Shrink Custom";
  }
});

function displayAllUrls(urls) {
  urlListBox.innerHTML = "";
  if (!urls || !Array.isArray(urls)) {
    console.error("Invalid or empty URL list.");
    return;
  }

  urls.forEach((url) => {
    const urlItem = document.createElement("div");
    urlItem.classList.add("urlItem");

    const longUrlWrapper = document.createElement("div"); // Create a wrapper for the long URL
    const longUrlLabel = document.createElement("span");
    longUrlLabel.textContent = "Long URL: ";
    longUrlWrapper.appendChild(longUrlLabel);

    const longUrlElement = document.createElement("a");
    longUrlElement.href = url.longUrl;
    longUrlElement.textContent = url.longUrl;
    longUrlElement.target = "_blank";

    longUrlWrapper.appendChild(longUrlElement); // Append the long URL to the wrapper

    const shortUrlElement = document.createElement("a");
    shortUrlElement.href = `${baseUrl}/url/${url.shortUrl}`;
    shortUrlElement.textContent = `Short URL: ${baseUrl}/url/${url.shortUrl}`;
    shortUrlElement.target = "_blank";

    const visitsElement = document.createElement("p");
    visitsElement.textContent = `Visits: ${url.visits}`;

    urlItem.appendChild(longUrlWrapper); // Append the wrapper with the long URL
    urlItem.appendChild(shortUrlElement);
    urlItem.appendChild(visitsElement);
    urlListBox.appendChild(urlItem);
  });
}

function fetchAllUrls() {
  fetch(`${baseUrl}/url/getall`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }
      return res.json();
    })
    .then((res) => {
      if (res.success) {
        allurls = res.urls;
        displayAllUrls(allurls);

        let totalVisits = 0;
        res.urls.forEach((url) => {
          totalVisits += parseInt(url.visits);
        });

        linkCount.innerText = res.urls.length;
        totalClicks.innerText = totalVisits;
      } else {
        throw new Error("Failed to retrieve URLs.");
      }
    })
    .catch((err) => {
      console.log("Error fetching or processing data:", err);
    });
}

fetchAllUrls();
