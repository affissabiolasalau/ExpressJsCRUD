const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');


router.get('/', (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.render('contact/list', {
                list: docs
            })
        } else {
            console.log("Error: " + err);
        }
    })
})

router.get('/add', (req, res) => {
    res.render('contact/add', {
        pageTitle: 'Add Contact'
    })
})

router.post('/add', (req, res) => {
    
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var contact = new Contact();
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.phone = req.body.phone;
    contact.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error: ' + err)
        }
    });
}

function updateRecord(req, res) {
    Contact.findOneAndUpdate({ _id: req.body._id },
        req.body,
        { new: true },
        (err, doc) => {
            if (!err) {
                res.redirect("/");
            } else {
                console.log("Error: " + err);
            }
        }
    );
}


router.get('/edit/:id', (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/edit", {
                pageTitle: "Edit Contact",
                contact: doc,
            });
            console.log(doc)
        }
    })
})

router.post('/editing/:id', (req, res) => {
    if (req.body._id != '') {
        updateRecord(req, res);
    }
});



router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error: ' + err);
        }
    })
})

router.get('/view/:id', (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/view", {
                pageTitle: "Contact",
                contact: doc,
            });
            console.log(doc)
        }
    })
})

module.exports = router