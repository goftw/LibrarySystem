package com.items.books.exception;

//Custom
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long id) {
        super("Could not found book with id " + id);
    }
}
