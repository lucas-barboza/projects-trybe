package com.betrybe.museumfinder.controller;


import com.betrybe.museumfinder.dto.MuseumDto;
import com.betrybe.museumfinder.model.Coordinate;
import com.betrybe.museumfinder.model.Museum;
import com.betrybe.museumfinder.service.MuseumServiceInterface;
import com.betrybe.museumfinder.util.ModelDtoConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for museum.
 */
@RestController
@RequestMapping("/museums")
public class MuseumController {

  MuseumServiceInterface service;

  @Autowired
  public MuseumController(MuseumServiceInterface service) {
    this.service = service;
  }

  /**
   * Post for rote museums.
   */
  @PostMapping
  public ResponseEntity<Museum> createMuseum(MuseumDto museumDto) {
    Museum museumModel = ModelDtoConverter.dtoToModel(museumDto);
    Museum museum = service.createMuseum(museumModel);
    return ResponseEntity.status(HttpStatus.CREATED).body(museum);
  }

  /**
   * Get for rote museums.
   */
  @GetMapping("/closest")
  public ResponseEntity<MuseumDto> getClosestMuseum(@RequestParam("lat") Double lat,
      @RequestParam("lng") Double lng, @RequestParam("max_dist_km") Double maxDistKm) {
    Coordinate coordinate = new Coordinate(lat, lng);
    Museum closestMuseum = this.service.getClosestMuseum(coordinate, maxDistKm);
    MuseumDto museumDto = ModelDtoConverter.modelToDto(closestMuseum);
    return ResponseEntity.status(HttpStatus.OK).body(museumDto);
  }
}