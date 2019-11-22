// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning red!',);

    // chrome.tabs.executeScript({
    //   code: 'document.body.style.backgroundColor="white"'
    // });

    // chrome.storage.sync.get('hosts', ({ hosts }) => {

});

// chrome.tabs.get(tabId, () => {

// });

// while (true) {
    // setTimeout(()=>{
    //     chrome.tabs.getCurrent((tab) => {
    //         console.log('111111');
    //         console.log('>>>>>>>>', tab);
    //         // chrome.tabs.get(tabId, () => {
        
    //         // });
    //     })
    // }, 2000);
// }

// var inFocus = true;  // global boolean to keep track of state
// chrome.windows.onFocusChanged.addListener(function(window) {
//     if (window == chrome.windows.WINDOW_ID_NONE) {
//         console.log('>>>>>>>> false', window)
//         inFocus = false;
//     } else {
        
//         inFocus = true;

//         chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//             chrome.tabs.get(tabs[0].id, (tab)=>{
//                 console.log('url',tab.url);
//             })
//         });
//     }
// });
chrome.storage.sync.set({ hosts: [] }, function(res) {
    console.log('Value is set to default', res);
}); 

let history;
chrome.tabs.onHighlighted.addListener((tabs)=> {
    chrome.storage.sync.get('hosts', ({ hosts }) => {

        if(history) {
            const fn = () => {
                const host = hosts.filter(({url}) => url === history.url);

                if(host.length === 0) {
                    hosts.push({ url: history.url, time: new Date().getTime() - history.time });
                    chrome.storage.sync.set({ hosts, }, function() {
                        console.log('Value is set to up');
                    });  
                } else {
                    if(history.time)
                    host[0].time = host[0].time + (new Date().getTime() - history.time);
                    for(let i = 0; i < hosts.lenght; i++) {
                        if(hosts[i] === host[0].url) hosts[i] = host[0];
                    }
                    chrome.storage.local.set({ hosts, }, function() {
                        console.log('Value is set to down');
                    });
                }
            }
            setInterval(fn(), 1000);
        }

        chrome.tabs.get(tabs.tabIds[0], (tab)=>{
            const tabHost = tab.url.split('/')[2];
            history = { url:  tabHost, time: new Date().getTime() };
        })

    });
});


