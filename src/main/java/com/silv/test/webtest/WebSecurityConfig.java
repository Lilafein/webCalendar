package com.silv.test.webtest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.silv.test.webtest.service.UsersService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	private UsersService usersService;
    /*
	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/home","/users").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }
    */
	  @Autowired
	    private UsersService userService;

	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	    	http.csrf().disable();
	    	http
	                .authorizeRequests()
	                //.antMatchers(HttpMethod.POST,"/**").permitAll()
	                .anyRequest().authenticated()
	                .and()
	                   .httpBasic().authenticationEntryPoint(new AuthenticationEntryPoint() {
						
						@Override
						 public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx)
							      throws IOException, ServletException {
							        response.addHeader("WWW-Authenticate", "Basic realm=" +"silv Calendar");
							        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

							    }
					});
	    	http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
	                //.and()
	                
	                   // .sessionManagement()
	                     //   .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	        
	    }
	    
	   /* @Override
		public void configure(WebSecurity webSecurity) throws Exception {
	    	webSecurity
	                .ignoring()
	                .antMatchers("/**");
	                
	    }*/

	    @Bean
	    public BCryptPasswordEncoder passwordEncoder(){
	        return new BCryptPasswordEncoder();
	    }

	    @Bean
	    public DaoAuthenticationProvider authenticationProvider(){
	        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
	        auth.setUserDetailsService(userService);
	        auth.setPasswordEncoder(passwordEncoder());
	        return auth;
	    }

	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.authenticationProvider(authenticationProvider());
	    }

/*
    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user =
             User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }*/
}