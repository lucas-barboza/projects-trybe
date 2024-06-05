package com.betrybe.agrix.controller;

import com.betrybe.agrix.dto.CropDto;
import com.betrybe.agrix.dto.FertilizerDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.service.CropsService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for class crops.
 */
@RestController
@RequestMapping("/crops")
public class CropsController {
  private final CropsService cropsService;

  @Autowired
  public CropsController(CropsService cropsService) {
    this.cropsService = cropsService;
  }

  /**
   * Rota get all Crops.
   */
  @GetMapping
  public ResponseEntity<List<CropDto>> getAllCrops() {
    List<CropDto> crops = cropsService.getAllCrops();
    return new ResponseEntity<>(crops, HttpStatus.OK);
  }

  /**
   * Rota get Crop by id.
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getCropById(@PathVariable Integer id) {
    try {
      CropDto cropDto = cropsService.getCropById(id);
      return ResponseEntity.status(HttpStatus.OK).body(cropDto);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }

  /**
   * Rote get crops between dates.
   */
  @GetMapping("/search")
  public ResponseEntity<List<CropDto>> getSearchCropsBetweenDates(@RequestParam LocalDate start,
      LocalDate end) {

    List<CropDto> cropsDto = cropsService.getSearchCropsBetweenDates(start, end);
    return ResponseEntity.status(HttpStatus.OK).body(cropsDto);
  }

  /**
   * Rote for association for crop and fertilizer.
   */
  @PostMapping("/{cropId}/fertilizers/{fertilizerId}")
  public ResponseEntity<?> associateFertilizerCrop(@PathVariable Integer cropId,
      @PathVariable Integer fertilizerId) {

    try {
      String exit = cropsService.associateFertilizerCrop(cropId, fertilizerId);
      return new ResponseEntity<>(exit, HttpStatus.CREATED);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }

  /**
   * Rote for get association crop for fertilizer by id.
   */
  @GetMapping("/{id}/fertilizers")
  public ResponseEntity<?> getCropFertilizersById(@PathVariable Integer id) {
    try {
      List<FertilizerDto> fertilizerDtos = cropsService.getCropFertilizersById(id);
      return new ResponseEntity<>(fertilizerDtos, HttpStatus.OK);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }
}