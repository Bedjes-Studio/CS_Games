const Challenge = require("../models/challenge");
const ChallengeWin = require("../models/challengeWin");
const HintUsed = require("../models/hintUsed");
const Hint = require("../models/hint");
const User = require("../models/user");

exports.check = (req, res, next) => {
    Challenge.findOne({ challengeId: req.body.challengeId })
        .then((challenge) => {
            if (!challenge) {
                return res.status(401).json({ message: "Challenge non trouvé !", flagged: false });
            }

            if (challenge.flag == req.body.flag) {
                computeScore(req.auth.username, challenge.challengeId, challenge.flagValue)
                    .then((points) => updateScores(req.auth.username, points))
                    .then(() => updateFlaggedList(req.auth.username, challenge.challengeId))
                    .then(() => res.status(200).json({ message: "C'est le bon flag !", flagged: true }))
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error, flagged: false });
                    });
            } else {
                res.status(200).json({ message: "Ce n'est pas le bon flag !", flagged: false });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const computeScore = function (username, challengeId, initialValue) {
    return new Promise(function (resolve, reject) {
        HintUsed.find({ username: username, challengeId: challengeId }).then((hintUsed) => {
            if (!hintUsed) {
                resolve(initialValue);
            } else {
                resolve(initialValue - initialValue * 0.15 * hintUsed.length);
            }
        });
    });
};

const updateScores = function (username, points) {
    return new Promise(function (resolve, reject) {
        console.log("points : " + points);

        User.updateOne({ username: username }, { $inc: { score: points } })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    });
};

const updateFlaggedList = function (username, challengeId) {
    return new Promise(function (resolve, reject) {
        const challengeWin = new ChallengeWin({
            username: username,
            challengeId: challengeId,
        });

        challengeWin
            .save()
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error });
            });
    });
};

exports.scores = (req, res, next) => {
    computeRanking()
        .then((ranking) => {
            res.status(200).json({ ranking });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

const computeRanking = function (username, challengeId) {
    return new Promise(function (resolve, reject) {
        User.find()
            .sort({ score: -1 })
            .then((users) => {
                ranking = [];
                users.forEach((user) => {
                    ranking.push({ Équipe: user.username, Score: user.score });
                });
                resolve(ranking);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.computeRanking = computeRanking;

exports.challenges = (req, res, next) => {
    Challenge.find()
        .then((challenges) => {
            HintUsed.find({ username: req.auth.username }).then((hintUsed) => {
                console.log(hintUsed);
                hintUsedIds = [];
                hintUsed.forEach((hint) => {
                    hintUsedIds.push(hint.hintId);
                });

                Hint.find({ hintId: { $in: hintUsedIds } }).then((hints) => {
                    console.log(hints);
                    results = [];
                    challenges.forEach((challenge) => {
                        chall = { name: challenge.name, description: challenge.description, flagValue: challenge.flagValue };
                        hint = [];

                        challenge.hintId.forEach((hintId) => {
                            // search if int is used and add it
                            if (hintUsedIds.includes(hintId)) {
                                h = getHintFromId(hintId, hints);
                                hint.push({ hintId: hintId, description: h.description });
                            } else {
                                hint.push({ hintId: hintId, description: "" });
                            }
                        });
                        results.push({ challenge: chall, hint: hint });
                    });
                    res.status(200).json({ results });
                });
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

function getHintFromId(hintId, hints) {
    for (const hint of hints) {
        if (hint.hintId == hintId) {
            return hint;
        }
    }
    return undefined;
}
