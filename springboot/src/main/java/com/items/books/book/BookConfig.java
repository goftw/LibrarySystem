package com.items.books.book;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookConfig {

    @Bean
    CommandLineRunner commandLineRunner(BookRepository repository){
        return args ->{
            if (repository.count() == 0){
                Book b0 =  new Book(
                "仙", 
                100, 
                LocalDate.of(2000, Month.JANUARY, 1),
                "1"
                );    

                Book b1 =  new Book(
                "子", 
                10, 
                LocalDate.of(2000, Month.JANUARY, 1 ),
                "2"
                );

                repository.saveAll(
                    List.of(b0, b1)
                );
            }
        };
    }
}
