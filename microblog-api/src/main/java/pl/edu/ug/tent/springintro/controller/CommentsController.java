//package pl.edu.ug.tent.springintro.controller;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import pl.edu.ug.tent.springintro.domain.Comment;
//import pl.edu.ug.tent.springintro.service.Comment.CommentManager;
//
//import java.util.List;
//
//@RestController
//public class CommentsController {
//
//    private CommentManager cm;
//
//
//    @Autowired
//    public CommentsController(CommentManager cm) {
//        this.cm = cm;
//    }
//
//
//    @GetMapping("/api/comments")
//    public List<Comment> getComments() {
//        return cm.getAllComments();
//    }
//
//
//    @GetMapping("/api/comments/posts/{id}")
//    public List<Comment> getCommentsOfPost(@PathVariable String id) {
//        return cm.getCommentsOfCertainPost(id);
//    }
//
//    @PostMapping("/api/comments/posts/{id}")
//    Comment addComment(@RequestBody Comment comment, @PathVariable String id) {
//        Comment commentToAdd = new Comment();
//        commentToAdd.setContent(comment.getContent());
//        commentToAdd.setUsername(comment.getUsername());
//        commentToAdd.setPostId(Integer.parseInt(id));
//        cm.add(commentToAdd);
//        return commentToAdd;
//    }
//
//
//
//    @PutMapping("/api/comments/{id}")
//    Comment updateComment(@RequestBody Comment comment, @PathVariable String id) {
//        Comment newComment = new Comment();
//        newComment.setContent(comment.getContent());
//        return cm.update(newComment, id);
//    }
//
//    @DeleteMapping("/api/comments/{id}")
//    void deleteComment(@PathVariable String id) {
//        cm.remove(id);
//    }
//
//}
