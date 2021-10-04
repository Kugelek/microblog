package pl.edu.ug.tent.springintro.utils;

import com.opencsv.bean.BeanField;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.apache.commons.lang3.StringUtils;

public class MapBeansByColumnPosition<T> extends ColumnPositionMappingStrategy<T> {

    @Override
    public String[] generateHeader(T bean) throws CsvRequiredFieldEmptyException {

        String[] headersAsPerFieldName = getFieldMap().generateHeader(bean);
        String[] header = new String[headersAsPerFieldName.length];

        for (int i = 0; i <= headersAsPerFieldName.length - 1; i++) {
            BeanField beanField = findField(i);
            String colHeader = extractHeaderName(beanField);
            if (colHeader.isEmpty())
                colHeader = headersAsPerFieldName[i];
            header[i] = colHeader;
        }

        headerIndex.initializeHeaderIndex(header);
        return header;
    }

    private String extractHeaderName(final BeanField beanField) {
        if (beanField == null
                || beanField.getField() == null
                || beanField.getField().getDeclaredAnnotationsByType(CsvBindByName.class).length == 0) {
            return StringUtils.EMPTY;
        }

        final CsvBindByName bindByNameAnnotation = beanField.getField().getDeclaredAnnotationsByType(CsvBindByName.class)[0];
        return bindByNameAnnotation.column();
    }
}