const path = require("path");
const Problem = require("../../models/problem");
const User = require("../../models/user");

const checkAcceptanceController = async (req, res) => {
    try {
        const problem=req.body.problem.data;
        const userOutput=req.body.userOutput;
        console.log(problem);
        if (userOutput === problem.output) {
            let addScore;
            if (problem.difficulty == "Easy") {
                addScore = 10;
            }
            else if (problem.difficulty == "Medium") {
                addScore = 20;
            }
            else {
                addScore = 40;
            }
            const user = await User.findById(req.userId);
            if (!user.solvedProblems.includes(problem._id)) {
                user.solvedProblems.push(problem._id);
                user.score += addScore;
                await user.save();
            }
            return res.status(200).json("All Test Case Passed");
        }
        else {
            return res.status(200).json("Failing in Hidden Test Case");
        }

        return res.status(200).json(codeFilePath);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = checkAcceptanceController;