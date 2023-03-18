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
                ChallengeWin.findOne({ challengeId: req.body.challengeId, username: req.auth.username }).then((everFlagged) => {
                    if (!everFlagged) {
                        computeScore(req.auth.username, challenge.challengeId, challenge.flagValue)
                            .then((points) => updateScores(req.auth.username, points))
                            .then(() => updateFlaggedList(req.auth.username, challenge.challengeId))
                            .then(() => {
                                res.status(200).json({ message: "C'est le bon flag !", flagged: true });
                            })
                            .catch((error) => {
                                console.log(error);
                                res.status(500).json({ error, flagged: false });
                            });
                    } else {
                        res.status(200).json({ message: "Flag déjà utilisé", flagged: true });
                    }
                });
            } else {
                res.status(200).json({ message: "Ce n'est pas le bon flag !", flagged: false });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
};

const computeScore = function (username, challengeId, initialValue) {
    return new Promise(function (resolve, reject) {
        HintUsed.find({ username: username, challengeId: challengeId })
            .then((hintUsed) => {
                if (!hintUsed) {
                    resolve(initialValue);
                } else {
                    resolve(initialValue - initialValue * 0.25 * hintUsed.length);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const updateScores = function (username, points) {
    return new Promise(function (resolve, reject) {
        User.updateOne({ username: username }, { $inc: { score: points } })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
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
                reject(error);
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

const computeChallenges = function (req, res, next) {
    return new Promise(function (resolve, reject) {
        Challenge.find()
            .then((challenges) => {
                HintUsed.find({ username: req.auth.username }).then((hintUsed) => {
                    hintUsedIds = [];
                    hintUsed.forEach((hint) => {
                        hintUsedIds.push(hint.hintId);
                    });
                    Hint.find({ hintId: { $in: hintUsedIds } }).then((hints) => {
                        ChallengeWin.find({ username: req.auth.username }).then((challengeWin) => {
                            results = [];
                            challenges.forEach((challenge) => {
                                flagged = false;

                                if (isFlagged(challengeWin, challenge.challengeId)) {
                                    flagged = true;
                                }
                                chall = {
                                    name: challenge.name,
                                    challengeId: challenge.challengeId,
                                    description: challenge.description,
                                    flagValue: challenge.flagValue,
                                    flagged: flagged,
                                };
                                hint = [];

                                challenge.hintId.forEach((hintId) => {
                                    // search if int is used and add it
                                    if (hintUsedIds.includes(hintId)) {
                                        h = getHintFromId(hintId, hints);
                                        hint.push({ hintId: hintId, used: true, description: h.description });
                                    } else {
                                        hint.push({ hintId: hintId, used: false, description: "" });
                                    }
                                });
                                results.push({ challenge: chall, hint: hint });
                            });
                            resolve(results);
                        });
                    });
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.computeChallenges = computeChallenges;

exports.challenges = (req, res, next) => {
    computeChallenges(req, res, next)
        .then((results) => {
            res.status(200).json({ results });
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

function isFlagged(challengeWin, challengeId) {
    for (const challenge of challengeWin) {
        if (challenge.challengeId == challengeId) {
            return true;
        }
    }
    return false;
}

exports.useHint = (req, res, next) => {
    HintUsed.find({ hintId: req.params.id, username: req.auth.username }).then((hintUsed) => {
        if (hintUsed.length == 0) {

            Hint.find({ hintId: req.params.id }).then((hint) => {
                if (!hint) {
                    return res.status(401).json({ message: "Indice non trouvé !" });
                }
            });

            const hintUsed = new HintUsed({
                username: req.auth.username,
                challengeId: req.params.id.slice(0, -2),
                hintId: req.params.id,
            });

            hintUsed
                .save()
                .then(() => {
                    res.redirect("/challenges");
                })
                .catch((error) => {
                    res.status(400).json({
                        error: error,
                    });
                });
        } else {
            res.redirect("/challenges");
        }
    });
};
