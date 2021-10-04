package pl.edu.ug.tent.springintro.domain;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name="authorseq", initialValue=1, allocationSize=100)
public class Author {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="authorseq")
    private int id;
    @Column(unique=true)
    private String mail;
    private String password;
    private String role;

    @JsonIgnoreProperties("authors")
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "Author_Posts", joinColumns = @JoinColumn(name = "author_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    @Valid
    private List<Post> posts;


}


