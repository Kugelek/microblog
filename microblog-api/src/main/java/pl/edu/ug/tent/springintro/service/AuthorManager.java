package pl.edu.ug.tent.springintro.service;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.tent.springintro.domain.Author;

import java.util.List;

public interface AuthorManager extends JpaRepository<Author, Integer > {

    List<Author> findAll();
    Author findByMail(String mail);
    Author findById(int id);



}
