// models/todo.js
var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

export default Todo;

or

var posts = [{
  id: '1'
}, {
  id: '2'
}];

export default posts;

// app/routes/posts.js   import it manually
import posts from 'appkit/models/posts';

var PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

export default PostsRoute;
