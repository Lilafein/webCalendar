package com.silv.test.webtest.controller;

import com.silv.test.webtest.calendar.Meeting;
import com.silv.test.webtest.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;

@RestController
public class MeetingController {

	
    @Autowired
    private MeetingRepository meetingRepository;

    @RequestMapping("/meeting_get")
    public List<Meeting> getMeetings() {
        return meetingRepository.findAll();
    }
    

    @PutMapping("/meeting_update/{id}")
    public Meeting updateMeeting(@PathVariable("id") long id, @Valid @RequestBody Meeting meeting) {
    	meeting.setId(id);
        return meetingRepository.save(meeting);
    }
    
    
    @PostMapping("/meeting_create")
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingRepository.save(meeting);
    }
    
    @DeleteMapping("/meeting_delete/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable("id") long id) {
    	try {
    			meetingRepository.deleteById(id);	
    	}
    	catch(IllegalArgumentException e) {
    		return ResponseEntity.ok().body("ID was null");
    	}
    	return ResponseEntity.ok().body("{success:true}");
    }
    
}