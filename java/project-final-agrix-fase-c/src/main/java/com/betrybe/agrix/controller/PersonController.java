package com.betrybe.agrix.controller;

import com.betrybe.agrix.dto.AuthenticationDto;
import com.betrybe.agrix.dto.PersonDto;
import com.betrybe.agrix.dto.TokenDto;
import com.betrybe.agrix.ebytr.staff.entity.Person;
import com.betrybe.agrix.ebytr.staff.service.PersonService;
import com.betrybe.agrix.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controler for class person.
 */
@RestController
@RequestMapping
public class PersonController {
  private final PersonService personService;
  private final TokenService tokenService;
  private final AuthenticationManager authenticationManager;

  /**
   * Contructor.
   */
  @Autowired
  public PersonController(
      PersonService personService,
      TokenService tokenService,
      AuthenticationManager authenticationManager) {
    this.personService = personService;
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }

  /**
   * Rote post.
   */
  @PostMapping("/persons")
  public ResponseEntity<PersonDto> create(@RequestBody Person person) {
    Person newPerson = personService.insert(person);
    PersonDto personDto = new PersonDto(
        newPerson.getId(),
        newPerson.getUsername(),
        newPerson.getRole());

    return new ResponseEntity<PersonDto>(personDto, HttpStatus.CREATED);
  }

  /**
   * Rote for login.
   */
  @PostMapping("/auth/login")
  public ResponseEntity<TokenDto> login(@RequestBody AuthenticationDto authenticationDto) {
    try {
      UsernamePasswordAuthenticationToken userNamePassword =
          new UsernamePasswordAuthenticationToken(authenticationDto.username(),
              authenticationDto.password());
      Authentication authentication = authenticationManager.authenticate(userNamePassword);
      Person person = (Person) authentication.getPrincipal();
      String token = tokenService.generateToken(person);
      return ResponseEntity.status(HttpStatus.OK).body(new TokenDto(token));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }
}