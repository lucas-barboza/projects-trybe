package com.betrybe.agrix.controller;

import com.betrybe.agrix.dto.CropDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Crop;
import com.betrybe.agrix.models.entities.Farm;
import com.betrybe.agrix.service.FarmService;
import java.util.List;
import java.util.stream.Collectors;
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
 * Controller for class farm.
 */
@RestController
@RequestMapping("/farms")
public class FarmController {
  private final FarmService farmService;

  @Autowired
  public FarmController(FarmService farmService) {
    this.farmService = farmService;
  }

  /**
   * Rota POST.
   */
  @PostMapping
  public ResponseEntity<Farm> createFarm(@RequestBody Farm farm) {
    Farm newFarm = farmService.createFarm(farm);
    return new ResponseEntity<>(newFarm, HttpStatus.CREATED);
  }

  /**
   * Rota get all Farms.
   */
  @GetMapping
  public ResponseEntity<List<Farm>> getAllFarms() {
    List<Farm> farms = farmService.getAllFarms();
    return new ResponseEntity<>(farms, HttpStatus.OK);
  }

  /**
   * Rota get farm by id.
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getFarmById(@PathVariable Integer id) {
    try {
      Farm farm = farmService.getFarmById(id);
      return ResponseEntity.status(HttpStatus.OK).body(farm);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

  }

  /**
   * Rota POST for create crops.
   */
  @PostMapping("/{id}/crops")
  public ResponseEntity<?> createCrop(@PathVariable Integer id, @RequestBody Crop crop) {
    try {
      Crop newCrop = farmService.createCrop(id, crop);
      CropDto cropDto = new CropDto(
          newCrop.getId(),
          newCrop.getName(),
          newCrop.getPlantedArea(),
          newCrop.getPlantedDate(),
          newCrop.getHarvestDate(),
          newCrop.getFarm().getId()
        );
      return ResponseEntity.status(HttpStatus.CREATED).body(cropDto);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }

  /**
   * Rota GET for get crop for farm ID.
   */
  @GetMapping("/{id}/crops")
  public ResponseEntity<?> getCropByFarmId(@PathVariable Integer id) {
    try {
      List<Crop> crops = farmService.getCropForFarmId(id);
      List<CropDto> listCropsDto = crops.stream()
          .map((crop -> new CropDto(
            crop.getId(),
            crop.getName(),
            crop.getPlantedArea(),
            crop.getPlantedDate(),
            crop.getHarvestDate(),
            crop.getFarm().getId()
        ))).collect(Collectors.toList());
      return ResponseEntity.status(HttpStatus.OK).body(listCropsDto);
    } catch (NotFound e) {
      return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
  }
}