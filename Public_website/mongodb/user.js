const bcrypt = require("bcrypt");
const User = require("../models/user");
const { extractIds } = require("./utils");

const users = [
    { ip: "127.0.0.1", school: "test", username: "aaa", password: "aaa", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "Université Laval", username: "Rouge", password: "3g}yd$88Ug!U2B", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "Université Laval", username: "et Or", password: "98_T6d.e8xn-FW", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "ÉTS", username: "AéronÉTS", password: "kY3c/9Qmw%36?W", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "ÉTS", username: "SubwÉTS", password: "5;R79P:Kfih@7t", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UdeM", username: "Les Pigeonniers", password: "(4#8PF)myV3b7s", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UdeM", username: "Les Pompistes", password: "],*8SacdYi494M", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UQAM", username: "Null Pointer Collective", password: "d{29XgTK8[2w*a", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UQAM", username: "UQAMinati", password: "{B!Sf#286mi7pK", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UdeS", username: "Hydro Sherbrooke", password: "YS]r,2u9@xZw56", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UdeS", username: "Explorers of the C", password: "5%zhvXHe)4L(72", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "Polytechnique", username: "Polys(t)yrène A", password: "Au[4q5-.8AEza3", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "Polytechnique", username: "Polys(t)yrène B", password: "Wh6*;T39Nqs4z,", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "University of Windsor", username: "Loop Troops", password: "4YDX4}k%9xtv)7", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "University of Windsor", username: "CTRL-ALT-ELITES", password: "ay4?$uQ75_D2Ar", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UQAC", username: "Shutdown /r", password: ":N#5j5@5DiHck3", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "UQAC", username: "Cyber submerged", password: "S/m5tL3M5(f!9v", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "Concordia University", username: "Code-Blooded Concordia", password: "v297{J7kYN{]yk", score: 0, challengesWinId: [], hintUsedId: [] },
    { ip: "127.0.0.1", school: "McGill", username: "McKrill", password: "iHrb62b4R2W.-(", score: 0, challengesWinId: [], hintUsedId: [] },
];

exports.userFiller = () => {
    users.forEach((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    return User.insertMany(users)
        .then((data) => {
            console.log("- Users created");
            return extractIds(data);
        })
        .catch((error) => {
            console.log("unable to create users");
            console.log(error);
            process.exit(1);
        });
};
