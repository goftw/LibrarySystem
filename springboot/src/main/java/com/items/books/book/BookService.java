package com.items.books.book;

import java.util.List;
import java.util.Objects;
import java.lang.IllegalStateException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.items.books.exception.BookNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class BookService {

    @Autowired // can be omitted
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    public void addBook(Book book) {
        Optional<Book> bookOptional = bookRepository.findByIsbn(book.getIsbn());
        if (bookOptional.isPresent()) {
            throw new IllegalStateException("isbn taken");
        }
        bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        boolean exists = bookRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("book with id " + id + " dees not exists");
        }
        bookRepository.deleteById(id);
    }

    @Transactional
    public void updateBook(Long id, String name, Integer price) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                "book with id " + id + " dees not exists"));

        if (name != null && name.length() > 0 && !Objects.equals(book.getName(), name)) {
            book.setName(name);
        }

        if (price != null && price > 0 && !Objects.equals(book.getPrice(), price)) {
            book.setPrice(price);
        }
    }
}
