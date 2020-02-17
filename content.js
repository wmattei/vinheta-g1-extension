const audio = document.createElement("audio");
audio.setAttribute(
    "src",
    "https://g1-vinheta-api.herokuapp.com/static/vinheta_plantao.mp3"
);

const modal = document.createElement("div");
let tweet = null;

document.body.addEventListener("mousemove", function() {
    if (tweet) {
        document.body.append(audio);
        audio.play();

        if (!document.getElementById("modal")) {
            buildModal(tweet);
            document.body.append(modal);
        }

        tweet = null;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    tweet = request.tweet;
    sendResponse("OK");
});

function buildModal(tweet) {
    modal.style = `
        position: fixed; 
        z-index: ${Number.MAX_SAFE_INTEGER}; 
        top: 10px; 
        right: 10px; 
        border: black 1px solid; 
        box-shadow: 0px 0px 20px 4px #757575; 
        background-color: white;
    `;

    modal.id = "modal";

    const closeBtn = document.createElement("a");
    closeBtn.innerText = "[X]";
    closeBtn.style = `
        font-size: 10pt
    `;
    closeBtn.onclick = function() {
        document.getElementById("modal").style = "display: none;";
    };
    modal.append(closeBtn);
    modal.append(document.createElement("br"));

    const tweetIframe = document.createElement("iframe");
    tweetIframe.setAttribute("border", 0);
    tweetIframe.setAttribute("frameborder", 0);
    tweetIframe.setAttribute("height", 250);
    tweetIframe.setAttribute("width", 550);
    tweetIframe.setAttribute(
        "src",
        `https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F${tweet.user.screen_name}%2Fstatus%2F${tweet.id_str}`
    );
    modal.append(tweetIframe);
    modal.append(document.createElement("br"));

    const followLink = document.createElement("a");
    followLink.setAttribute("href", "https://twitter.com/wagnermattei");
    followLink.innerText = "@wagnermattei";
    followLink.style = `
        color: blue;
        font-size: 10pt;
        text-decoration: underline;
        padding: 10px
    `;
    modal.append(followLink);
}
