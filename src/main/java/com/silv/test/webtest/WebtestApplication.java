package com.silv.test.webtest;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.silv.test.webtest.auth.Users;
import com.silv.test.webtest.repository.UsersRepository;;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableJpaAuditing
public class WebtestApplication extends SpringBootServletInitializer {

	@Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UsersRepository usersRepository;

    @PostConstruct
    public void init(){
        Users user = new Users(
                "user",
                passwordEncoder.encode("password"));

        if (usersRepository.findByUserName(user.getUserName()) == null){
            usersRepository.save(user);
        }
    }
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebtestApplication.class);
    }
	public static void main(String[] args) {
		SpringApplication.run(WebtestApplication.class, args);
	}
}
