package com.silv.test.webtest.calendar;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "meetings")
public class Meeting extends AuditModel {
    @Id
    @GeneratedValue(generator = "meeting_generator")
    @SequenceGenerator(
            name = "meeting_generator",
            sequenceName = "meeting_sequence",
            initialValue = 100
    )
    private Long id;

    @NotBlank
    @Size(min = 3, max = 250)
    private String personName;

    @Column(columnDefinition = "text")
    private String description;
    
    @Column(columnDefinition = "text")
    private String title;
    
    private Date startDate;
    
    private Date endDate;

    public Long getId() {
    	return id;
    }
    public void setId(Long id) {
    	this.id = id;
    }
    public String getPersonName() {
    	return personName;
    }
    public void setPersonName(String personName) {
    	this.personName = personName;
    }
    public String getDescription() {
    	return description;
    }
    public void setDescription(String description) {
    	this.description = description;
    }
    public String getTitle() {
    	return title;
    }
    public void setTitle(String title) {
    	this.title = title;
    }
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
