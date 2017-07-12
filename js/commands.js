const request = require('request');

module.exports = {
    // Get JSON object from url
    requestJSON(url, success, failure) {
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                return success(JSON.parse(body));
            }
            if (failure) {
                return failure(error);
            }
        });
    },
    // Get world record info using the speedrun.com API
    getWR(args, callback) {
        // Pretty much do what Mikkayla does for this whole function
        let game = encodeURIComponent(args[1]);
        let category = 'any';
        if (args[2] !== undefined) {
            // Get category in SRC's URI component form, ex: "any% no rba/ww" -> "any_no_rbaww"
            category = args.splice(2).join('_').replace(/[^A-Za-z0-9_]/g, '');
        }
        this.requestJSON(
            `http://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?top=1`,
            data => {
                let run = data.data.runs[0].run;
                this.requestJSON(
                    run.players[0].uri,
                    d => {
                        // get time string. this is really shitty but idc
                        let h = '0';
                        let m = '00';
                        let s = '00';
                        let x = '';
                        let y = run.times.primary;
                        for (let i = 2; i < y.length; i++) {
                            switch (y[i]) {
                                case 'H':
                                    h = x;
                                    x = '';
                                    break;
                                case 'M':
                                    if (x.length < 2) {
                                        x = '0' + x;
                                    }
                                    m = x;
                                    x = '';
                                    break;
                                case 'S':
                                    if (x.length < 2) {
                                        x = '0' + x;
                                    }
                                    s = x;
                                    x = '';
                                    break;
                                default:
                                    x += y[i];
                                    break;
                            }
                        }
                        let names = d.data.names;
                        let runner = names.international + (names.japanese ? ' (' + names.japanese + ')' : '');
                        callback(null, `${h}:${m}:${s} by ${runner} on ${run.date}\n${data.data.weblink}`);
                    }
                );
            },
            data => {
                callback(null, '!wr <game> <category> ... '
                    + '<game> and <category> use the (case-sensitive) abbreviations on https://speedrun.com');
            }
        );
    }
};
