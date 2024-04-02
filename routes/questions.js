const questionsRoutes = (app, fs) => {
  const questionsDataPath = "./data/questions.json";
  const userDataPath = "'./data/userProfiles.json";

  // READ
  app.get("/questions/list/:type", (req, res) => {
    fs.readFile(questionsDataPath, "utf8", (error, data) => {
      if (error) {
        throw error;
      }
      if (req && req.params && req.params.type) {
        let localData = JSON.parse(data);
        if (localData[req.params.type]) {
          res.send({ success: true, data: localData[req.params.type] });
        } else {
          res.send({ success: false, error: "no questions available" });
        }
      } else {
        res.send({ success: false, error: "No type given" });
      }
    });
  });

  app.post("/questions/list/user/:type", (req, res) => {
    fs.readFile(userDataPath, "utf8", (error, userData) => {
      if (error) {
        throw error;
      }
      if ((req, req.body, req.body.memberId)) {
        let localUserData = JSON.parse(userData);
        if (localUserData[req.body.memberId]) {
          if (req.params && req.params.type) {
            fs.readFile(questionsDataPath, "utf8", (error, questionData) => {
              if (error) {
                throw error;
              }
              let localQuestionData = JSON.parse(questionData);
              if (localQuestionData[req.params.type]) {
                const updatedQuestionData = localQuestionData[
                  req.params.type
                ].map((question) => {
                  const updatedQuestion = localUserData[req.body.memberId][
                    req.params.type
                  ].includes(question.id)
                    ? { ...question, complete: true }
                    : question;
                  return updatedQuestion;
                });
                res.send({ success: true, data: updatedQuestionData });
              } else {
                res.send({ success: false, error: "No questions available" });
              }
            });
          } else {
            res.send({ success: false, error: "No type given" });
          }
        } else {
          res.send({ success: false, error: "Cannot find user" });
        }
      } else {
        res.send({ success: false, error: "No user found" });
      }
    });
  });
};

module.exports = questionsRoutes;
