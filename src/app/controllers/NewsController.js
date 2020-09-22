class NewController{

    //GET  /news
    index(req, res, next){
        res.render('news')
    }

    //GET  /news/:slug
    show(req, res){
        res.send("News Details !")
    }
}

module.exports = new NewController();
