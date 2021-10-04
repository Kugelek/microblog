package pl.edu.ug.tent.springintro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SpringintroApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(SpringintroApplication.class, args);

	}

}
