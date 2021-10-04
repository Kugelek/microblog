package pl.edu.ug.tent.springintro.service;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.tent.springintro.domain.Tag;

import java.util.List;

public interface TagManager extends JpaRepository<Tag, Integer > {

    List<Tag> findAll();
    Tag findByTagName(String tagName);
    Tag findById(int id);

}
