const Course = require('../models/Course')
const { mongooseToObject } = require('../../ultil/mongoose')

class CourseController{

    //GET  /courses/:slug
    show(req, res, next){
        const slug = req.params.slug;

        Course.findOne({ slug: slug})
        .then(course => {
            res.render('courses/course', { course : mongooseToObject(course)})
        })
        .catch(next)
    }

    //GET  /courses/create
    create(req, res, next){
        res.render('courses/create')
    }

    //POST  /courses/store
    store(req, res, next){
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            })
    }

    //GET  /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
        
    }

    //PUT  /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //PATCH  /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //DELETE  /courses/:id
    destroy(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //DELETE  /courses/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //POST  /courses/handle-form-action
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: { $in : req.body.coursesIds } })
                .then(() => res.redirect('back'))
                .catch(next)
                    break;
            default:
                res.json({message: 'Action is invalid!'})
        }

    }
}

module.exports = new CourseController;