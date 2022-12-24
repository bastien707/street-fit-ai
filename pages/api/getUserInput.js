let basePromptPrefix = "Could you generate a calisthenic workout based on the following parameters:\n My fitness level: ";

const getUserInput = (req, res) => {

    if (req.body.level === "beginner") {
        basePromptPrefix += "I'm a beginner, so I'm not very fit. Give me a workout that is easy in terms of difficulty and intensity.";
    }
    else if (req.body.level === "intermediate") {
        basePromptPrefix += "I'm an intermediate, so I'm moderately fit. Give me a workout that is challenging in terms of difficulty and intensity.";
    }
    else {
        basePromptPrefix += "I'm an advanced, so I'm very fit. Give me a workout that is difficult in terms of difficulty and intensity.";
    }

    basePromptPrefix += "\n My equipment: ";
    basePromptPrefix += req.body.equipment + ".\n My goals: ";
    basePromptPrefix += req.body.goals + ".\n";
    basePromptPrefix += "Your answer must be a list of exercises, with each exercise on a new line. And you can detail the number of reps and sets for each exercise. You must explain why you choose each exercise and why they are answering the goals given. Be like a coach you must give motivations ! \n\n";

    res.status(200).json({ output: basePromptPrefix });
};

export default getUserInput;
