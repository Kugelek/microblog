package pl.edu.ug.tent.springintro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.tent.springintro.domain.Author;
import pl.edu.ug.tent.springintro.domain.Post;
import pl.edu.ug.tent.springintro.domain.Tag;
import pl.edu.ug.tent.springintro.service.AuthorManager;
import pl.edu.ug.tent.springintro.service.Post.PostManager;
import pl.edu.ug.tent.springintro.service.TagManager;

import java.util.*;

@RestController
public class PostController {

    private PostManager pm;
    private AuthorManager am;
    private TagManager tm;

    @Autowired
    public PostController(PostManager pm, AuthorManager am, TagManager tm) {
        this.pm = pm;
        this.am = am;
        this.tm = tm;
    }



    @GetMapping("/api/posts")
    public List<Post> getPosts() {
        System.out.println(pm.findAll());
        return pm.findAll();
    }



    @PostMapping("/api/posts")
    Post addPost(@RequestBody Post post ) {
       // System.out.println(json.get("auth"));
        Post postToAdd = new Post();
        postToAdd.setPostContent(post.getPostContent());
        postToAdd.setPostRichContent(post.getPostRichContent());
        postToAdd.setPostTitle(post.getPostTitle());

        Set<Tag> tags = new HashSet<>();
        for(Tag tag : post.getTags()){
            Tag foundtag = tm.findByTagName(tag.getTagName());
            if(foundtag == null){
                Tag newTag = new Tag();
                newTag.setTagName(tag.getTagName());
                tm.save(newTag);
                tags.add(newTag);
            }else{
                tags.add(foundtag);
            }
            System.out.println("CZY NULL "+ foundtag);

        }


        List<Author> authors = new ArrayList<Author>();

        for (Author currAuthor: post.getAuthors()) {
            Author foundAuthor  = am.findByMail(currAuthor.getMail());
            if(foundAuthor != null)
                authors.add(foundAuthor);
        }
        postToAdd.setTags(tags);
        postToAdd.setAuthors(authors);
        pm.save(postToAdd);

        return postToAdd;
    }

    @GetMapping("/api/posts/{id}")
    Post getPost(@PathVariable String id) {
        int convertedId = Integer.parseInt(id);
        return pm.findById(convertedId);
    }

    @GetMapping("/api/posts/user/{mail}")
    List<Post> getPostsOfUser(@PathVariable String mail) {
        Author author = am.findByMail(mail);
        System.out.println("TESTUJEEEEMY  "+ mail);
        System.out.println("TESTUJEEEEMY  "+ author.getMail());
       // return pm.findByAuthor(author);
        List<Post> allPosts = pm.findAll();
        List<Post> postsOfUser = new ArrayList<>();

        for (Post currPost: allPosts) {

            for (Author currPostAuthor: currPost.getAuthors()){
                if(currPostAuthor != null
                        && currPostAuthor.getMail() != null
                        && currPostAuthor.getMail().equals(author.getMail()))
                    postsOfUser.add(currPost);
            }
        }

        return postsOfUser;
    }

    @PatchMapping("/api/posts/{id}")
    Post updatePost(@RequestBody Post post, @PathVariable String id) {
        int convertedId = Integer.parseInt(id);
        Post newPost = pm.findById(convertedId);
        newPost.setPostContent(post.getPostContent());
       // newPost.setTagsConcatenated(post.getTagsConcatenated());
        newPost.setPostRichContent(post.getPostRichContent());
        newPost.setPostTitle(post.getPostTitle());
       // newPost.setAuthors(post.getAuthors());
        Set<Tag> tags = new HashSet<>();
        for(Tag tag : post.getTags()){
            Tag foundtag = tm.findByTagName(tag.getTagName());
            if(foundtag == null){
                Tag newTag = new Tag();
                newTag.setTagName(tag.getTagName());
                tm.save(newTag);
                tags.add(newTag);
            }else{
                tags.add(foundtag);
            }
            System.out.println("CZY NULL "+ foundtag);

        }
        newPost.setTags(tags);
        return pm.save(newPost);
    }

    @DeleteMapping("/api/posts/{id}")
    void deletePost(@PathVariable String id) {
        int convertedId = Integer.parseInt(id);
        Post currPost = pm.findById(convertedId);

        pm.deleteById(convertedId);
    }




}
