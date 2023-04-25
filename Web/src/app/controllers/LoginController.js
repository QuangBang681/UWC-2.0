const backofficer = require('../models/back_officer');

class LoginController {
    index(req, res) {
        res.render('login', {
            layout: 'userAuth'
        });
    }

    verify(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.render('login', {
                    no_user: true,
                    layout: 'userAuth'
                });
            }

            backofficer.findOne({
                username: username
            }).then((result) => {
                if (result && password === result.password) {
                    return res.redirect('task');
                }                 
                return res.render('login', {
                    no_user: true,
                    layout: 'userAuth'
                });
            });

        }
        catch (error) {
            // res.send("Invalid information");
        }
    }
}

module.exports = new LoginController;