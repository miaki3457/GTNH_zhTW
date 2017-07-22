/**
 * Processes the conent and output Ans.
 * 
 * @param {*String} content the content sent by ajax
 * @param {*Boolean} option Set True if the language file should be sorted as linear style
 * @param {*Boolean} enUS Set True if you want to export the en_US.lang
 */
function process(content, option = true, enUS = false) {
    //console.log(content);
    var ans = "",
        format_questDatabase = "gtnh.quest#.name=&\ngtnh.quest#.desc=%\n",
        format_questLines = "gtnh.line#.name=&\ngtnh.line#.desc=%\n";
    data = JSON.parse(content);

    if (option) {
        ans += "#################################Quests#################################\n\n";
        for (var i in data.questDatabase) {
            (function (design) {
                var id = data.questDatabase[i].questID,
                    tmp = design.replace(/#/g, id)
                        .replace(/&/g, enUS == true ? data.questDatabase[i].name : "")
                        .replace(/%/g, enUS == true ? data.questDatabase[i].description.replace(/\n/g, "\\n") : "")

                ans += "#Quest_" + id + "." + data.questDatabase[i].name + "\n" + tmp + "\n";
                data.questDatabase[i].name = "gtnh.quest" + id + ".name";
                data.questDatabase[i].description = "gtnh.quest" + id + ".desc";
            })(format_questDatabase);
        }
        ans += "##################################Line##################################\n\n";
        for (var i in data.questLines) {
            (function (design) {
                var tmp = design.replace(/#/g, i)
                    .replace(/&/g, enUS == true ? data.questLines[i].name : "")
                    .replace(/%/g, enUS == true ? data.questLines[i].description.replace(/\n/g, "\\n") : "")

                ans += "#" + data.questLines[i].name + "\n" + tmp + "\n";
                data.questLines[i].name = "gtnh.line" + i + ".name";
                data.questLines[i].description = "gtnh.line" + i + ".desc";
            })(format_questLines);
        }
    }
    else {
        //
    }

    //console.log(ans);
    saveAs(new Blob([ans], { type: "text/plain;charset=utf-8" }), enUS == true ? "en_US.lang" : "result.lang");
    saveAs(new Blob([JSON.stringify(data, null, 4)], { type: "text/plain;charset=utf-8" }), "DefaultQuests.json");
}

var parse = function (option, enUS) {
    $.ajax({
        url: "https://raw.githubusercontent.com/miaki3457/GTNH_zhTW/fa9a009d325859b6eafadbf26434fddf3e75d092/betterquesting/DefaultQuests_version/Ver_1.5.0.5.txt",
        type: 'GET'
    }).success(function (gistData) {
        process(gistData, option, enUS);
    }).error(function (e) {
        console.error(e);
    });
}
