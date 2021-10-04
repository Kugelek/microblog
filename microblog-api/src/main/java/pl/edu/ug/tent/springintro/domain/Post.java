package pl.edu.ug.tent.springintro.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;


import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
//@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name="seq", initialValue=1, allocationSize=100)
public class Post {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private int id;
    private String postContent;
    private String postRichContent;
    private String postTitle;

    @JsonIgnoreProperties("posts")
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "Author_Posts", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    @Valid
    private List<Author> authors;

//    @OneToMany(cascade = {CascadeType.PERSIST}, fetch =FetchType.EAGER)
//    private Set<Tag> tags = new HashSet<Tag>();

    @JsonIgnoreProperties("posts")
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "Tag_Posts", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @Valid
    private Set<Tag> tags = new HashSet<Tag>();


}


