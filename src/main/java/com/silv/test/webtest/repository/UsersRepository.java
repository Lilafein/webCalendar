package com.silv.test.webtest.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.silv.test.webtest.auth.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Users findByUserName(String userName);

}

