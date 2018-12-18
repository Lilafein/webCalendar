package com.silv.test.webtest.auth;
import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "userName"))
public class Users {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;

	    private String userName;
	    private String password;
	    public Users() {}
	    public Users(String userName, String password) {
	    	this.userName = userName;
	    	this.password = password;
	    	
	    }
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}

}
