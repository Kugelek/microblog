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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
//@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name="tagseq", initialValue=1, allocationSize=100)
public class Tag {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="tagseq")
    private int id;
    @Column(unique=true)
    private String tagName;


    @JsonIgnoreProperties("tags")
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "Tag_Posts", joinColumns = @JoinColumn(name = "tag_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    @Valid
    private List<Post> posts;

}


