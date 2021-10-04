package pl.edu.ug.tent.springintro.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.ug.tent.springintro.domain.Tag;
import pl.edu.ug.tent.springintro.service.TagManager;

import java.util.List;

@RestController
public class TagController {

    private TagManager tm;


    @Autowired
    public TagController(TagManager tm) {
        this.tm = tm;
    }


    @GetMapping("/api/tags")
    public List<Tag> getTags() {
        return tm.findAll();
    }



}
