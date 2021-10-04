package pl.edu.ug.tent.springintro.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.ug.tent.springintro.domain.Author;
import pl.edu.ug.tent.springintro.service.AuthorManager;

import java.util.List;

@RestController
public class AuthorController {

    private AuthorManager am;


    @Autowired
    public AuthorController(AuthorManager am) {
        this.am = am;
    }


    @GetMapping("/api/authors")
    public List<Author> getAuthors() {
        return am.findAll();
    }

    @PostMapping("/api/register")
    Author addAuthor(@RequestBody Author author) {
        Author registeredAuthor = new Author();
        registeredAuthor.setMail(author.getMail());
        registeredAuthor.setPassword(author.getPassword());
        registeredAuthor.setRole("user");
        am.save(registeredAuthor);
        return registeredAuthor;
    }

    @PostMapping("/api/register/admin")
    Author addAuthorAdmin(@RequestBody Author author) {
        Author registeredAuthor = new Author();
        registeredAuthor.setMail(author.getMail());
        registeredAuthor.setPassword(author.getPassword());
        registeredAuthor.setRole("admin");
        am.save(registeredAuthor);
        return registeredAuthor;
    }

    @PostMapping("/api/login")
    Author login(@RequestBody Author author) {
        Author foundAuthor = am.findByMail(author.getMail());
        if(foundAuthor.getPassword().equals(author.getPassword())){
            return foundAuthor;
        }else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Author Not Found");
        }

    }

}
