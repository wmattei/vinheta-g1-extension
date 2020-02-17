chrome.runtime.onInstalled.addListener(function() {
    setInterval(() => {
        fetch("https://g1-vinheta-api.herokuapp.com/tweet").then(res => {
            res.json().then(tweet => {
                chrome.storage.sync.get(["lastTweetId"], function(result) {
                    if (tweet.id !== result.lastTweetId) {
                        startVideo(tweet);
                        chrome.storage.sync.set({ lastTweetId: tweet.id });
                    }
                });
            });
        });
    }, 10000);
});

function startVideo(tweet) {
    chrome.tabs.getSelected(null, function(tab) {
        if (tab.id > 0) {
            console.log('Send tweet to tab', tab);
            chrome.tabs.sendMessage(tab.id, { tweet }, function(response) {
                // ...
            });
        }
    });
}
