const router = require("express").Router();
let Response = require("../../models/response.model");

router.route("/record").post((req, res) => { 
    const questions = []
    const responses = []
    const survey = req.body.survey
    
    for (var question in survey) {
        questions.push(question)
        responses.push(survey[question])
    }
   
    const newResponse = new Response({
        responses,
        questions
    });

    newResponse
    .save()
        .then(() => res.json("Responses saved"))
        .catch(err => res.status(400).json("Error: " + err));
});


router.route("/").get((req, res) => {
    Response.find({})
        .then(responses => res.json(responses))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
