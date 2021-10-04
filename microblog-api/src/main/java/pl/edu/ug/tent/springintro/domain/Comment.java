//package pl.edu.ug.tent.springintro.domain;
//
//import com.opencsv.bean.CsvBindByName;
//import com.opencsv.bean.CsvBindByPosition;
//import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.stereotype.Component;
//
//import javax.validation.constraints.*;
//
//@Component("comment")
//@Data
//public class Comment {
//
//    @CsvBindByName(column = "id")
//    @Getter
//    @Setter
//    @CsvBindByPosition(position=0)
//    private int id;
//
//    @NotNull
//    @CsvBindByName(column = "username")
//    @Getter
//    @Setter
//    @CsvBindByPosition(position=1)
//    private String username;
//
//    @NotNull
//    @CsvBindByName(column = "id_post")
//    @Getter
//    @Setter
//    @CsvBindByPosition(position=2)
//    private int postId;
//
//    @NotNull
//    @CsvBindByName(column = "comment_content")
//    @Getter
//    @Setter
//    @CsvBindByPosition(position=3)
//    private String content;
//
//
//}
//
//
