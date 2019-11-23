document.addEventListener('DOMContentLoaded', function () {
    // chrome.runtime.getBackgroundPage(function (bg) {
    //     // var myUrl = bg.myUrl;
    //     alert(bg.toString());
    // });
    chrome.storage.sync.get('hosts', ({ hosts }) => {
        
        let total = 0;
        hosts.forEach(({ times }) => {
            total += times;
        });
        hosts.sort((a, b) => b.times - a.times);
        hosts.slice(0, 10).map(({ url, times }) => {
            const percentage = times * 100 / total;
            document.getElementById("content-table").innerHTML += `
            <tr>
                <td>${url}</td>
                <td class="percentage">${Number(percentage).toFixed(2)}</td>
            </tr>
        `;

        })

        
    })
});