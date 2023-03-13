exports.play = (req, res, next) => {

    if (req.params.id == "win") {
        res.status(200).json({
            winner: true,
            flag: "flag{"
        });
    } else {
        res.status(200).json({
            winner: false,
        });
    }
};
