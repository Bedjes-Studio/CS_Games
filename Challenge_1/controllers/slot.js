exports.play = (req, res, next) => {
    if (req.params.id == "6497542625") {
        res.status(200).json({
            winner: true,
            flag: "flag{WP_D@ny!}",
        });
    } else {
        res.status(200).json({
            winner: false,
        });
    }
};
