package com.kanban.corpflow.repositories;

import com.kanban.corpflow.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
