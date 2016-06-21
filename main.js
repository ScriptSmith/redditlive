function getRandomColor() { // http://stackoverflow.com/a/1484514
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$( document ).ready(function() {
    Chart.defaults.global.responsive = true;
    var graphData = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    }
    var myBarChart
    var options = {
        responsive: true,
        legend: {
            display: false
        },
        animation: {
            duration: 0
        },
        title: {
            display: true,
            text: 'Subreddits'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

    var IDs = []

    setInterval(function(){$.getJSON( "https://www.reddit.com/new.json", function( data ) {
        posts = data["data"]['children']
        for(var i in posts){
            var subreddit = posts[i]["data"]["subreddit"]
            var id = posts[i]["data"]["id"]

            var subredditIndex = graphData.labels.indexOf(subreddit)

            if(IDs.indexOf(id) == -1){
                IDs.push(id)

                if (subredditIndex == -1){
                    graphData["labels"].push(subreddit)
                    graphData["datasets"][0]["data"].push(1)
                    graphData["datasets"][0]["backgroundColor"].push(getRandomColor())
                } else {
                    graphData["datasets"][0]["data"][subredditIndex]++
                }
            }
        }

        var ctx = $("#myChart")
        if (!(ctx.is(":hover"))) {
            myBarChart = new Chart(ctx, {
                type: 'bar',
                data: graphData,
                options: options
            });
        }
    })},5000);
});
