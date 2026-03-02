package com.kanban.corpflow.services;

import com.kanban.corpflow.entities.User;
import com.kanban.corpflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));
    }

    public User update(Long id, User user) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPassword());

        return userRepository.save(entity);
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        userRepository.delete(user);
    }
}
