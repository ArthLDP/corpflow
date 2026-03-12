package com.kanban.corpflow.exceptions;

public class UserError extends RuntimeException {
    public UserError(String message) {
        super(message);
    }
}
