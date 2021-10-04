package pl.edu.ug.tent.springintro.service.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.tent.springintro.domain.Author;
import pl.edu.ug.tent.springintro.domain.Post;

import java.util.List;

public interface PostManager extends JpaRepository<Post, Integer > {

    List<Post> findAll();
    Post findById(int id);
   // List<Post> findByAuthor(Author author);

}
