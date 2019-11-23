
const updateState = (tab) => {
    chrome.storage.sync.get('hosts', ({ hosts }) => {

        // chrome.tabs.get(tabs.tabIds[0], (tab)=>{
            let tabHost = tab.url.split('/')[2];
            if (tabHost ==='newtab') return;

            if(tabHost.indexOf('www.') === 0) tabHost = tabHost.slice(4);

            const host = hosts.filter(({url}) => url === tabHost);

            if(host.length === 0) {
                hosts.push({ url: tabHost, times: 1 });
                chrome.storage.sync.set({ hosts, }, function() {
                    console.log('Value is set to up');
                });  
            } else {
                
                const newHosts = hosts.map(({url, times}, index) => {
                    if(url === host[0].url) {
                        return { url, times: times + 1 };
                    }
                    return { url, times, };
                });
                chrome.storage.sync.set({ hosts: newHosts, }, function() {
                    console.log('Value is set to down');
                });
            }
        })

    // });
}

chrome.storage.sync.set({ hosts: [] }, function(res) {
    console.log('Value is set to default', res);
}); 

// let history;
chrome.tabs.onHighlighted.addListener((tabs)=> {
    chrome.tabs.get(tabs.tabIds[0], (tab)=>{
          updateState(tab);  
    })

});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        updateState(tab);
    }
})


