package com.auth.mapper;

import com.auth.entity.User;
import com.auth.dto.RegisterRequest;
import com.auth.dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(RegisterRequest dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return user;
    }
    public UserResponse toResponsedto(User entity) {
        return new UserResponse(entity.getId(), entity.getUsername());
    }
}
