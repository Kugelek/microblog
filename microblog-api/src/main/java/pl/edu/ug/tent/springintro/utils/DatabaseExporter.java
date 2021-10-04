package pl.edu.ug.tent.springintro.utils;

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class DatabaseExporter{

    public <T> void exportEntityToCsv(String outputPath, Class<T> classTemp, List<T> beansList) throws IOException, CsvDataTypeMismatchException, CsvRequiredFieldEmptyException, ClassNotFoundException, InstantiationException, IllegalAccessException {

        try (Writer writer = Files.newBufferedWriter(Paths.get(outputPath));) {
            MapBeansByColumnPosition<T> mappingStrategy = new MapBeansByColumnPosition<T>();
            mappingStrategy.setType(classTemp);

            StatefulBeanToCsv<T> beanToCsv = new StatefulBeanToCsvBuilder<T>(writer)
                    .withMappingStrategy(mappingStrategy)
                    .build();

            beanToCsv.write(beansList);
        }

    }

}
