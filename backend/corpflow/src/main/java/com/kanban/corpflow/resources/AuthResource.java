package com.kanban.corpflow.resources;

import com.kanban.corpflow.entities.User;
import com.kanban.corpflow.entities.dtos.LoginRequestDTO;
import com.kanban.corpflow.entities.dtos.TokenResponseDTO;
import com.kanban.corpflow.entities.dtos.RegisterRequestDTO;
import com.kanban.corpflow.infra.security.TokenService;
import com.kanban.corpflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/auth")
public class AuthResource {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    @PostMapping(value = "/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody LoginRequestDTO body) {
        User user = this.userRepository.findByEmail(body.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok().body(new TokenResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(value = "/register")
    public ResponseEntity<TokenResponseDTO> register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.userRepository.findByEmail(body.getEmail());
        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.getPassword()));
            newUser.setEmail(body.getEmail());
            newUser.setName(body.getName());
            this.userRepository.save(newUser);
            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok().body(new TokenResponseDTO(newUser.getName(), token));
        }

        return ResponseEntity.badRequest().build();
    }
}
