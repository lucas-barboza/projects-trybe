package com.betrybe.agrix.dto;

import com.betrybe.agrix.util.Role;

/**
 * Dto for person.
 */
public record PersonDto(Integer id, String username, Role role) {

}