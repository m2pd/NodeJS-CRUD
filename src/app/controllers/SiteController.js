const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../ultil/mongoose')


class SiteController{

    //GET  /
    index(req, res, next){
        Course.find({})
        .then(courses => {
            res.render('home', {
                courses: multipleMongooseToObject(courses)
            })
        }).catch(next)
    }

    //GET  /search
    search(req, res){
        res.render('search')
    }
}

module.exports = new SiteController();
