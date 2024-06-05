package com.betrybe.agrix.controller;

import com.betrybe.agrix.dto.FertilizerDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Fertilizer;
import com.betrybe.agrix.service.FertilizerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for class fertilizer.
 */
@RestController
@RequestMapping("/fertilizers")
public class FertilizerController {
  private final FertilizerService fertilizerService;

  @Autowired
  public FertilizerController(FertilizerService fertilizerService) {
    this.fertilizerService = fertilizerService;
  }

  /**
   * Rote post.
   */
  @PostMapping
  public ResponseEntity<FertilizerDto> create(@RequestBody Fertilizer fertilizer) {
    FertilizerDto newFertilizerDto = fertilizerService.create(fertilizer);
    return new ResponseEntity<FertilizerDto>(newFertilizerDto, HttpStatus.CREATED);
  }

  /**
   * Rote get all.
   */
  @GetMapping
  public ResponseEntity<List<FertilizerDto>> getAll() {
    List<FertilizerDto> fertilizerDtos = fertilizerService.getAll();
    return new ResponseEntity<List<FertilizerDto>>(fertilizerDtos, HttpStatus.OK);
  }

  /**
   * Rote get by id.
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable Integer id) {
    try {
      FertilizerDto fertilizerDto = fertilizerService.getById(id);
      return new ResponseEntity<FertilizerDto>(fertilizerDto, HttpStatus.OK);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }
}
